<template>
  <div class="container-fluid pt-3" id="view">
    <b-card no-body>
      <b-card-header>
        <h5>{{ $route.name !== "Fragebogen" ? $route.name : fragebogenData.title }}</h5>
        <p class="mb-0" v-if="$route.name==='Fragebogen'">{{ fragebogenData.thema }}</p>
      </b-card-header>
      <b-card-body>
        <transition mode="out-in" name="fade">
          <router-view/>
        </transition>

      </b-card-body>
    </b-card>
  </div>
</template>
<script>
import {mapGetters} from 'vuex';

export default {
  name: 'main-view',
  computed: {
    ...mapGetters(["fragebogenData"])
  }
}
</script>
<style lang="scss">
@import "styles";

#view {
  max-width: 800px;
  padding-bottom: 80px;
}

$breakpoint: 576px;

@media(min-width: $breakpoint) {
}


</style>
