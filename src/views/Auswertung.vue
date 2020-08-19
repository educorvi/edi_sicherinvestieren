<template>
  <div class="text-center">
    <div v-if="fragebogen">
      <b-button @click="share" variant="primary" class="w-100">Teilen</b-button>
      <hr>
      <Auswertungsfrage :frage="fragebogen.items[i]" :key="i+fragebogen.items[i].toString()"
                        :selected="item.selected[i]"
                        v-for="i in item.history" :notiz="item.notizen[i]"></Auswertungsfrage>
    </div>
    <custom-spinner v-else/>
    <Hinweis hinweis="rechtlicheEinschraenkung"/>
  </div>
</template>

<script>
//@group Views
//@vuese
//Auswertungsansicht des Fragebogens
import CustomSpinner from "../components/Helper/CustomSpinner";
import Auswertungsfrage from "../components/Helper/Auswertungsfrage";
import Hinweis from "../components/Hinweis";
import {getAllListen, getListe} from "../js/localDatabase";
import LZString from "../libs/lz-string";
import config from "../config.json";

export default {
  name: "Auswertung",
  components: {Hinweis, Auswertungsfrage, CustomSpinner},
  data() {
    return {
      fragebogen: null,
      item: null,
      shareLink: ""
    }
  },

  mounted() {
    getAllListen().then(() => {
      this.item = getListe(this.$route.query.name)[0];
      //Abrufen des Fragebogens
      this.http.get(this.item.fragebogen + "?fullobjects=true").then(res => {
        this.fragebogen = res.data;
      }).catch(err => {
        console.error(err);
        this.$root.$bvToast.toast("Laden der Auswertung fehlgeschlagen", {
          title: "Fehler",
          variant: "danger",
          autoHideDelay: 5000
        })
        this.$router.push("/?subito=true");
      });
    })
  },
  methods: {
    share() {
      this.shareLink = config.baseURL + "auswertung?shared=true&data=" + LZString.compress(JSON.stringify(this.item));
      const shareData = {
        title: "Auswertung von \"" + this.item.name + "\"",
        text: "Auswertung von \"" + this.item.name + "\" bezüglich des Fragebogens \"" + this.item.fragebogenName + "\"",
        url: this.shareLink
      }
      if (navigator.canShare && navigator.canShare(shareData)) {
        navigator.share(shareData)
            .then(() => console.log('Share was successful.'))
            .catch((error) => console.log('Sharing failed', error));
      } else {
        console.log(`Your system doesn't support sharing files.`);
      }
    }
  },
}
</script>

<style scoped>

</style>
