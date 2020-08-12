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
        name: "Impressum",
        components: {CustomSpinner},
        data() {
            return {
                html: null
            }
        },
        //Daten werden aus dem bgetem Impressum ausgelesen
        created() {
            this.http.get(config.impressum).then(res => {
                this.html = res.data.text.data;
                // const el = document.createElement('html');
                // el.innerHTML = res.data;
                // this.html = el.querySelector("#content-core").innerHTML;
            }).catch(()=>this.html = "<h6 class='text-danger'>Es ist ein Fehler aufgetreten. Bitte versuchen Sie es zu einem späteren Zeitpunkt erneut.</h6>")
        }
    }
</script>

<style scoped>

</style>
