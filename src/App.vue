<template>
  <div id="app">
    <Headbar/>
    <div class="container-fluid pt-3 pb-3" id="view">
      <b-card no-body>
        <b-card-header>
          <h5>{{$route.name!=="Fragebogen"?$route.name:fragebogenData.title}}</h5>
          <p class="mb-0" v-if="$route.name==='Fragebogen'">{{fragebogenData.thema}}</p>
        </b-card-header>
        <b-card-body>
          <router-view/>
        </b-card-body>
      </b-card>
    </div>
    <div id="bottomDiv" class="d-flex justify-content-center">
      <BottomBar id="bottombar"/>
    </div>
  </div>
</template>

<style lang="scss">
  @import "styles";

  #app {
    width: 100%;
    height: 100%;
    min-height: 100vh;
    text-align: center;
    background-color: $primary;
  }

  #view {
    max-width: 800px;
    margin-bottom: 60px;
  }

  $breakpoint: 576px;

  #bottomDiv{
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

  @media(min-width: $breakpoint){
    #bottombar {
      width: fit-content;
      min-width: fit-content !important;
    }
  }


  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    opacity: 0;
  }
</style>
<script>
  import Headbar from "@/components/Navigation/Headbar";
  import BottomBar from "@/components/Navigation/BottomBar";
  import {mapGetters} from "vuex";
  import db from './js/localDatabase'

  export default {
    components: {BottomBar, Headbar},
    computed: {
      ...mapGetters(["fragebogenData"])
    },
    created() {
      db.getAllListen();
    }
  }
</script>
