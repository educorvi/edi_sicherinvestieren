<template>
    <div>
        <b-progress-bar :max="fragen.length" :value="aktuellerIndex+1"></b-progress-bar>
        <Frage/>
    </div>
</template>

<script>
    import Frage from "@/components/Fragebogen/Frage";
    import {mapGetters, mapMutations} from 'vuex';

    export default {
        name: "Fragebogen",
        components: {Frage},
        computed: {
            ...mapGetters(["frage", "fragen", "aktuellerIndex"])
        },
        watch: {
            "$route.params.frage"(newValue, oldValue) {
                this.$store.dispatch("addZuletztBesucht", parseInt(oldValue));
                this.$store.dispatch("getFrage", newValue)
            }
        },
        created() {
            if (this.fragen.length === 0) {
                this.$store.dispatch("getFragen", "http://192.168.86.52:8080/investieren/offsetdruck/")
            }
        },
        methods: {
            ...mapMutations(["getFrage"])
        },
    }
</script>

<style scoped>

</style>