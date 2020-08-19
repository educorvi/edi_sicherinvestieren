<template>
  <div id="app">
    <Headbar/>
    <div class="container-fluid pt-3 pb-3" id="view">
      <b-card no-body>
        <b-card-header>
          <h5>{{ $route.name !== "Fragebogen" ? $route.name : fragebogenData.title }}</h5>
          <p class="mb-0" v-if="$route.name==='Fragebogen'">{{ fragebogenData.thema }}</p>
        </b-card-header>
        <b-card-body>
          <transition mode="out-in" name="fade">
            <router-view/>
          </transition>

        </b-card-body>
      </b-card>
    </div>
    <div id="bottomDiv" class="d-flex justify-content-center">
      <BottomBar id="bottombar"/>
    </div>


    <Hinweis hinweis="begruessung"/>
  </div>
</template>

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

#view {
  max-width: 800px;
  max-height: 100%;
  overflow: hidden;
  margin-bottom: 60px;
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
  height: 55px;
  width: 100vw;
  background-color: white;
}

@media(min-width: $breakpoint) {
  #bottombar {
    width: fit-content;
    min-width: fit-content !important;
    box-shadow: none;
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
<script>
//@vuese
//Startpunkt der App
import Headbar from "./components/Navigation/Headbar";
import BottomBar from "./components/Navigation/BottomBar";
import {mapGetters} from "vuex";
import {sync} from "./js/localDatabase";
import db from './js/localDatabase'
import Hinweis from "./components/Hinweis";
import config from './config.json'

export default {
  components: {Hinweis, BottomBar, Headbar},
  computed: {
    ...mapGetters(["fragebogenData", "loggedIn"])
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


    //    Dirty PreCaching
    this.http.get(config.impressum);
    this.http.get(config.datenschutz);
  },
  data() {
    return {}
  },
}
</script>
