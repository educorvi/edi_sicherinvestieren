<template>
  <div class="text-center">
    <div v-if="fragebogen">
      <table class="text-left" style="width: 100%">
        <tr>
          <td>Dateiname:</td>
          <td><b>{{ item.name }}</b></td>
        </tr>

        <tr>
          <td>Fragebogen:</td>
          <td><b>{{ item.fragebogenName }}</b></td>
        </tr>

        <tr v-if="item.maschinentyp">
          <td>Maschinentyp:</td>
          <td><b>{{ item.maschinentyp }}</b></td>
        </tr>

        <tr v-if="item.maschinennummer">
          <td>Maschinennummer:</td>
          <td><b>{{ item.maschinennummer }}</b></td>
        </tr>

        <tr v-if="item.hersteller">
          <td>Hersteller:</td>
          <td><b>{{ item.hersteller }}</b></td>
        </tr>

        <tr v-if="item.jahr">
          <td>Baujahr:</td>
          <td><b>{{ item.jahr }}</b></td>
        </tr>

        <tr v-if="item.globalNotizen">
          <td>Notizen:</td>
          <td><b>{{ item.globalNotizen }}</b></td>
        </tr>
      </table>
      <hr>
      <div v-if="isEnabled('share')">
        <b-button class="w-100" v-b-modal.share variant="primary">Teilen und Exportieren</b-button>
        <hr>
      </div>
      <Auswertungsfrage :frage="fragebogen.items[i]" :key="i+fragebogen.items[i].toString()"
                        :notiz="item.notizen[i]"
                        :selected="item.selected[i]" v-for="i in item.history"></Auswertungsfrage>
    </div>
    <custom-spinner v-else/>
    <Hinweis hinweis="rechtlicheEinschraenkung"/>
    <b-modal id="share" ok-only ok-title="Schließen" title="Teilen" centered>
      <b-button-group vertical class="w-100">

        <b-button v-if="isEnabled('sharePDF')" @click="downloadPDF" :disabled="!isEnabled('sharePDF')" variant="light">
          PDF Datei herunterladen <i v-if="!isEnabled('sharePDF')">(Momentan leider nicht verfügbar)</i>
        </b-button>
        <b-button v-if="isEnabled('shareLink')" @click="shareLink" :disabled="!isEnabled('shareLink')" variant="light">
          Als Link teilen <i v-if="!isEnabled('shareLink')">(Momentan leider nicht verfügbar)</i>
        </b-button>

      </b-button-group>
    </b-modal>
    <b-modal v-model="showPdfViewer" centered hide-footer size="xl" title="PDF Dokument">
      <template #modal-header>
        <div>
          <h5 class="mb-0">PDF Dokument</h5>
        </div>
        <b-button-close @click="showPdfViewer=false"></b-button-close>
      </template>
      <div id="viewerContent" class="m-n3">
        <iframe :src="'/pdfjs-2.9.359-dist/web/viewer.html?file='+pdfData" id="pdf_frame" allowfullscreen>
          This browser does not support PDF!
        </iframe>
      </div>
    </b-modal>
  </div>
</template>

<script>
//@group Views
//@vuese
//Auswertungsansicht des Fragebogens
import CustomSpinner from "../components/Helper/CustomSpinner";
import Auswertungsfrage from "../components/Helper/Auswertungsfrage";
import Hinweis from "../components/Hinweis";
import {getAllListen, getListe} from "@/js/localDatabase";
import config from "../config.json";
import {mapGetters} from "vuex"
import {isEnabled, decompressData, urlCompressData, reportError} from "@/js/globalMethods";
import {createObjectURL} from "@educorvi/file_save_tools"

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
      },
      showPdfViewer: false,
      pdfData: null
    }
  },
  computed: {
    ...mapGetters(["config", "frageboegenFlattend"])
  },

  created() {
    getAllListen().then(() => {
      // Wenn die Liste geteilt ist, werden die Daten aus der URL geladen, sonst aus der pouchDB
      if (this.$route.query.shared) {
        this.item = decompressData(this.$route.query.data);
      } else {
        this.item = getListe(this.$route.query.name);
      }
      if (this.item) {
        //Laden des Fragebogens
        this.http.get(this.item.fragebogen + "?fullobjects=true").then(res => {
          this.fragebogen = res.data;
        }).catch(err => {
          reportError(err)
          this.$root.$bvToast.toast("Laden der Auswertung fehlgeschlagen: Fragebogen konnte nicht abgerufen werden", {
            title: "Fehler",
            variant: "danger",
            autoHideDelay: 5000
          })
          this.$router.push("/?subito=true");
        });
      } else {
        reportError(new Error("Geladene Daten sind null"))
        this.$root.$bvToast.toast("Laden der Auswertung fehlgeschlagen: Laden der Daten fehlgeschlagen", {
          title: "Fehler",
          variant: "danger",
          autoHideDelay: 5000
        })
        this.$router.push("/?subito=true");
      }

    })
  },
  methods: {
    isEnabled,
    downloadPDF() {
      let sendItem = {
        ...this.item,
        result: this.fragebogen
      };
      console.log(sendItem);
      sendItem.result.items = sendItem.result.items.map((x, i) => (
          {
            ...x,
            selected: this.item.selected[i],
            notiz: this.item.notizen[i],
            seen: this.item.history.includes(i)
          }))
      this.http.post(config.pdf, sendItem).then(res => this.forceFileDownload(res));
      this.$bvModal.hide("share")
      this.$bvToast.toast("Das Herunterladen der PDF Datei wurde gestartet", {
        title: "Herunterladen gestartet",
        autoHideDelay: 10000
      })
    },
    forceFileDownload(response) {
      // downloadBase64(response.data, {contentType: 'application/pdf', filename: this.item.name + '.pdf'})
      this.pdfData = createObjectURL(response.data);
      this.showPdfViewer = true;
    },
    shareLink() {
      this.$bvModal.hide("share");
      this.link = config.baseURL + "auswertung?shared=true&data=" + urlCompressData(this.item);
      if (this.link.length > 2048 && config.limitURLLength) {
        this.link = config.baseURL + "auswertung?shared=true&data=" + urlCompressData({
          ...this.item,
          notizen: []
        });
        this.$bvToast.toast("Es werden die Notizen ausgeblendet, da zu viele Notizen im Fragebogen enthalten sind", {
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
            .catch((error) => console.warning('Sharing failed', error));
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

<style scoped lang="scss">
@import "./../styles";
#pdf_frame {
  height: 75vh;
  width: 100%;
  max-width: 100% !important;
  border: none;
  border-bottom-left-radius: $border-radius !important;
  border-bottom-right-radius: $border-radius !important;
}
</style>
