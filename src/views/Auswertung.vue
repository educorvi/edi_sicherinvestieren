<template>
    <div>
        <div v-if="fragebogen">
            <Auswertungsfrage :frage="fragebogen.items[i]" :key="i" :selected="selected[i]"
                              v-for="i in history"></Auswertungsfrage>
        </div>
        <custom-spinner v-else/>
        <Hinweis hinweis="rechtlicheEinschraenkung"/>
    </div>
</template>

<script>
    import CustomSpinner from "@/components/Helper/CustomSpinner";
    import Auswertungsfrage from "@/components/Auswertungsfrage";
    import Hinweis from "../components/Hinweis";

    export default {
        name: "Auswertung",
        components: {Hinweis, Auswertungsfrage, CustomSpinner},
        data() {
            return {
                fragebogen: null,
                history: null,
                selected: null
            }
        },
        created() {
            this.http.get(this.$route.query.id + "?fullobjects=true").then(res => {
                this.history = JSON.parse(this.$route.query.history);
                this.selected = JSON.parse(this.$route.query.selected);
                this.fragebogen = res.data;

            });
        }
    }
</script>

<style scoped>

</style>
