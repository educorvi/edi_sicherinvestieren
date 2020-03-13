<template>
    <p class="text-muted" v-if="listen.length<=0">Noch keine {{$route.params.fertig?"beendeten":"fertigen"}} Listen</p>
    <div v-else>
        <Listenitem :item="list" :key="list.name" :last="index===listen.length-1" @deleted="getListen()"
                    v-for="(list, index) in listen"/>
    </div>
</template>

<script>
    import db from "../js/localDatabase"
    import Listenitem from "@/components/Helper/Listenitem";

    export default {
        name: "Listen",
        components: {Listenitem},
        data() {
            return {
                listen: []
            }
        },
        created() {
            this.getListen();
        },
        watch: {
            "$route.params.fertig": function () {
                this.getListen();
            }
        },
        methods: {
            getListen() {
                db.getListen(this.$route.params.fertig === "true").then(res => this.listen = res);
            }
        },
    }
</script>

<style scoped>

</style>
