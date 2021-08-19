<template>
  <div>
    <h3 class="mb-0">Sicher Investieren</h3>
    <p class="text-muted">Version: {{ appVersion }}</p>
    <hr>
    <span class="text-left" v-html="appInfo.text"/>
  </div>
</template>

<script>
//@group Views
//@vuese
//Über die Anwendung
import {mapGetters} from "vuex";

export default {
  name: "About",
  computed: {
    ...mapGetters(["appVersion", "appInfo"])
  },
};
</script>
