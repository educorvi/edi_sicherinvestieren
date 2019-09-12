<template>
    <Transition mode="out-in" name="animation">
        <!--Angefangene Listen-->
        <div v-if="!loadingListe">
            <div :key="'offen'" v-if="$route.params.offen==='true'">
                <p style="color: white" v-if="listen.angefangen.length === 0">Keine gespeicherte Liste</p>
                <Listenitem :item="liste" :key="index" @load="load"
                            v-for="(liste, index) in listen.angefangen"></Listenitem>
            </div>

            <!--Fertige Listen-->
            <div :key="'fertig'" v-else>
                <p style="color: white" v-if="listen.fertig.length === 0">Keine gespeicherte Liste</p>
                <Listenitem :item="liste" :key="index" @load="load"
                            v-for="(liste, index) in listen.fertig"></Listenitem>
            </div>
        </div>
        <div class="w-100 text-center mt-5" v-else>
            <b-spinner variant="white"></b-spinner>
        </div>
    </Transition>
</template>

<script>
    import Listenitem from "@/components/Listen/Listenitem";
    import {mapGetters} from 'vuex';
    import {load} from "../Loader"

    export default {
        name: "Listen",
        components: {Listenitem},
        computed: {
            ...mapGetters(["listen", "loadingListe"])
        },
        methods: {
            load(item) {
                load(item["@id"])
            }
        },
    }
</script>

<style scoped>

</style>