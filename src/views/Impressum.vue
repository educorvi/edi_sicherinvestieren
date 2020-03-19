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
        name: "Impressum",
        components: {CustomSpinner},
        data() {
            return {
                html: null
            }
        },
        //Daten werden aus dem bgetem Impressum ausgelesen
        created() {
            //@TODO cors anywhere entfernen
            this.http.get("https://cors-anywhere.herokuapp.com/https://www.bgetem.de/die-bgetem/impressum", {headers: {Accept: "text/html"}}).then(res => {
                const el = document.createElement('html');
                el.innerHTML = res.data;
                this.html = el.querySelector("#content-core").innerHTML;
            })
        }
    }
</script>

<style scoped>

</style>
