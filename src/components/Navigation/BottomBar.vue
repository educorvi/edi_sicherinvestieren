<template>


        <md-bottom-bar md-sync-route>
            <md-bottom-bar-item to="/listen/false">
                <md-badge v-if="offeneListen.length>0" :md-content="offeneListen.length">
                    <md-icon class="md-bottom-bar-icon" md-src="icons/list.svg"></md-icon>
                    <span class="md-bottom-bar-label">Offene Listen </span>
                </md-badge>
                <div v-else>
                    <md-icon class="md-bottom-bar-icon" md-src="icons/list.svg"></md-icon>
                    <span class="md-bottom-bar-label">Offene Listen </span>
                </div>


            </md-bottom-bar-item>
            <md-bottom-bar-item exact md-icon="icons/home.svg" md-label="Start" to="/"></md-bottom-bar-item>
            <md-bottom-bar-item md-icon="icons/listC.svg" md-label="Fertige Listen"
                                to="/listen/true"></md-bottom-bar-item>
        </md-bottom-bar>

</template>
<script>
    //@group Navigation
    //@vuese
    //Bottom Bar zur Navigation


    import db from "../../js/localDatabase";

    export default {
        name: 'BottomBar',
        computed: {
            offeneListen() {
                return db.getListen(0)
            }
        },
    }
</script>
<style lang="scss">

</style>
