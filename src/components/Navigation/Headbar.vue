<template>
    <b-navbar id="bar" toggleable="lg">
        <b-navbar-brand href="#">
            <b-img id="logo" src="images/bg-etem.svg"/>
        </b-navbar-brand>
        <b-navbar-toggle target="collapse"></b-navbar-toggle>

        <b-collapse class="ml-n3 mr-n3" id="collapse" is-nav style="background: white">
            <b-navbar-nav class="ml-auto border-bottom border-dark">
                <b-nav-item :to="'/login'" class="text-center" v-if="!loggedIn">Login</b-nav-item>
                <b-nav-item :to="'/logout'" class="text-center" v-else>Logout</b-nav-item>
                <b-nav-item class="text-center" href="#">Hilfe</b-nav-item>
                <b-nav-item :to="'/settings'" class="text-center">Einstellungen</b-nav-item>
                <b-nav-item class="text-center" href="#">Kontakt</b-nav-item>
                <b-nav-item :to="'/impressum'" class="text-center">Impressum</b-nav-item>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
    import {mapGetters} from "vuex"

    export default {
        name: "Headbar",
        computed: {
            ...mapGetters(["loggedIn"])
        }
    }
</script>

<style scoped>
    #logo {
        height: 40px;
    }

    #bar {
        position: fixed;
        /* fixing the position takes it out of html flow - knows
                          nothing about where to locate itself except by browser
                          coordinates */
        left: 0; /* top left corner should start at leftmost spot */
        top: 0; /* top left corner should start at topmost spot */
        width: 100vw; /* take up the full browser width */
        z-index: 200; /* high z index so other content scrolls underneath */
        background: white;
        height: 60px;
    }
</style>