import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        packageVersion: process.env.PACKAGE_VERSION || '0',
        config: null,
        fragebogenData: {
            title: "",
            progress: 0,
            thema: ""
        },
        listen: [],
        userID: null,
        remoteCouch: null
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
                state.remoteCouch = 'http://admin:krks.d3print@astra2441.server4you.de:5984/listen_user_' + id;
            } else {
                state.remoteCouch = null;
            }

            state.userID = id;
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
        loggedIn: state => !!state.userID

    },
})
