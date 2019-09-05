<template>
    <b-card no-body>
        <b-card-header><h4>Impressum</h4></b-card-header>
        <b-card-body>
            <span v-html="imp.text.data"></span>
        </b-card-body>
    </b-card>
</template>

<script>
    import {mapGetters} from "vuex";
    import axios from "axios";

    export default {
        name: "Impressum",
        data() {
            return {
                imp: {
                    text: {
                        data: "<p>Impressum wird geladen...</p>"
                    }
                }
            }
        },
        computed: {
            ...mapGetters(["config"])
        },
        mounted() {
            axios.get(this.config["impressum"], {
                headers: {
                    Accept: "application/json"
                }
            }).then(res => this.imp = res.data);
        }
    }
</script>

<style scoped>

</style>