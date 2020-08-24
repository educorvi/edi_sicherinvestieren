<template>
  <b-card :id="'card_'+frage['@id']"
          :style="'border-color: '+color+'; background-color: '+color" class="mt-2" no-body
          v-if="selected !== undefined">
    <b-card-header v-b-toggle="'col_'+frage['@id']">
      <h5 :style="getStyle(getOption().color)" class="mb-0">{{ frage.title }}</h5>
      <p :style="getStyle(getOption().color)">Gewählte Antwort: <b>{{ selected }}</b></p>
      <h6 v-if="bewertung" :style="getStyle(getOption().color)" class="mb-1 mt-1"><b>{{ bewertung }}</b></h6>
    </b-card-header>
    <b-collapse :id="'col_'+frage['@id']" accordion="auswertung">
      <b-card-body style="background-color: white; text-align: left">
        <span v-html="frageOrData(frage.frage).data"></span>
        <div v-if="notiz">
          <hr>
          <p><b>Eigene Notizen:</b></p>
          <p>{{ notiz }}</p>
        </div>
        <div v-if="frageOrData(frage.tipp).data">
          <hr>
          <p><b>Hinweis:</b></p>
          <span v-html="frageOrData(frage.tipp).data"></span>
        </div>
      </b-card-body>
    </b-collapse>
  </b-card>
</template>

<script>
export default {
  name: "Auswertungsfrage",
  props: {
    frage: {
      type: Object,
      required: true
    },
    selected: {
      type: String,
      required: true
    },
    notiz: {
      type: String,
      required: false
    }
  },
  computed: {
    color() {
      return this.getOption().color;
    },
    bewertung() {
      switch (this.getOption().rates) {
        case "handlung":
          return "Handlungsbedarf";
        case "klaerung":
          return "Klärungsbedarf";
        default:
          return "";
      }
    }
  },
  methods: {
    frageOrData(obj) {
      return obj || {data: null}
    },
    getOption() {
      for (const option of this.frage.optionen) {
        if (option.antwort === this.selected) {
          return option;
        }
      }
    },
    getStyle(color) {

      const bigint = parseInt(color.replace("#", ""), 16);
      let rgb = [];
      rgb[0] = (bigint >> 16) & 255;
      rgb[1] = (bigint >> 8) & 255;
      rgb[2] = bigint & 255;

      const o = Math.round(((parseInt(rgb[0]) * 299) +
          (parseInt(rgb[1]) * 587) +
          (parseInt(rgb[2]) * 114)) / 1000);
      //default: 125
      const fore = (o > 140) ? 'black' : 'white';

      return "color: " + fore;
    },
    scroll(id) {
      document.getElementById(id).scrollIntoView(true)
    }
  }
}
</script>

<style scoped>
p {
  margin-bottom: 0;
}
</style>
