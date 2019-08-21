<template>
    <div>
        <b-progress-bar :max="fragen.length" :value="aktuellerIndex+1"></b-progress-bar>
        <Frage/>
    </div>
</template>

<script>
    import Frage from "@/components/Fragebogen/Frage";
    import {mapGetters} from 'vuex';

    export default {
        name: "Fragebogen",
        components: {Frage},
        computed: {
            ...mapGetters(["frage", "fragen", "aktuellerIndex"])
        }
    }
</script>

<style scoped>

</style>