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
            this.http.get("https://www.bgetem.de/die-bgetem/impressum/impressum").then(res => {
                this.html = res.data.text.data;
                // const el = document.createElement('html');
                // el.innerHTML = res.data;
                // this.html = el.querySelector("#content-core").innerHTML;
            })
        }
    }
</script>

<style scoped>

</style>
