<template>

    <div>
        <b-row align-v="center">

<!--            Fortschritt Circle; Nur wenn Fortschritt nicht bei 100%-->
            <b-col @click="load" cols="0" v-if="item.fertig===0">
                <radial-progress-bar :completed-steps="item['fortschritt']" :diameter="60" :stroke-width="5"
                                     :total-steps="100">{{Math.round(item['fortschritt']||0)}}%
                </radial-progress-bar>
            </b-col>

<!--            Informationen-->
            <b-col @click="load">
                <div style="text-align: left">
                    <h5 class="mb-0">{{item.name}}</h5>
                    <p class="text-muted" v-if="item.fragebogenName">{{item.fragebogenName}}</p>
                </div>
            </b-col>

<!--            Knopf zum Löschen-->
            <b-col cols="2">
                <img @click="deleteListeWrapper" alt="delete" src="/icons/delete.svg" style="width: max-content">
            </b-col>
        </b-row>


        <hr v-if="!last"/>
    </div>


</template>

<script>
    //@group Helper
    //@vuese
    //Item, das Daten zu einer Liste anzeigt

    import radialProgressBar from "vue-radial-progress"

    export default {
        name: "Listenitem",
        components: {radialProgressBar},
        props: {
            //Das Listenitem, das angezeigt werden soll
            item: {
                type: Object,
                required: true
            },
            //Ist es das letzte Listenitem? => Divider ausblenden
            last: {
                type: Boolean
            }
        },
        methods: {
            //Wenn zu löschen
            deleteListeWrapper() {
                this.$emit("deleted")
            },

            //Laden des verknüpften Fragebogens
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
