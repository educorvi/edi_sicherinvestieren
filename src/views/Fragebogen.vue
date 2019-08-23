<template>
    <div>
        <div id="progress">
            <b-progress :max="fragen.length" :value="parseInt($route.params.frage)" height="6px"
                        variant="success"></b-progress>
        </div>
        <Frage style="padding-top: 5px"/>
    </div>
</template>

<script>
    import Frage from "@/components/Fragebogen/Frage";
    import {mapActions, mapGetters, mapMutations} from 'vuex';

    export default {
        name: "Fragebogen",
        components: {Frage},
        computed: {
            ...mapGetters(["frage", "fragen", "config"])
        },
        watch: {
            "$route.params.frage"(newValue, oldValue) {
                this.$store.dispatch("addZuletztBesucht", parseInt(oldValue));
                this.$store.dispatch("getFrage", newValue)
            }
        },
        created() {
            if (this.fragen.length === 0) {
                this.$route.params.fragebogen.replace(/§/g, "/");
                this.$store.dispatch("getFragenAndStart", {
                    url: this.$route.params.fragebogen.replace(/§/g, "/"),
                    i: this.$route.params.frage
                })
            }


        },
        methods: {
            ...mapMutations(["getFrage"]),
            ...mapActions(["setLoading"])
        },
    }
</script>

<style scoped>
    #progress {
        position: fixed;
        /* fixing the position takes it out of html flow - knows
                          nothing about where to locate itself except by browser
                          coordinates */
        left: 0; /* top left corner should start at leftmost spot */
        top: 65px; /* top left corner should start at topmost spot */
        width: 100vw; /* take up the full browser width */
        z-index: 200;
        padding-left: 10px;
        padding-right: 10px;
        padding-bottom: 4px;
        background: white;
        margin-top: -5px;
    }
</style>