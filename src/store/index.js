import Vue from 'vue'
import Vuex from 'vuex'
import hinweise from "../js/hinweise";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        //Version der App
        packageVersion: process.env.PACKAGE_VERSION || '0.0.0',
        //Globale Config
        config: null,
        //Aktueller Fragebogen (Schnittstelle)
        fragebogenData: {
            title: "",
            progress: 0,
            thema: ""
        },
        //Alle Listen, fertig und bearbeitet
        listen: [],
        //ID/Token des Users
        userID: null,
        //Adresse zur remote CouchDB
        remoteCouch: null,
        //hinweise
        hinweise,
    //    Fragebögen
        frageboegen: null,
    //    Die zu ladende Liste
        load: null
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
                state.remoteCouch = `https://${id}:${id}@couch.jp-studios.de/listen_user_` + id;
            } else {
                state.remoteCouch = null;
            }

            state.userID = id;
        },
        setFrageboegen(state, f) {
            state.frageboegen = f;
        },
        setLoad(state, l) {
            state.load = l;
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
        load: state => state.load
    },
})
