<template>

    <md-bottom-bar id="bottomBar" md-sync-route>
        <md-bottom-bar-item :disabled="!loggedIn" to="/listen/false">

            <!--            @TODO Badge implementieren-->
            <!--            <md-badge :md-content="listen.angefangen.length" class="cBadge" md-dense-->
            <!--                      v-if="listen.angefangen.length !== 0">-->
            <!--                <md-icon class="md-bottom-bar-icon  mr-3 ml-3" md-src="icons/list.svg"></md-icon>-->
            <!--            </md-badge>-->
            <md-icon class="md-bottom-bar-icon" md-src="icons/list.svg"></md-icon>

            <!--            <md-icon class="md-bottom-bar-icon" md-src="icons/list.svg"></md-icon>-->

            <span class="md-bottom-bar-label">Offene Listen </span>


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
        computed: {
            // ...mapGetters(["loggedIn", "listen"])
        },
        data() {
            return {
                //@Todo remove Dummy
                loggedIn: true
            }
        },
    }
</script>
<style>

</style>
