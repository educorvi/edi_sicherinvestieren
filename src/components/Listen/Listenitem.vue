<template>
    <div>
        <b-card class="mb-2">

            <img @click="confirm" alt="delete" class="float-right" src="/icons/delete.svg">

            <div @click="$emit('load', item)">
                <radial-progress-bar :completed-steps="item['fortschritt']" :diameter="60" :stroke-width="5"
                                     :total-steps=100
                                     class="float-left mr-3"
                                     v-if="item['fortschritt'] && item['fortschritt'] !==100">{{item['fortschritt']}}%
                </radial-progress-bar>

                <div>
                    <p v-if="item['maschnr']">{{item["maschnr"]}}</p>
                    <p v-if="item['maschnr'] && item['hersteller']"> von </p>
                    <p v-if="item['hersteller']">{{item["hersteller"]}}</p>
                    <h5>{{item.title}}</h5>
                    <p class="text-muted" v-if="fragebogenName">{{fragebogenName}}</p>
                </div>
            </div>

        </b-card>


        <b-modal :id="'deleteModal_'+item.title" centered>Wollen sie den Fragebogen "<b>{{item.title}}</b>" wirklich
            löschen?
        </b-modal>
    </div>
</template>

<script>
    /* eslint-disable no-console */

    import RadialProgressBar from 'vue-radial-progress';
    import axios from "axios";

    export default {
        name: "Listenitem",
        props: ["item"],
        components: {
            RadialProgressBar
        },
        data() {
            return {
                fragebogenName: null
            }
        },
        created() {
            // axios.get()
        },
        methods: {
            confirm() {
                this.$bvModal.msgBoxConfirm('Wollen Sie den Fragebogen "' + this.item.title + '" wirklich löschen?', {
                    title: 'Fragebogen löschen',
                    size: 'sm',
                    buttonSize: 'sm',
                    okVariant: 'danger',
                    okTitle: 'Löschen',
                    cancelTitle: 'Abbrechen',
                    footerClass: 'p-2',
                    hideHeaderClose: false,
                    centered: true
                }).then(value => {
                    if (value) {
                        this.$store.dispatch("setLoading", true);
                        axios.delete(this.item["@id"], {
                                headers: {
                                    Accept: "application/json"
                                }
                            }
                        ).then(res => {
                            console.log(res);
                            this.$store.dispatch("getListen");
                            this.$store.dispatch("setLoading", false);
                        });
                    }
                }).catch(err => {
                    console.log(err);
                })
            }
        }
    }
</script>

<style scoped>
    p {
        display: inline;
    }
</style>
