<template>
    <div class="text-center w-100" v-if="loading">
        <b-spinner variant="dark"></b-spinner>
    </div>
    <div v-else>
        <Auswertungsfrage :frage="frage" :key="index" :selected="selected[index]"
                          v-for="(frage, index) in fragen"></Auswertungsfrage>
    </div>
</template>

<script>
    import axios from "axios";
    import {mapGetters} from "vuex";
    import Auswertungsfrage from "@/components/Auswertung/Auswertungsfrage";


    export default {
        name: "Auswertung",
        components: {Auswertungsfrage},
        data() {
            return {
                fragen: [],
                loading: true
            }
        },
        computed: {
            ...mapGetters(["fragebogenID", "selected"])
        },
        created() {
            axios.get(this.fragebogenID, {
                headers: {
                    Accept: "application/json"
                },
                params: {
                    fullobjects: 1
                }
            }).then(res => {
                this.fragen = res.data.items;
                this.loading = false;
            })
        }
    }
</script>

<style scoped>

</style>