<template>
    <div>
        <h6 class="mb-0 text-center bereich" v-if="frage.thema">{{frage.thema.title}}</h6>
        <p class="text-center bereich">{{frage.parent.title}}</p>

        <!--        Frage und Buttons-->
        <b-card no-body>
            <h6 class="mb-0" slot="header">{{frage.title}}</h6>
            <b-card-body>
                <span v-html="frage.frage.data"></span>

                <!--                Buttons-->
                <ButtonGruppe @click="naechste"/>
            </b-card-body>
        </b-card>

        <!--Tipp-->
        <b-card class="mt-2" no-body>
            <b-card-header v-b-toggle="'tipp'">Tipp</b-card-header>
            <b-collapse id="tipp" role="tabpanel">
                <b-card-body>
                    <span v-html="frage.tipp.data"></span>
                </b-card-body>
            </b-collapse>
        </b-card>

        <!--        Notiz-->
        <b-card class="mt-2" no-body>
            <b-card-header v-b-toggle="'notizen'">Notizen</b-card-header>
            <b-collapse id="notizen" role="tabpanel">
                <b-textarea v-model="notizen[$route.params.frage]"></b-textarea>
            </b-collapse>
        </b-card>

        <b-button @click="letzte" class="float-left mt-2">Zurück</b-button>
    </div>


</template>

<script>
    import {mapActions, mapGetters} from "vuex";
    import ButtonGruppe from "@/components/Fragebogen/ButtonGruppe";
    import router from "../../router"

    export default {
        name: "Frage",
        components: {ButtonGruppe},
        computed: {
            ...mapGetters(["frage", "fragen", "notizen", "fragebogenIDraw"])
        },
        methods: {
            ...mapActions(["setLoading"]),
            naechste(button) {
                if (button.aktion === null) {
                    if (parseInt(this.$route.params.frage) > this.fragen.length - 2) {
                        router.push("/abschluss")
                    } else {
                        router.push("/" + this.fragebogenIDraw + "/" + (parseInt(this.$route.params.frage) + 1));
                    }
                } else {
                    let index = null;
                    for (let i = 0; i < this.fragen.length; i++) {
                        if (button.aktion === this.fragen[i]["@id"]) {
                            index = i;
                            break;
                        }
                    }
                    if (index !== null) {
                        router.push("/" + this.fragebogenIDraw + "/" + index);
                    } else {
                        alert("Ungültige Referenz: " + button.aktion);
                    }
                }
            },
            letzte() {
                router.go(-1)
            }
        },
    }
</script>

<style scoped>
    .bereich {
        color: white;
    }
</style>