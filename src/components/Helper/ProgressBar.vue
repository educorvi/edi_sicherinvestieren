<template>
    <b-progress :value="fragebogenData.progress" class="rounded-0" max="100" style="height: 5px" variant="success"/>
</template>

<script>
    //@group Helper
    //@vuese
    //Zeigt den Progress im laufenden Fragebogen
    import {mapGetters} from "vuex";

    export default {
        name: "ProgressBar",
        computed: {
            ...mapGetters(["fragebogenData"])
        }
    }
</script>

<style scoped>

</style>
