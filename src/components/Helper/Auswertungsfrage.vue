<template>
    <b-card :style="'border-color: '+Color+'; background-color: '+Color" class="mt-2" no-body
            v-b-toggle="'col_'+frage['@id']"
            v-if="selected !== undefined">
        <b-card-header>
            <h5 :style="getStyle(getOption().color)" class="mb-0">{{frage.title}}</h5>
            <p :style="getStyle(getOption().color)" class="mb-0">Gewählte Antwort: <b>{{selected}}</b></p>
        </b-card-header>
        <b-collapse :id="'col_'+frage['@id']">
            <b-card-body style="background-color: white; text-align: left"><span v-html="frage.frage.data"></span>
            </b-card-body>
        </b-collapse>
    </b-card>
</template>

<script>
    export default {
        name: "Auswertungsfrage",
        props: {
            frage: {
                type: Object,
                required: true
            },
            selected: {
                type: String,
                required: true
            }
        },
        computed: {
            Color() {
                return this.getOption().color;
            }
        },
        methods: {
            getOption() {
                for (const option of this.frage.optionen) {
                    if (option.antwort === this.selected) {
                        return option;
                    }
                }
            },
            getStyle(color) {

                const bigint = parseInt(color.replace("#", ""), 16);
                let rgb = [];
                rgb[0] = (bigint >> 16) & 255;
                rgb[1] = (bigint >> 8) & 255;
                rgb[2] = bigint & 255;

                const o = Math.round(((parseInt(rgb[0]) * 299) +
                    (parseInt(rgb[1]) * 587) +
                    (parseInt(rgb[2]) * 114)) / 1000);
                //default: 125
                const fore = (o > 140) ? 'black' : 'white';

                return "color: " + fore;
            }
        }
    }
</script>

<style scoped>
</style>
