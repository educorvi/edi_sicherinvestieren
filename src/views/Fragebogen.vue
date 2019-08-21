<template>
    <div>
        <b-progress-bar :max="fragen.length" :value="parseInt(this.$route.params.frage)+1"></b-progress-bar>
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
            ...mapGetters(["frage", "fragen"])
        },
        watch: {
            "$route.params.frage"(newValue, oldValue) {
                this.$store.dispatch("addZuletztBesucht", parseInt(oldValue));
                this.$store.dispatch("getFrage", newValue)
            }
        },
        created() {
            if (this.fragen.length === 0) {
                this.$store.dispatch("getFragenAndStart", {
                    url: "http://192.168.86.52:8080/investieren/offsetdruck/",
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