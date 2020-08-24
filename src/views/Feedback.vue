<template>
  <div class="text-left" v-if="!sent">
    <label for="stars">Bitte bewerten Sie Ihre Erfahrung mit dieser App:</label>
    <b-form-rating @change="check" id="stars" v-model="rating" variant="warning" :class="'mb-3 ' + (invalid?'border-danger':'')"></b-form-rating>
    <label for="comment">Anmerkungen:</label>
    <b-form-textarea v-model="comment" placeholder="Optional" rows="3" id="comment"></b-form-textarea>
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
      invalid: false
    }
  },
  methods: {
    check() {
      this.invalid = this.rating === 0;
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