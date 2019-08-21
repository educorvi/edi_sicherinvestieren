<template>
    <md-bottom-bar id="bottomBar" md-sync-route>
        <md-bottom-bar-item md-icon="icons/list.svg" md-label="Offene Listen" to="/liste/offen"></md-bottom-bar-item>
        <md-bottom-bar-item exact md-icon="icons/home.svg" md-label="Start" to="/"></md-bottom-bar-item>
        <md-bottom-bar-item md-icon="icons/listC.svg" md-label="Fertige Listen"
                            to="/liste/geschlossen"></md-bottom-bar-item>
    </md-bottom-bar>
</template>
<script>
    export default {
        name: 'BottomBar'
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
</style>
