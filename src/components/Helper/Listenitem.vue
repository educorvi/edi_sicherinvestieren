<template>

    <div>
        <b-row align-v="center">

            <b-col @click="load" cols="0" v-if="item.fertig===0">
                <radial-progress-bar :completed-steps="item['fortschritt']" :diameter="60" :stroke-width="5"
                                     :total-steps="100">{{Math.round(item['fortschritt']||0)}}%
                </radial-progress-bar>
            </b-col>

            <b-col @click="load">
                <div style="text-align: left">
                    <h5 class="mb-0">{{item.name}}</h5>
                    <p class="text-muted" v-if="item.fragebogenName">{{item.fragebogenName}}</p>
                </div>
            </b-col>

            <b-col cols="2">
                <img @click="deleteListeWrapper" alt="delete" src="/icons/delete.svg" style="width: max-content">
            </b-col>
        </b-row>
        <hr v-if="!last"/>
    </div>


</template>

<script>
    import radialProgressBar from "vue-radial-progress"

    export default {
        name: "Listenitem",
        components: {radialProgressBar},
        props: {
            item: {
                type: Object,
                required: true
            },
            last: {
                type: Boolean
            }
        },
        methods: {
            deleteListeWrapper() {
                this.$emit("deleted")
            },
            load() {
                if (this.item.fertig === 0) {
                    this.$router.push("/fragebogen?data=" + JSON.stringify(this.item) + "&id=" + this.item.fragebogen + "&load=true");
                } else {
                    this.$router.push("/auswertung?history=" + JSON.stringify(this.item.history) + "&id=" + this.item.fragebogen + "&selected=" + JSON.stringify(this.item.selected));
                }

            }
        },
    }
</script>

<style scoped>

</style>
