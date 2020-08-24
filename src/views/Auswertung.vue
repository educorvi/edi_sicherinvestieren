<template>
  <div class="text-center">
    <div v-if="fragebogen">
      <b-button @click="shareLink" variant="primary" class="w-100">Teilen</b-button>
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
// eslint-disable-next-line no-unused-vars
import LZString from "../libs/lz-string";
import config from "../config.json";

export default {
  name: "Auswertung",
  components: {Hinweis, Auswertungsfrage, CustomSpinner},
  data() {
    return {
      fragebogen: null,
      item: null,
      link: "",
      linkstatus: 0,
      linkstati: {
        SUCCESS: 0,
        REMOVED_NOTES: 1
      }
    }
  },

  created() {
    getAllListen().then(() => {
      if (this.$route.query.shared) {
        this.item = JSON.parse(LZString.decompress(JSON.parse(this.$route.query.data)));
      } else {
        this.item = getListe(this.$route.query.name)[0];
      }
      if (this.item) {
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
      } else {
        this.$root.$bvToast.toast("Laden der Auswertung fehlgeschlagen", {
          title: "Fehler",
          variant: "danger",
          autoHideDelay: 5000
        })
        this.$router.push("/?subito=true");
      }

    })
  },
  methods: {
    shareLink() {
      this.link = config.baseURL + "auswertung?shared=true&data=" + encodeURIComponent(JSON.stringify(LZString.compress((JSON.stringify(this.item)))));
      if (this.link.length > 2048) {
        this.link = config.baseURL + "auswertung?shared=true&data=" + encodeURIComponent(JSON.stringify(LZString.compress((JSON.stringify({...this.item, notizen: []})))));
        this.$bvToast.toast("Beim Teilen wurden die Notizen ausgeblendet, da zu viele Notizen im Fragebogen enthalten sind", {
          title: "Notizen ausgeblendet",
          autoHideDelay: 10000
        })
        this.linkstatus = this.linkstati.REMOVED_NOTES;
      }
      const shareData = {
        title: "Auswertung von \"" + this.item.name + "\"",
        text: "Auswertung von \"" + this.item.name + "\" bezüglich des Fragebogens \"" + this.item.fragebogenName + "\"",
        url: this.link
      }
      if (navigator.canShare && navigator.canShare(shareData)) {
        navigator.share(shareData)
            .then(() => console.log('Share was successful.'))
            .catch((error) => console.log('Sharing failed', error));
      } else {
        navigator.clipboard.writeText(this.link);
        this.$bvToast.toast("Link zum Teilen in das Clipboard kopiert. Sie können ihn nun an einem beliebigen Ort einfügen", {
          title: "Kopiert",
          autoHideDelay: 10000
        })
      }
    }
  },
}
</script>

<style scoped>

</style>
