import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        placeholders: {},
        current: {
            loading: false
        },
        folderstructure: {},
        fragen: [],
        frage: {
            title: ""
        },
        isFrage: false,
        hinweise: [
            {
                okText: "weiter",
                dismissed: true,
                text: "<p>Sie planen die Investition in eine neue Maschine oder Anlage? Neben vielen anderen Aspekten , spielen dabei auch die Sicherheit und die Gesundheit ihrer beschäftigten eine wichtige Rolle. Die BG ETEM unterstützt sie mit dieser App bei der Auswahl sichere Maschinen Punkt das hilft ihnen auch, teure Nachrüstungen zu vermeiden. Bitte beachten Sie Komma dass diese Anwendung eine vollständige Bewertung der konkreten Gefährdung der Maschine am vorgesehenen Einsatzort nicht ersetzen kann.\n" +
                    "Wählen sie aus, welchen Maschinen Typ sie bewerten möchten.<p>"
            }
        ],

        save: {
            notizen: []
        },
        zuletztBesucht: []

    },
    mutations: {
        changeTitle(state, s) {
            state.current.title = s;
        },
        getFolderstructure(state, r) {
            state.folderstructure = r.data;
        },
        getFragen(state, f) {
            let array = f.data.items;
            for (let i = 0; i < array.length; i++) {
                if (array[i]["@type"] !== "Frage") {
                    array.splice(i, 1);
                }
            }
            state.fragen = array;
            state.current.loading = false;
        },
        // getFrage(state, f) {
        //     if (Object.keys(f).length === 2) {
        //         const item = f.res.data;
        //         if (item["@type"] === "Frage") {
        //             for (let i = 0; i < f.fragen.length; i++) {
        //                 if (item["@id"] === f.fragen[i]["@id"]) {
        //                     state.current.aktuellerIndex = i;
        //                     break;
        //                 }
        //             }
        //             state.isFrage = true;
        //         }
        //         state.frage = item;
        //     } else {
        //         state.frage = f.data;
        //     }
        //
        // },
        getFrage(state, f) {
            state.frage = f;
        },
        addZuletztBesucht(state, i) {
            state.zuletztBesucht.push(i);
        },
        removeLetztesBesucht(state) {
            state.zuletztBesucht.pop();
        },
        setSave(state, obj) {
            state.save = obj;
        },
        setDismissed(state, p) {
            state.hinweise[p.i].dismissed = p.b;
        },
        setLoading(state, b) {
            state.current.loading = b;
        }
    },
    actions: {
        getFolderstructure(context, url) {
            axios.get(url, {
                headers: {
                    Accept: "application/json"
                }
            }).then(r => context.commit("getFolderstructure", r));
        },
        getFragen(context, url) {
            axios.get(url, {
                headers: {
                    Accept: "application/json"
                }
            }).then(r => context.commit("getFragen", r));
        },
        getFrage(context, i) {
            axios.get(context.getters.fragen[i]["@id"],
                {headers: {Accept: "application/json"}}
            ).then(res => context.commit("getFrage", res.data));
        },
        // getFrage(context, payload) {
        //     if (payload instanceof Object) {
        //         axios.get(payload.ziel, {
        //             headers: {
        //                 Accept: "application/json"
        //             }
        //         }).then(r => context.commit("getFrage", {
        //             res: r,
        //             fragen: payload.fragen
        //         })).catch(err => console.log(err));
        //     } else {
        //         axios.get(payload, {
        //             headers: {
        //                 Accept: "application/json"
        //             }
        //         }).then(r => context.commit("getFrage", r)).catch(err => console.log(err));
        //     }
        // },
        // //TODO
        // naechsteFrage(context, ziel) {
        //     context.commit("addZuletztBesucht", context.getters.aktuellerIndex);
        //     if (ziel === null) {
        //         context.commit("incrementIndex");
        //         this.dispatch("getFrage", context.getters.fragen[context.getters.aktuellerIndex]["@id"])
        //     } else {
        //         context.dispatch("getFrage", {ziel: ziel, fragen: context.getters.fragen});
        //     }
        // },
        letzteFrage(context) {
            context.commit("setAktuellerIndex", context.getters.zuletztBesucht[context.getters.zuletztBesucht.length - 2]);
            context.commit("removeLetztesBesucht");
            this.dispatch("getFrage", context.getters.fragen[context.getters.aktuellerIndex]["@id"])
        },
        addZuletztBesucht(context, i) {
            context.commit("addZuletztBesucht", i)
        },
        removeLetztesBesucht(context) {
            context.commit("removeLetztesBesucht");
        },
        setSave(context, obj) {
            context.commit("setSave", obj)
        },
        setDismissed(context, p) {
            context.commit("setDismissed", p)
        },
        setLoading(context, b) {
            context.commit("setLoading", b);
        }
    },
    getters: {
        placeholders: state => state.placeholders,
        current: state => state.current,
        hinweise: state => state.hinweise,
        folderstructure: state => state.folderstructure,
        frage: state => state.frage,
        fragen: state => state.fragen,
        loading: state => state.current.loading,
        isFrage: state => state.isFrage,
        zuletztBesucht: state => state.zuletztBesucht,
        notizen: state => state.save.notizen
    }
})
