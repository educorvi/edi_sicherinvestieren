<template>
    <div v-if="fragebogen">
        <Auswertungsfrage :frage="fragebogen.items[i]" :key="i" :selected="selected[i]"
                          v-for="i in history"></Auswertungsfrage>
    </div>
    <custom-spinner v-else/>
</template>

<script>
    import CustomSpinner from "@/components/Helper/CustomSpinner";
    import Auswertungsfrage from "@/components/Auswertungsfrage";

    export default {
        name: "Auswertung",
        components: {Auswertungsfrage, CustomSpinner},
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
