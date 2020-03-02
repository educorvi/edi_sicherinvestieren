<template>
    <div id="app">

        <Headbar/>


        <Transition mode="out-in" name="fade">
            <div class="text-center w-100" v-if="loading">
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
                                 :state="validation" v-model.trim="save['title']"></b-input>
                        <b-form-invalid-feedback :state="validation">
                            Dieser Titel ist bereits vergeben!
                        </b-form-invalid-feedback>
                        <b-input class="mb-1" placeholder="Hersteller" v-model.trim="save['hersteller']"></b-input>
                        <b-input autocomplete="off" class="mb-1" placeholder="Maschinennummer"
                                 v-model.trim="save['maschnr']"></b-input>
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
                save: {},
                validation: null
            }
        },
        components: {BottomBar, Headbar},
        computed: {
            ...mapGetters(["current", "frage", "loading", "fragen", "config", "listen"]),
            isModalCorrect() {
                return (this.save.title !== undefined && this.save.title !== "")
            }
        },
        methods: {
            initiateFragebogen(data) {
                this.$bvModal.show('modal-start');
                this.ausgewaehlterFragebogen = data;
            },
            startFragebogen() {
                if (!this.isTaken(this.save["title"])) {
                    this.validation = null;
                    this.$bvModal.hide('modal-start');
                    store.dispatch("setLoading", true);
                    store.dispatch("getFragenAndStart", {url: this.ausgewaehlterFragebogen.child["@id"], i: 0});
                    store.dispatch("setSavefile", this.save);
                    this.save = {};
                    this.ausgewaehlterFragebogen = {};
                } else {
                    this.validation = false;
                }
            },
            isTaken(title) {
                let taken = false;
                const angefangen = this.listen.angefangen;
                const fertig = this.listen.fertig;
                for (const element of angefangen) {
                    if (title === element.title) {
                        taken = true;
                    }
                }
                for (const element of fertig) {
                    if (this.title === element.title) {
                        taken = true;
                    }
                }
                return taken;
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


<style lang="scss">
    @import "style";

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

    #app {
        background-color: $primary;
        height: 100vh;
        padding-top: 12vh;
        padding-bottom: 12vh;
    }
</style>


<style scoped>
    #spinner {
        margin-top: 100px;
    }
</style>
