<template>
    <div style="text-align: left" v-if="fragebogen">
<!--        Frage-->
        <span v-html="frage.frage.data"></span>

<!--        Hinweis-->
        <b-card class="mb-3" no-body v-if="frage.tipp">
            <b-card-header v-b-toggle.Hinweis>
                Hinweis
            </b-card-header>
            <b-collapse id="Hinweis">
                <b-card-body>
                    <span v-html="frage.tipp.data"/>
                </b-card-body>
            </b-collapse>
        </b-card>

<!--        Notiz-->
        <b-card class="mb-3" no-body>
            <b-card-header @click="notizVisible=!notizVisible">
                Eigene Notizen
            </b-card-header>
            <b-collapse id="Notizen" v-model="notizVisible">

                <b-form-textarea class="rounded-0" v-model="notizen[frageIndex]"/>

            </b-collapse>
        </b-card>

<!--        Antworten-->
        <div style="text-align: center">
            <b-button-group>
                <b-button :key="index" :style="getStyles[index]" @click="next(option.antwort, option.aktion)"
                          v-for="(option, index) in frage.optionen">{{option.antwort}}
                </b-button>
            </b-button-group>
        </div>

<!--        Zurück-->
        <b-button @click="zurueck()" class="float-left mt-2" v-if="frageIndex>0">Zurück</b-button>
    </div>
    <custom-spinner v-else/>
</template>

<script>
    //@group Views
    //@vuese
    //Durchlaufen eines Fragebogens
    import CustomSpinner from "../components/Helper/CustomSpinner";
    import db from "../js/localDatabase";
    import {mapGetters} from "vuex"

    export default {
        name: "Fragebogen",
        components: {CustomSpinner},
        data() {
            return {
                fragebogen: null,
                frageIndex: parseInt(this.$route.query.frage) || 0,
                selected: [],
                history: [],
                notizen: [],
                notizVisible: false,
                globalData: null,
            }
        },
        computed: {
            ...mapGetters(["userID"]),
            frage() {
                return this.fragebogen.items[this.frageIndex];
            },
            //Get Styles for Buttons
            getStyles() {
                let styles = [];
                for (let i = 0; i < this.frage.optionen.length; i++) {
                    let option = this.frage.optionen[i];
                    if (this.selected[this.frageIndex] === option.antwort) {
                        const bigint = parseInt(option.color.replace("#", ""), 16);
                        let rgb = [];
                        rgb[0] = (bigint >> 16) & 255;
                        rgb[1] = (bigint >> 8) & 255;
                        rgb[2] = bigint & 255;

                        const o = Math.round(((parseInt(rgb[0]) * 299) +
                            (parseInt(rgb[1]) * 587) +
                            (parseInt(rgb[2]) * 114)) / 1000);
                        //default: 125
                        const fore = (o > 140) ? 'black' : 'white';

                        styles[i] = "background-color: " + option.color + "; border-color: " + option.color + "; color: " + fore;
                    } else {
                        styles[i] = "background-color: white; border-color: " + option.color + "; color: " + option.color;
                    }
                }
                return styles;

            },
        },
        methods: {
            //Springen zur nächsten Frage, respektive der Auswertung des Fragebogens
            next(antwort, aktion) {
                if (this.frageIndex !== undefined) {
                    this.$set(this.selected, this.frageIndex, antwort);
                    this.history.push(this.frageIndex);
                    const i = this.getIndex(aktion);
                    if (i >= this.fragebogen.items.length) {
                        db.putListe(this.createDatabaseObject(true));
                        this.$router.push(`/auswertung?subito=true&name=${this.globalData.name}`);
                    } else {
                        this.frageIndex = i;
                        this.$store.commit("setFragebogenData", {progress: this.frageIndex / this.fragebogen.items.length * 100});
                    }

                }
            },

            //Liefert den Index zu dem gesprungen werden muss anhand der UID
            getIndex(aktion) {
                if (!aktion) {
                    return this.frageIndex + 1;
                }
                const fragen = this.fragebogen.items;
                for (let i = 0; i < fragen.length; i++) {
                    const frage = fragen[i];
                    if (frage.UID === aktion) {
                        return i;
                    }
                }
                throw new Error("Frage konnte nicht gefunden werden => " + aktion);
            },

            //Geht einen Schritt zurück
            zurueck() {
                if (this.history.length > 0) {
                    this.frageIndex = this.history.pop();
                    this.$store.commit("setFragebogenData", {progress: this.frageIndex / this.fragebogen.items.length * 100});
                }
            },

            //Liefert das Objekt, dass in die Datenbank geschrieben werden soll
            createDatabaseObject(fertig = false) {
                const retFertig = (fertig) ? 1 : 0;
                return {
                    _id: this.globalData.name,
                    ...this.globalData,
                    selected: this.selected,
                    notizen: this.notizen,
                    history: this.history,
                    letzteFrage: this.frageIndex,
                    fragebogen: this.fragebogen["@id"],
                    fertig: retFertig,
                    fragebogenName: this.fragebogen.title,
                    fortschritt: this.frageIndex / this.fragebogen.items.length * 100
                }
            }
        },

        created() {
            this.$store.commit("resetFragebogenData");
            this.globalData = JSON.parse(this.$route.query.data);
            const data = this.globalData;

            //Falls ein bereits begonnener Fragebogen geladen werden soll
            if (this.$route.query.load === "true") {
                this.selected = data.selected;
                this.notizen = data.notizen;
                this.history = data.history;
                this.frageIndex = data.letzteFrage
            }

            this.notizVisible = (this.notizen[this.frageIndex] && this.notizen[this.frageIndex] !== "");
            this.http.get(this.$route.query.id + "?fullobjects=true").then(res => {
                const data = res.data;
                this.fragebogen = data;
                this.$store.commit("setFragebogenData", {
                    title: data.title,
                    thema: data.items[this.frageIndex].thema.title,
                    progress: this.frageIndex / this.fragebogen.items.length * 100
                });
                db.putListe(this.createDatabaseObject());
            }).catch(()=>{
                this.$root.$bvToast.toast("Laden des Fragebogens fehlgeschlagen", {
                    title: "Fehler",
                    variant: "danger",
                    autoHideDelay: 5000
                })
                this.$router.push("/?subito=true");
            });
        },

        //Verhindern dass der Fragebogen versehentlich verlassen wird
        beforeRouteLeave(to, from, next) {
            //Möglichkeit die Frage beim Verlassen zu überspringen mithilfe von subito
            if (to.query.subito) {
                next();
            } else {
                this.$bvModal.msgBoxConfirm("Wollen Sie die Fragebogenansicht verlassen? Ihr Fortschritt wird automatisch gespeichert", {
                    title: "Verlassen",
                    // size: "sm",
                    okVariant: "primary",
                    okTitle: "Verlassen",
                    cancelTitle: "Abbrechen",
                    centered: true
                }).then(value => {
                    if (value) {
                        db.putListe(this.createDatabaseObject());
                        next();
                    }
                })
            }
        },
        watch: {
            //Speichern bei ändern der Frage und aktualisieren von NotizVisible
            frageIndex: function (newValue) {
                window.scroll({
                    top: 0,
                    left: 0,
                    behavior: "smooth"
                });
                if (this.fragebogen) {
                    db.putListe(this.createDatabaseObject());
                    this.notizVisible = (this.notizen[newValue] && this.notizen[newValue] !== "");
                }

            }
        }
    }
</script>

<style scoped>
</style>
