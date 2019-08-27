<template>
    <div id="app">

        <Headbar/>


        <Transition mode="out-in" name="fade">
            <div v-if="loading">
                <b-spinner id="spinner" variant="light"/>
            </div>
            <div v-else>

                <div class="container-fluid" id="root">
                    <Transition mode="out-in" name="animation">
                        <router-view @childPressed="initiateFragebogen"/>
                    </Transition>
                </div>


                <!--        StartModal mit Dateneingabe-->
                <b-modal centered id="modal-start" scrollable title="Maschinendaten">
                    <b-form autocomplete="off">
                        <b-input autocomplete="off" class="mb-1" placeholder="Dateiname (notwendig)" required
                                 v-model.trim="save['dateiname']"></b-input>
                        <b-input class="mb-1" placeholder="Hersteller" v-model.trim="save['hersteller']"></b-input>
                        <b-input autocomplete="off" class="mb-1" placeholder="Maschinennummer"
                                 v-model.trim="save['maschinennummer']"></b-input>
                    </b-form>
                    <div class="w-100" slot="modal-footer">
                        <b-button :disabled="!isModalCorrect" @click="startFragebogen" block class="mt-1"
                                  variant="success">
                            Start
                        </b-button>
                        <b-button @click="$bvModal.hide('modal-start')" block class="mt-1">Abbrechen</b-button>
                    </div>
                </b-modal>
            </div>
        </Transition>

        <BottomBar/>
    </div>
</template>


<script>
    import Headbar from "@/components/Navigation/Headbar";
    import BottomBar from "@/components/Navigation/BottomBar";
    import {mapGetters} from "vuex";
    import store from "@/store";

    export default {
        data() {
            return {
                ausgewaehlterFragebogen: {},
                save: {}
            }
        },
        components: {BottomBar, Headbar},
        computed: {
            ...mapGetters(["current", "frage", "loading", "fragen", "config"]),
            isModalCorrect() {
                return (this.save.dateiname !== undefined && this.save.dateiname !== "")
            }
        },
        methods: {
            initiateFragebogen(data) {
                this.$bvModal.show('modal-start');
                this.ausgewaehlterFragebogen = data;
            },
            startFragebogen() {
                this.$bvModal.hide('modal-start');
                store.dispatch("setLoading", true);
                store.dispatch("getFragenAndStart", {url: this.ausgewaehlterFragebogen.child["@id"], i: 0});
                store.dispatch("setSavefile", this.save);
                this.save = {};
                this.ausgewaehlterFragebogen = {};
            }
        },
        created() {
            store.dispatch("getConfig");
        },
        mounted() {
            store.dispatch("setDismissed", {i: 0, b: this.$ls.get("hinweis_0_ausblenden", false)});
            store.dispatch("setToken", this.$ls.get("token", null));
        }
    }
</script>


<style>
    #root {
        padding-top: 70px;
        padding-bottom: 112px;
    }

    .animation-enter-active, .animation-leave-active, .fade-enter-active, .fade-leave-active {
        transition: all .3s;
    }

    .animation-enter {
        transform: translateX(-10px);
        opacity: 0;
    }

    .animation-leave-to {
        transform: translateX(10px);
        opacity: 0;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>


<style scoped>


    /*#spinner {*/
    /*    margin-top: 70%;*/
    /*    margin-left: 45%;*/
    /*}*/
</style>