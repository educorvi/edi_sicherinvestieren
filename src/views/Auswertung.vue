<template>
  <div>
    <div v-if="fragebogen">
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

export default {
  name: "Auswertung",
  components: {Hinweis, Auswertungsfrage, CustomSpinner},
  data() {
    return {
      fragebogen: null,
      item: null
    }
  },

  mounted() {
    getAllListen().then(() => {
    console.log(this.$route.query)
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
  }
}
</script>

<style scoped>

</style>
