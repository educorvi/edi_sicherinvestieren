<template>
    <p class="text-muted" v-if="listen.length<=0">Noch keine {{$route.params.fertig === "true"?"beendeten":"offenen"}} Listen</p>
    <div v-else>
        <Listenitem :item="list.doc" :key="list.name" :last="index===listen.length-1" @deleted="deleteList({...list.doc, _rev:list.value.rev})"
                    v-for="(list, index) in listen"/>
    </div>
</template>

<script>
    import db from "../js/localDatabase"
    import Listenitem from "../components/Helper/Listenitem";
    import {mapGetters} from "vuex"

    export default {
        name: "Listen",
        components: {Listenitem},
        computed: {
            ...mapGetters(["listen"])
        },
        methods: {
            deleteList(list) {
                db.deleteListe(list);
            }
        },

    }
</script>

<style scoped>

</style>
