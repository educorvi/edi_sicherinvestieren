<template>
  <b-modal :id="`hinweis_${hinweis}`" v-model="show" :title="hinweise[hinweis].title" visible scrollable centered>
    <p>{{ hinweise[hinweis].text }}</p>
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

export default {
  name: "Hinweis",
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
