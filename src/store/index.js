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
        }
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
        }
    },
    actions: {},
    modules: {},
    getters: {
        appVersion: (state) => {
            return state.packageVersion
        },
        config: state => state.config,
        fragebogenData: state => state.fragebogenData

    },
})
