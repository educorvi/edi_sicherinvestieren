import Vue from 'vue'
import Vuex from 'vuex'
import hinweise from "../js/hinweise";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        /** Version der App */
        packageVersion: process.env.PACKAGE_VERSION || '0.0.0',

        /** Globale Config */
        config: null,

        /** Aktueller Fragebogen (Schnittstelle) */
        fragebogenData: {
            title: "",
            progress: 0,
            thema: ""
        },

        /** Alle Listen, fertig und in Bearbeitung */
        listen: [],

        /** ID bzw. Token des Users */
        userID: null,

        /** Adresse zur remote CouchDB */
        remoteCouch: null,

        /** Hinweise */
        hinweise,

        /** Fragebögen */
        frageboegen: null,

        /** Titel, Beschreibung und Hinweis */
        appInfo: null,

        reload: null
    },
    mutations: {
        setConfig(state, config) {
            state.config = config;
        },
        resetFragebogenData(state) {
            state.fragebogenData = {
                title: "",
                progress: 0,
                thema: ""
            }
        },
        /**
         * Overwrites the data with given data
         * @param state
         * @param p {{title?: String, progress?:Number, thema?:String}} given data
         */
        setFragebogenData(state, p) {
            state.fragebogenData = {
                ...state.fragebogenData,
                ...p
            };
        },
        setListen(state, listen) {
            state.listen = listen;
        },
        setUserID(state, id) {
            if (id) {
                state.remoteCouch = `https://${id}:${id}@${state.config.database}/listen_user_` + id;
            } else {
                state.remoteCouch = null;
            }

            state.userID = id;
        },
        setFrageboegen(state, f) {
            state.frageboegen = f;
        },
        setReloadFunction(state, f) {
            state.reload = f;
        },
        setAppInfo(state, a) {
            state.appInfo = a;
            Vue.set(state.hinweise, "appInfo", {
                sichtbar: true,
                ...a
            });
        }
    },
    actions: {},
    modules: {},
    getters: {
        appVersion: (state) => {
            return state.packageVersion
        },
        config: state => state.config,
        fragebogenData: state => state.fragebogenData,
        listen: state => state.listen,
        userID: state => state.userID,
        loggedIn: state => !!state.userID,
        hinweise: state => state.hinweise,
        frageboegen: state => state.frageboegen,
        frageboegenFlattend: state => {
            function getChildren(items) {
                let res = [];
                for (const item of items) {
                    if (item["@type"] === "Folder") {
                        res = res.concat(getChildren(item.items));
                    } else {
                        res.push(item);
                    }
                }
                return res;
            }
            if(!state.frageboegen) return null;
            return getChildren(state.frageboegen)
        },
        reload: state => state.reload,
        appInfo: state => state.appInfo
    },
})
