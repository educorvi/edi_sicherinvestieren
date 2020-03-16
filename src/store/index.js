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
        userID: "julian2812",
        remoteCouch: 'http://admin:krks.d3print@astra2441.server4you.de:5984/listen'
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
        userID: state => state.userID

    },
})
