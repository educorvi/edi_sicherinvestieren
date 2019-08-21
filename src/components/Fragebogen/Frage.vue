<template>
    <div>
        <h6 class="mb-0 text-center bereich">{{frage.thema.title}}</h6>
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

        <b-card class="mt-2" no-body>
            <b-card-header v-b-toggle="'notizen'">Notizen</b-card-header>
            <b-collapse id="notizen" role="tabpanel">
                <b-textarea v-model="notiz"></b-textarea>
            </b-collapse>
        </b-card>

        <b-button :disabled="aktuellerIndex === 0" @click="letzte" class="float-left mt-2">Zurück</b-button>
    </div>


</template>

<script>
    import {mapGetters} from "vuex";
    import ButtonGruppe from "@/components/Fragebogen/ButtonGruppe";

    export default {
        name: "Frage",
        components: {ButtonGruppe},
        computed: {
            ...mapGetters(["frage", "aktuellerIndex"])
        },
        data() {
            return {
                notiz: ""
            }
        },
        methods: {
            naechste(button) {
                this.$store.dispatch("naechsteFrage", button.aktion)
            },
            letzte() {
                this.$store.dispatch("letzteFrage")
            }
        },
    }
</script>

<style scoped>
    .bereich {
        color: white;
    }
</style>