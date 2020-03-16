<template>


        <md-bottom-bar md-sync-route>
            <md-bottom-bar-item :disabled="!loggedIn" to="/listen/false">

                <!--            @TODO Badge implementieren-->
                <md-badge v-if="offeneListen>0" :md-content="offeneListen">
                    <md-icon class="md-bottom-bar-icon" md-src="icons/list.svg"></md-icon>
                    <span class="md-bottom-bar-label">Offene Listen </span>
                </md-badge>
                <div v-else>
                    <md-icon class="md-bottom-bar-icon" md-src="icons/list.svg"></md-icon>
                    <span class="md-bottom-bar-label">Offene Listen </span>
                </div>


            </md-bottom-bar-item>
            <md-bottom-bar-item exact md-icon="icons/home.svg" md-label="Start" to="/"></md-bottom-bar-item>
            <md-bottom-bar-item :disabled="!loggedIn" md-icon="icons/listC.svg" md-label="Fertige Listen"
                                to="/listen/true"></md-bottom-bar-item>
        </md-bottom-bar>

</template>
<script>
    // import {mapGetters} from "vuex"


    export default {
        name: 'BottomBar',
        data() {
            return {
                //@Todo remove Dummy
                loggedIn: true
            }
        },
        computed: {
            offeneListen() {
                return this.$store.state.listen.length;
            }
        },
    }
</script>
<style lang="scss">

</style>
