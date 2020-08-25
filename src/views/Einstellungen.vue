<template>
  <div>
    <div v-if="loggedIn">
      <b-row align-h="center" align-v="center">
        <b-col cols="12" md="auto">
          <b-button @click="logout">Verbindung aufheben</b-button>
        </b-col>
        <b-col col lg="8">
          <p class="text-muted m-0 mt-1">Hierdurch wird die Verbindung bzw Synchronisierung mit der Cloud
            aufgehoben, es
            werden jedoch weder lokal, noch in der Cloud Daten gelöscht</p>
        </b-col>
      </b-row>
      <hr>
    </div>
    <b-row align-h="center" align-v="center">
      <b-col cols="12" md="auto">
        <b-button @click="deleteData" variant="danger">Daten löschen</b-button>
      </b-col>
      <b-col col lg="8">
        <p class="text-muted m-0 mt-1">Alle Daten werden gelöscht</p>
      </b-col>
    </b-row>

  </div>
</template>

<script>
import {mapGetters} from "vuex"
import {deleteAllListen} from "../js/localDatabase";
import config from '../config.json'

export default {
  name: "Einstellungen",
  methods: {
    //Verbindung trennen
    logout() {
      this.$store.commit("setUserID", null)
      this.$ls.set('userID', null)
      if (navigator.credentials && !config.disabledFeatures.includes('credentialsAPI')) {
        navigator.credentials.preventSilentAccess()
      }
      location.reload();
    },
    deleteData() {
      this.$bvModal.msgBoxConfirm("Wollen Sie wirklich alle gespeicherten Fragebögen löschen?", {
        title: "Bestätigen",
        size: "sm",
        okVariant: "danger",
        okTitle: "Löschen",
        cancelTitle: "Abbrechen",
        centered: true
      }).then(value => {
        if (value) {
          deleteAllListen();
          this.$ls.clear();
        }
      })
    }
  },
  computed: {
    ...mapGetters(["loggedIn"])
  }
}
</script>

<style scoped>

</style>
