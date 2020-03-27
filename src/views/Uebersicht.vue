<template>
    <div v-if="!folders || folders.length>0">
        <transition name="fade" v-if="folders && folders.length === finished">
            <tree :data="folders" :options="treeOptions" @node:clicked="newSelected"/>
        </transition>
        <custom-spinner v-else/>


        <b-modal :title="'Neue Liste zu \''+lastSelected.text+'\''" @hidden="resetForm()" centered id="startModal"
                 scrollable>

            <b-form>
                <b-form-group
                        description="Bitte verwenden Sie einen Namen, den Sie noch für keine andere Liste verwendet haben"
                        id="namegroup"
                        label="Dateiname:"
                        label-for="input-1"
                >
                    <b-form-input
                            :state="validForm ? null : false"
                            id="input-1"
                            name="Dateiname"
                            required
                            type="text"
                            v-model="modalData.name"
                    ></b-form-input>
                    <!--                    <b-form-invalid-feedback :state="modalData.name.length>0">Bitte geben Sie einen Namen ein</b-form-invalid-feedback>-->
                </b-form-group>
                <b-form-group
                        id="typgroup"
                        label="Maschinentyp:"
                        label-for="input-2"
                >
                    <b-form-input
                            id="input-2"
                            type="text"
                            v-model="modalData.maschinentyp"
                    ></b-form-input>
                </b-form-group>
                <b-form-group
                        id="nrgroup"
                        label="Maschinennummer:"
                        label-for="input-6"
                >
                    <b-form-input
                            id="input-6"
                            type="text"
                            v-model="modalData.maschinennummer"
                    ></b-form-input>
                </b-form-group>
                <b-form-group
                        id="herstellergroup"
                        label="Hersteller:"
                        label-for="input-3"
                >
                    <b-form-input
                            id="input-3"
                            type="text"
                            v-model="modalData.hersteller"
                    ></b-form-input>
                </b-form-group>
                <b-form-group
                        id="jahrgroup"
                        label="Baujahr:"
                        label-for="input-4"
                >
                    <b-form-input
                            id="input-4"
                            type="number"
                            v-model="modalData.jahr"
                    ></b-form-input>
                </b-form-group>
                <b-form-group
                        id="textgroup"
                        label="Notizen:"
                        label-for="input-5"
                >
                    <b-form-textarea
                            id="input-5"
                            type="text"
                            v-model="modalData.globalNotizen"
                    ></b-form-textarea>
                </b-form-group>


            </b-form>

            <template v-slot:modal-footer>
                <b-button-group class="float-right">
                    <b-button @click="cancelForm()">Abbrechen</b-button>
                    <b-button @click="submit" variant="info">Erstellen</b-button>
                </b-button-group>
            </template>

        </b-modal>
    </div>
    <p v-else class="text-muted">Keine Fragebögen zu finden...</p>

</template>

<script>
    //@group Views
    //@vuese
    //Übersicht über die verfügbaren Fragebögen
    import {mapGetters} from "vuex";
    import CustomSpinner from "../components/Helper/CustomSpinner";

    export default {
        name: 'Uebersicht',
        components: {
            CustomSpinner
        },
        data() {
            return {
                folders: null,
                treeOptions: {
                    emptyText: 'Keine Fragebögen zu finden',
                    propertyNames: {
                        text: 'title',
                        children: 'items',
                        data: '@id'
                    }
                },
                finished: 0,
                lastSelected: {
                    id: "",
                    text: ""
                },
                modalData: {
                    name: "",
                    maschinentyp: "",
                    maschinennummer: "",
                    hersteller: "",
                    jahr: new Date().getFullYear(),
                    globalNotizen: ""
                },
                validForm: false

            }
        },
        computed: {
            ...mapGetters(["config", "listen", "frageboegen"])
        },
        created() {
            if (this.config === undefined || this.config === null) {
                this.http.get("./config.json").then(res => {
                    this.$store.commit("setConfig", res.data);
                    this.getOrdner();
                });
            } else {
                this.getOrdner()
            }
        },
        methods: {
            //Wird ausgeführt wenn neuer Fragebogen ausgewählt
            newSelected(payload) {
                if (payload.children.length === 0) {
                    const id = Object.values(JSON.parse(JSON.stringify(payload.data))).join("").replace(payload.text, "");
                    this.lastSelected.id = id;
                    this.lastSelected.text = payload.text
                    this.$bvModal.show("startModal")
                }

            },
            //Abrufen der Ordnerstruktur, um die Fragebogen zu bekommen
            getOrdner() {
                if (this.frageboegen) {
                    this.folders = this.frageboegen;
                    this.finished = this.folders.length;
                } else {
                    this.http.get(this.config.frageboegen).then(res => {
                        this.folders = res.data.items;
                        for (let i = 0; i < this.folders.length; i++) {
                            let folder = this.folders[i];
                            this.http.get(folder['@id']).then(res => {
                                    let data = res.data;
                                    if (data['@type'] !== 'Folder') {
                                        data.items = null;
                                    }
                                    this.folders[i] = data;

                                }
                            ).catch(() => this.folders[i] = null).finally(() => this.finished++);
                        }
                    }).catch(() => {
                        this.folders = [];
                        this.$bvToast.toast("Es gab einen Fehler beim Abrufen der Fragebögen. Bitte lade die Seite neu oder probiere es später noch einmal", {
                            title: "Fehler",
                            variant: "danger",
                            autoHideDelay: 5000
                        })
                    }).finally(() => this.$store.commit("setFrageboegen", this.folders));
                }
            },
            cancelForm() {
                this.$bvModal.hide('startModal');
            },
            resetForm() {
                this.modalData = {
                    name: "",
                    typ: "",
                    nr: "",
                    hersteller: "",
                    jahr: new Date().getFullYear(),
                    notizen: ""
                };
            },
            //Starten eines Fragebogens
            submit() {
                if (this.validForm) {
                    this.$router.push("/fragebogen?id=" + this.lastSelected.id + "&data=" + JSON.stringify(this.modalData));
                }
            },
        },
        watch: {
            "modalData.name": function (newName) {
                function hasValue(obj) {
                    return obj["name"] === newName;
                }

                this.validForm = newName.length > 0 && newName[0] !== "_" && !this.listen.some(function (liste) {
                    return hasValue(liste)
                });
            }
        }
    }
</script>
