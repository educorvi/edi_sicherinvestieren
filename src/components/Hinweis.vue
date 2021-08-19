<template>
  <b-modal :id="`hinweis_${hinweis}`" v-model="show" :title="(hinweise[hinweis]|| {title: 'Lädt...'}).title" visible scrollable centered>
    <span v-if="hinweise[hinweis]" v-html="hinweise[hinweis].text"/>
    <div v-else><custom-spinner/></div>
    <template v-slot:modal-footer>
      <div class="w-100" style="display: flex; justify-content: space-between">
        <b-form-checkbox v-model="futureHide" switch>
          <b>In Zukunft nicht mehr anzeigen</b>
        </b-form-checkbox>
        <b-button variant="primary" @click="show = false">Weiter</b-button>
      </div>
    </template>
  </b-modal>
</template>
<script>
//@vuese
//Modal zum Anzeigen von Hinweisen
import {mapGetters} from 'vuex';
import CustomSpinner from "./Helper/CustomSpinner";

export default {
  name: "Hinweis",
  components: {CustomSpinner},
  props: {
    //Name des Hinweises, wie in hinweise.js festgelegt
    hinweis: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters(["hinweise"])
  },
  data() {
    return {
      //Wird der Hinweis gezeigt
      show: true,
      //Soll der Hinweis in Zukunft versteckt werden?
      futureHide: false
    }
  },
  watch: {
    futureHide: function (newValue) {
      this.$ls.set(`hinweis_${this.hinweis}_disabled`, newValue)

    }
  },
  created() {
    this.show = !this.$ls.get(`hinweis_${this.hinweis}_disabled`, false)
  }
}
</script>

<style scoped>

</style>
