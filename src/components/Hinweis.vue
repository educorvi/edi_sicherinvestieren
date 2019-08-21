<template>
    <b-card>
        <b-card-text><span v-html="hinweise[id].text"></span></b-card-text>
        <b-button @click="ok" class="w-100">{{hinweise[id].okText}}</b-button>

        <b-form-checkbox slot="footer" v-model="ausblendenChecked">Diesen Hinweis in Zukunft ausblenden
        </b-form-checkbox>
    </b-card>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "Hinweis",
        props: ["id"],
        computed: mapGetters(["hinweise"]),
        data() {
            return {
                ausblendenChecked: false
            }
        },
        methods: {
            ok() {
                if (this.ausblendenChecked) {
                    //    do something with Server Or Settings
                }
                this.$emit("ok")
            }
        }
    }
</script>

<style scoped>

</style>