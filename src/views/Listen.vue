<template>
    <Transition mode="out-in" name="animation">
        <!--Angefangene Listen-->
        <div :key="'offen'" v-if="$route.params.offen==='true'">
            <Listenitem :item="liste" :key="index" v-for="(liste, index) in listen.angefangen"></Listenitem>
        </div>

        <!--Fertige Listen-->
        <div :key="'fertig'" v-else>
            <Listenitem :item="liste" :key="index" v-for="(liste, index) in listen.fertig"></Listenitem>
        </div>
    </Transition>
</template>

<script>
    import Listenitem from "@/components/Listen/Listenitem";
    import {mapGetters} from 'vuex';

    export default {
        name: "Listen",
        components: {Listenitem},
        computed: {
            ...mapGetters(["listen"])
        }
    }
</script>

<style scoped>

</style>