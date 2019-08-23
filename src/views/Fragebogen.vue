<template>
    <div>
        <b-progress :max="fragen.length" :value="parseInt($route.params.frage)" class="w-100 mt-n1 mb-2" height="6px"
                    variant="success"></b-progress>
        <Frage/>
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

</style>