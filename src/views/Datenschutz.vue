<template>
    <span style="text-align: start" v-html="html" v-if="html"/>
    <custom-spinner v-else/>
</template>

<script>
    //@group Views
    //@vuese
    //Impressum
    import CustomSpinner from "../components/Helper/CustomSpinner";

    export default {
        name: "Datenschutz",
        components: {CustomSpinner},
        data() {
            return {
                html: null
            }
        },
        //Daten werden aus dem bgetem Impressum ausgelesen
        created() {
            //@TODO Eigene Datenschutzerklärung
            this.http.get("https://www.bgetem.de/die-bgetem/datenschutz/datenschutzerklaerung").then(res => {
                this.html = res.data.text.data;
            })
        }
    }
</script>

<style scoped>

</style>
