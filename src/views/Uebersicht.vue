<template>
    <div>
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
                            v-model="modalData.baujahr"
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
                            v-model="modalData.notizen"
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

</template>

<script>
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
                    baujahr: new Date().getFullYear(),
                    globalNotizen: ""
                },
                listen: [],
                validForm: false

            }
        },
        computed: {
            ...mapGetters(["config"])
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
            newSelected(payload) {
                if (payload.children.length === 0) {
                    const id = Object.values(JSON.parse(JSON.stringify(payload.data))).join("").replace(payload.text, "");
                    this.lastSelected.id = id;
                    this.lastSelected.text = payload.text
                    this.$bvModal.show("startModal")
                }

            },

            getOrdner() {
                this.http.get(this.config.rootURL).then(res => {
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
                        ).finally(() => this.finished++);
                    }
                }).catch(err => console.log(err));
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

                this.validForm = newName.length > 0 && !this.listen.some(function (liste) {
                    return hasValue(liste)
                });
            }
        }
    }
</script>