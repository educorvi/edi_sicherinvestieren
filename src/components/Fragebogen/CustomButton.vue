<template>
    <b-button
            :style="getStyle"
            @click="$emit('click')">
        <b>{{button.antwort}}</b>
    </b-button>
</template>
<script>
    import {mapGetters} from "vuex"

    export default {
        name: 'CustomButton',
        computed: {
            ...mapGetters(["selected"]),
            getStyle() {
                if (this.selected[this.$route.params.frage] === this.button.antwort) {
                    const bigint = parseInt(this.button.color.replace("#", ""), 16);
                    let rgb = [];
                    rgb[0] = (bigint >> 16) & 255;
                    rgb[1] = (bigint >> 8) & 255;
                    rgb[2] = bigint & 255;

                    const o = Math.round(((parseInt(rgb[0]) * 299) +
                        (parseInt(rgb[1]) * 587) +
                        (parseInt(rgb[2]) * 114)) / 1000);
                    //default: 125
                    const fore = (o > 140) ? 'black' : 'white';

                    return "background-color: " + this.button.color + "; border-color: " + this.button.color + "; color: " + fore;
                } else {
                    return "background-color: white; border-color: " + this.button.color + "; color: " + this.button.color;
                }
            }
        },
        props: {
            button: {
                type: Object,
                default: () => {
                    return {text: "Fehler"};
                }
            }
        },
    }
</script>