<template>
    <div>

        <b-alert :show="!loggedIn" dismissible variant="warning">
            <h4 class="alert-heading">Sie sind nicht angemeldet!</h4>
            <p>
                Um alle Funktionen nutzen zu können, müssen Sie sich identifizieren
            </p>
            <router-link :to="'/login'">Hier anmelden</router-link>
        </b-alert>

        <Hinweis :id="0" @ok="$store.dispatch('setDismissed', {i: 0, b: true})" v-if="!hinweise[0].dismissed"/>
        <!--        Fragebogenauswahl-->
        <div v-else>
            <!--            Fragebogenliste-->
            <div :key="index" v-for="(folder, index) in folderstructure">

                <!--                Unterordner-->
                <b-card class="mb-2" no-body v-if="folder['@type']!=='Fragebogen'">
                    <b-button v-b-toggle="'folder_'+index">{{folder.title}}</b-button>
                    <b-collapse :id="'folder_'+index" role="tabpanel">
                        <b-card :key="cIndex"
                                @click="$emit('childPressed', {folder: folder, child: child, cIndex: cIndex, index: index})"
                                v-for="(child, cIndex) in folder.items">
                            {{child.title}}
                        </b-card>
                    </b-collapse>
                </b-card>

                <!--                Einträge, die kein Ordner sind, aber im root angezeigt werden-->
                <b-card @click="$emit('childPressed', {folder: null, child: folder, index: index})" class="mb-2" no-body
                        v-else>
                    <b-button>{{folder.title}}</b-button>
                </b-card>
            </div>
        </div>
    </div>


</template>

<script>
    import {mapGetters} from 'vuex';

    const Hinweis = () => import("../components/Hinweis.vue");
    export default {
        name: 'home',
        components: {
            Hinweis
        },
        computed: {
            ...mapGetters(["hinweise", "folderstructure", "loggedIn"])
        },
    }
</script>
<style scoped>
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>