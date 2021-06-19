<template>
  <div id="app">
    <Headbar/>
    <vue-pull-refresh v-if="$route.name === 'Fragebögen' && scrollBehaviourSupported" :onRefresh="reload" :config="refreshConfig">
      <main-view/>
    </vue-pull-refresh>
    <div v-else>
      <main-view/>
    </div>
    <div class="d-flex justify-content-center" id="bottomDiv">
      <BottomBar id="bottombar"/>
    </div>


    <Hinweis hinweis="begruessung"/>
  </div>
</template>


<script>
//@vuese
//Startpunkt der App
import Headbar from "./components/Navigation/Headbar";
import BottomBar from "./components/Navigation/BottomBar";
import {mapGetters} from "vuex";
import db, {sync} from "./js/localDatabase";
import Hinweis from "./components/Hinweis";
import config from './config.json'
import VuePullRefresh from 'vue-pull-refresh'
import MainView from "@/MainView";
import {loginNavCredentials} from "@/js/globalMethods";

export default {
  components: {MainView, Hinweis, BottomBar, Headbar, VuePullRefresh},
  computed: {
    ...mapGetters(["fragebogenData", "loggedIn", "reload"]),
    scrollBehaviourSupported() {
      return CSS.supports('overscroll-behavior-y', 'none');
    }
  },
  created() {
    if (this.config === undefined || this.config === null) {
      this.$store.commit("setConfig", config);
      this.$store.commit('setUserID', this.$ls.get('userID', null));
      if (this.loggedIn) {
        //Starte Synchronisation mit remote
        sync()
      }
      //Alle Listen abrufen und in store speichern
      db.getAllListen();

    } else {
      this.$store.commit('setUserID', this.$ls.get('userID', null));
      if (this.loggedIn) {
        //Starte Synchronisation mit remote
        sync()
      }
      //Alle Listen abrufen und in store speichern
      db.getAllListen();
    }


    loginNavCredentials(this.$ls);

    //    Dirty PreCaching
    this.http.get(config.impressum);
    this.http.get(config.datenschutz);
  },
  methods: {
  },
  data() {
    return {
      refreshConfig: {
        startLabel: "Fragebögen aktualisieren",
        errorLabel: "Aktualisierung fehlgeschlagen",
        readyLabel: "Fragebögen aktualisieren",
        loadingLabel: "Lädt..."
      }
    }
  },
}
</script>


<style lang="scss">
@import "styles";

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
{
  opacity: 0;
}

#app {
  text-align: center;
}

$breakpoint: 576px;

#bottomDiv {
  text-align: center;
  /*padding-left: 30%;*/
  /*padding-right: 30%;*/

  position: fixed;
  /* fixing the position takes it out of html flow - knows
                    nothing about where to locate itself except by browser
                    coordinates */
  left: 0; /* top left corner should start at leftmost spot */
  bottom: 0; /* top left corner should start at topmost spot */
  z-index: 200; /* high z index so other content scrolls underneath */
  height: 70px;
  width: 100vw;
  background-color: white;
  padding-top: 0;
  padding-bottom: 20px;
}

#bottombar {
  box-shadow: none;
}

@media(min-width: $breakpoint) {
  #bottombar {
    width: fit-content;
    min-width: fit-content !important;
  }
}


.fade-enter-active, .fade-leave-active {
  transition: opacity .15s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
{
  opacity: 0;
}
</style>
