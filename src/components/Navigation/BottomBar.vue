<template>
    <md-bottom-bar id="bottomBar" md-sync-route>
        <md-bottom-bar-item :disabled="!loggedIn" to="/liste/true">
            <md-badge :md-content="listen.angefangen.length" class="cBadge" md-dense
                      v-if="listen.angefangen.length !== 0">
                <md-icon class="md-bottom-bar-icon  mr-3 ml-3" md-src="icons/list.svg"></md-icon>
            </md-badge>
            <md-icon class="md-bottom-bar-icon  mr-3 ml-3" md-src="icons/list.svg" v-else></md-icon>

            <!--            <md-icon class="md-bottom-bar-icon" md-src="icons/list.svg"></md-icon>-->

            <span class="md-bottom-bar-label">Offene Listen </span>


        </md-bottom-bar-item>
        <md-bottom-bar-item exact md-icon="icons/home.svg" md-label="Start" to="/"></md-bottom-bar-item>
        <md-bottom-bar-item :disabled="!loggedIn" md-icon="icons/listC.svg" md-label="Fertige Listen"
                            to="/liste/false"></md-bottom-bar-item>
    </md-bottom-bar>
</template>
<script>
    import {mapGetters} from "vuex"

    export default {
        name: 'BottomBar',
        computed: {
            ...mapGetters(["loggedIn", "listen"])
        }
    }
</script>
<style>
    #bottomBar {
        position: fixed;
        /* fixing the position takes it out of html flow - knows
                          nothing about where to locate itself except by browser
                          coordinates */
        left: 0; /* top left corner should start at leftmost spot */
        bottom: 0; /* top left corner should start at topmost spot */
        width: 100vw; /* take up the full browser width */
        z-index: 200; /* high z index so other content scrolls underneath */
        /*background: #014b94;*/
        height: 60px;
    }

    .cBadge {

    }
</style>
