<template>
    <span style="text-align: start" v-html="html" v-if="html"/>
    <custom-spinner v-else/>
</template>

<script>
    //@group Views
    //@vuese
    //Impressum
    import CustomSpinner from "../components/Helper/CustomSpinner";
    import config from "../config.json"

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
            this.http.get(config.datenschutz).then(res => {
                this.html = res.data.text.data;
            }).catch(()=>this.html = "<h6>Es ist ein Fehler aufgetreten. Bitte versuchen Sie es zu einem späteren Zeitpunkt erneut.</h6>")
        }
    }
</script>

<style scoped>

</style>
