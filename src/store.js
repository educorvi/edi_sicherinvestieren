import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import router from "@/router";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        config: {},
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
        zuletztBesucht: [],
        listen: {
            fertig: [],
            angefangen: []
        },

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
        getFragenAndStart(state, p) {
            let array = p.res.data.items;
            for (let i = 0; i < array.length; i++) {
                if (array[i]["@type"] !== "Frage") {
                    array.splice(i, 1);
                }
            }
            state.fragen = array;
            this.dispatch("getFrage", p.i);
            router.push("/0/" + p.i);
            state.current.loading = false;
        },
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
        },
        getListen(state, l) {
            for (let i = 0; i < l.length; i++) {
                if (l[i].fertig) {
                    state.listen.fertig.push(l[i]);
                } else {
                    state.listen.angefangen.push(l[i]);
                }

            }
        },
        getConfig(state, c) {
            state.config = c;
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
        getFragenAndStart(context, pay) {
            axios.get(pay.url, {
                headers: {
                    Accept: "application/json"
                }
            }).then(r => context.commit("getFragenAndStart", {res: r, i: pay.i}));
        },
        getFrage(context, i) {
            axios.get(context.getters.fragen[i]["@id"],
                {headers: {Accept: "application/json"}}
            ).then(res => context.commit("getFrage", res.data));
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
        },
        getListen(context, url) {
            axios.get(url, {
                headers: {
                    Accept: "application/json"
                }
            }).then(r => context.commit("getListen", r.data));
        },
        getConfig(context,) {
            axios.get("config.json", {
                headers: {
                    Accept: "application/json"
                }
            }).then(r => context.commit("getConfig", r.data));
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
        notizen: state => state.save.notizen,
        listen: state => state.listen,
        config: state => state.config
    }
})
