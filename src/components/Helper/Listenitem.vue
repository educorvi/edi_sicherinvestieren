<template>

  <div>
    <b-row align-v="center">
      <!--            Informationen-->
      <b-col cols="10" v-b-modal="`modal_zu_${item.name}`">
        <div style="text-align: left">
          <h5 class="mb-0">{{ item.name }}</h5>
          <p class="text-muted" v-if="item.fragebogenName">{{ item.fragebogenName }}</p>
          <b-progress :max="100" class="mt-n3" height="12px" v-if="item.fertig===0">
            <b-progress-bar :value="item.fortschritt"></b-progress-bar>
          </b-progress>
        </div>
      </b-col>

      <!--            Knopf zum Löschen-->
      <b-col cols="2">
        <img @click="deleteListeWrapper" alt="delete" src="/icons/delete.svg" style="width: max-content">
      </b-col>
    </b-row>


    <hr v-if="!last"/>


    <b-modal :id="`modal_zu_${item.name}`" :ok-title="item.fertig===0?'Laden':'Auswertung laden'" :title="`Daten zu ${item.name}`" @ok="load"
             @shown="loadBar" cancel-title="Schließen" centered scrollable>
      <!--            <b-progress :value="Math.round(item['fortschritt']||0)" :max="100" class="mt-n3 ml-n3 mr-n3 rounded-0" variant="success" style="height: 6px"></b-progress>-->

      <!--            <ProgressCircle :progress="Math.round(item['fortschritt']||0)"/>-->
      <div class="d-flex justify-content-center mb-4" v-if="item.fertig===0">
        <div :id="'container_progress_'+this.item.name.replace(/ /g,'_')" style="width: 100px; height: 100px"/>
      </div>

      <div style="max-width: 100%; overflow-x: scroll;">
        <table style="max-width: 100%">
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
      </div>
    </b-modal>
  </div>


</template>

<script>
//@group Helper
//@vuese
//Item, das Daten zu einer Liste anzeigt

import 'progressbar.js'

export default {
  name: "Listenitem",
  data() {
    return {
      bar: null
    }
  },
  props: {
    //Das Listenitem, das angezeigt werden soll
    item: {
      type: Object,
      required: true
    },
    //Ist es das letzte Listenitem? => Divider ausblenden
    last: {
      type: Boolean
    }
  },
  methods: {
    //Wenn zu löschen
    deleteListeWrapper() {
      this.$bvModal.msgBoxConfirm(`Wollen Sie die Liste ${this.item.name} wirklich löschen?`, {
        title: "Bestätigen",
        size: "sm",
        okVariant: "danger",
        okTitle: "Löschen",
        cancelTitle: "Abbrechen",
        centered: true
      }).then(value => {
        if (value) {
          this.$emit("deleted")
        }
      })

    },

    //Laden des verknüpften Fragebogens
    load() {
      if (this.item.fertig === 0) {
        this.$router.push("/fragebogen?data=" + JSON.stringify(this.item) + "&id=" + this.item.fragebogen + "&load=true");
      } else {
        this.$router.push(`/auswertung?name=${this.item.name}`);
      }
    },
    loadBar() {
      if (this.item.fertig === 0) {
        const ProgressBar = require('progressbar.js');
        this.bar = new ProgressBar.Circle('#container_progress_' + this.item.name.replace(/ /g, '_'), {
          color: '#51ae31',
          strokeWidth: 5,
          step: function (state, circle) {
            const value = Math.round(circle.value() * 100);
            circle.setText(value + '%');

          },
          easing: 'easeInOut',
          trailColor: '#eee'
        });
        this.bar.animate(this.item.fortschritt / 100)
      }
    }
  },
}
</script>

<style>
</style>
