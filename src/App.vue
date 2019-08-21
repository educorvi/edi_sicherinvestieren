<template>
    <div id="app">

        <Headbar/>


        <div v-if="loading">
            <b-spinner id="spinner" variant="light"/>
        </div>
        <div v-else>

            <div class="container-fluid" id="root">
                <Transition name="slide">
                    <router-view @childPressed="initiateFragebogen"/>
                </Transition>
            </div>


            <!--        StartModal mit Dateneingabe-->
            <b-modal centered id="modal-start" scrollable title="Maschinendaten">
                <b-form>
                    <b-input class="mb-1" placeholder="Dateiname (notwendig)" required
                             v-model="save['dateiname']"></b-input>
                    <b-input class="mb-1" placeholder="Hersteller" v-model="save['hersteller']"></b-input>
                    <b-input class="mb-1" placeholder="Maschienennummer" v-model="save['maschienennummer']"></b-input>
                </b-form>
                <div class="w-100" slot="modal-footer">
                    <b-button :disabled="!isModalCorrect" @click="startFragebogen" block class="mt-1" variant="success">
                        Start
                    </b-button>
                    <b-button @click="$bvModal.hide('modal-start')" block class="mt-1">Abbrechen</b-button>
                </div>
            </b-modal>
        </div>

        <BottomBar/>
    </div>
</template>


<script>
    import Headbar from "@/components/Navigation/Headbar";
    import BottomBar from "@/components/Navigation/BottomBar";
    import {mapGetters} from "vuex";
    import store from "@/store";

    export default {
        components: {BottomBar, Headbar},
        computed: {
            ...mapGetters(["current", "frage", "loading", "fragen"]),
            isModalCorrect() {
                return (this.save.dateiname !== undefined && this.save.dateiname !== "")
            }
        },
        methods: {
            initiateFragebogen(data) {
                this.$bvModal.show('modal-start');
            },
            startFragebogen() {
                this.$bvModal.hide('modal-start');
                store.dispatch("setLoading", true);
                store.dispatch("getFragen", "test/testFragebogen.json");
                this.$router.push("/0");
            }
        },
        created() {
            store.dispatch("getFolderstructure", "test/testStructure.json");
        },
        data() {
            return {
                save: {}
            }
        }
    }
</script>


<style>
    #root {
        padding-top: 72px;
        padding-bottom: 70px;
    }
</style>


<style scoped>
    .slide-enter-active, .slide-leave-active {
        transition: all .5s;
    }

    .slide-enter, .slide-leave-to {
        transform: translateX(10px);
        opacity: 0;
    }


    #spinner {
        margin-top: 70%;
        margin-left: 45%;
    }
</style>