<template>
    <div>
        <Hinweis :id="0" @ok="$store.dispatch('setDismissed', {i: 0, b: true})" v-if="!hinweise[0].dismissed"/>
        <!--        Fragebogenauswahl-->
        <div v-else>
            <div :key="index" v-for="(folder, index) in folderstructure">
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
                <b-card @click="$emit('childPressed', {folder: null, child: folder, index: index})" no-body v-else>
                    <b-button>{{folder.title}}</b-button>
                </b-card>
            </div>
        </div>
    </div>


</template>

<script>
    import Hinweis from "@/components/Hinweis";
    import {mapGetters} from 'vuex';

    export default {
        name: 'home',
        components: {
            Hinweis
        },
        computed: {
            ...mapGetters(["hinweise", "folderstructure"])
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