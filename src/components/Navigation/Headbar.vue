<template>
    <div id="bar">
        <b-navbar toggleable="lg">
            <b-navbar-brand :to="'/'" class="mr-5">
                <b-img id="logo" src="/images/bg-etem.svg"/>
            </b-navbar-brand>
            <b-navbar-toggle target="collapse"></b-navbar-toggle>

            <b-collapse id="collapse" is-nav>
                <b-navbar-nav class="">
                    <b-nav-item :to="'/login'" v-if="!loggedIn">Login</b-nav-item>
                    <b-nav-item :to="'/'" @click="logout" v-else>Logout</b-nav-item>
                    <b-nav-item href="#">Hilfe</b-nav-item>
                    <b-nav-item :to="'/settings'">Einstellungen</b-nav-item>
                    <b-nav-item-dropdown text="Über">
                        <b-dropdown-item :to="'/about'">Info</b-dropdown-item>
                        <b-dropdown-item :to="'/kontakt'">Kontakt</b-dropdown-item>
                        <b-dropdown-item :to="'/impressum'">Impressum</b-dropdown-item>
                    </b-nav-item-dropdown>

                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
        <ProgressBar v-if="$route.name==='Fragebogen'"></ProgressBar>
    </div>

</template>

<script>
    //@group Navigation
    //@vuese
    //Navbar zur Navigation

    import ProgressBar from "@/components/Helper/ProgressBar";
    import {mapGetters} from "vuex"

    export default {
        name: "Headbar",
        components: {ProgressBar},
        computed: {
            ...mapGetters(["loggedIn"])
        },
        methods: {

            //Ausloggen
            logout() {
                this.$store.commit("setUserID", null)
                this.$ls.set('userID', null)
            }
        },
    }
</script>

<style scoped>
    #logo {
        height: 40px;
    }

    #bar {
        position: sticky;
        /* fixing the position takes it out of html flow - knows
                          nothing about where to locate itself except by browser
                          coordinates */
        left: 0; /* top left corner should start at leftmost spot */
        top: 0; /* top left corner should start at topmost spot */
        /*width: 100vw; !* take up the full browser width *!*/
        z-index: 200; /* high z index so other content scrolls underneath */
        background: white;
    }
</style>
