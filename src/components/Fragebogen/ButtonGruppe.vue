<template>
    <b-button-group class="w-100">
        <CustomButton :button="button" :key="index"
                      @click="$emit('click', button)"
                      v-for="(button, index) in frage.optionen"/>
    </b-button-group>
</template>
<script>
    import {mapGetters} from 'vuex';
    import CustomButton from "@/components/Fragebogen/CustomButton";

    export default {
        name: 'ButtonGruppe',
        components: {CustomButton},
        computed: {
            ...mapGetters(["frage"])
        },
    }
</script>
