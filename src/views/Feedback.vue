<template>
  <div class="text-left" v-if="!sent">
    <b-tabs content-class="mt-3" v-model="tab">
      <b-tab title="Feedback" active>
        <label for="stars">Bitte bewerten Sie Ihre Erfahrung mit dieser App:</label>
        <b-form-rating @change="check" id="stars" v-model="rating" variant="warning"
                       :class="(invalid?'border-danger':'')"></b-form-rating>
        <b-form-invalid-feedback :state="!invalid">Sie müssen mindestens einen Stern angeben</b-form-invalid-feedback>
        <label class="mt-3" for="comment">Anmerkungen:</label>
        <b-form-textarea v-model="comment" placeholder="Optional" rows="3" id="comment"></b-form-textarea>
      </b-tab>
      <b-tab title="Meldung eines Fehlers">
        <label for="comment">Beschreibung des Fehlers:</label>
        <b-form-textarea v-model="comment" rows="3" id="comment"></b-form-textarea>
      </b-tab>
    </b-tabs>
    <b-button class="mt-2 float-right" variant="primary" @click="send">Senden</b-button>
  </div>
  <div v-else>
    <p>Vielen Dank, Ihr Feedback wurde gesendet</p>
  </div>
</template>

<script>
export default {
  name: "Feedback",
  data() {
    return {
      sent: false,
      rating: 0,
      comment: "",
      invalid: false,
      tab: 0
    }
  },
  methods: {
    check() {
      this.invalid = this.rating === 0 && this.tab === 0;
    },
    send() {
      this.check();
      if (!this.invalid) {
        //@TODO Senden
        this.sent = true;
      }
    }
  },
}
</script>

<style scoped>

</style>