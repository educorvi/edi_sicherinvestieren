import Vue from 'vue';
import Vuex from 'vuex';
import router from "@/router";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        //Werte werden durch Inhalt von config.json überschrieben
        config: {},

        auth: {
            token: null
        },

        current: {
            loading: true,
            loadingFrage: true
        },
        folderstructure: {},
        //  "/" ersetzt durch "§"
        fragebogenID: "",
        fragen: [],
        frage: {
            title: ""
        },
        isFrage: false,
        hinweise: [
            {
                okText: "weiter",
                dismissed: false,
                text: "<p>Sie planen die Investition in eine neue Maschine oder Anlage? Neben vielen anderen Aspekten , spielen dabei auch die Sicherheit und die Gesundheit ihrer beschäftigten eine wichtige Rolle. Die BG ETEM unterstützt sie mit dieser App bei der Auswahl sichere Maschinen. Das hilft ihnen auch, teure Nachrüstungen zu vermeiden. Bitte beachten Sie, dass diese Anwendung eine vollständige Bewertung der konkreten Gefährdung der Maschine am vorgesehenen Einsatzort nicht ersetzen kann.<p>"
            }
        ],

        save: {
            notizen: [],
            selected: [],
            file: {}
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
            state.folderstructure = r;
            state.current.loading = false;
        },
        addSubitems(state, data) {
            Vue.set(state.folderstructure[data.i], "items", data["items"]);
        },
        getFragen(state, f) {
            let array = f.data.items;
            for (let i = 0; i < array.length; i++) {
                if (array[i]["@type"] !== "Frage") {
                    array.splice(i, 1);
                }
            }
            state.fragen = array;
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
            router.push("/" + state.fragebogenID + "/" + p.i);
            state.current.loading = false;
        },
        getFrage(state, f) {
            state.frage = f;
            state.current.loadingFrage = false;
        },
        addZuletztBesucht(state, i) {
            state.zuletztBesucht.push(i);
        },
        removeLetztesBesucht(state) {
            state.zuletztBesucht.pop();
        },
        setHistory(state, history) {
            state.zuletztBesucht = history;
        },
        setNotizen(state, not) {
            state.save.notizen = not;
        },
        setDismissed(state, p) {
            state.hinweise[p.i].dismissed = p.b;
        },
        setLoading(state, b) {
            state.current.loading = b;
        },
        setLoadingFrage(state, b) {
            state.current.loadingFrage = b;
        },
        addListenItem(state, l) {
            if (parseFloat(l["fortschritt"]) === 100) {
                state.listen.fertig.push(l);
            } else {
                state.listen.angefangen.push(l);
            }
        },
        setListen(state, l) {
            state.listen = l;
        },
        getConfig(state, c) {
            state.config = c;
        },
        setFragebogenID(state, url) {
            state.fragebogenID = url.replace(/\//g, "§");
        },
        setToken(state, token) {
            state.auth.token = token;
        },
        setSavefile(state, save) {
            state.save.file = save;
        },
        addSelected(state, details) {
            state.save.selected[details.i] = details.antwort;
        },
        setSelected(state, s) {
            state.save.selected = s;
        }
    },
    actions: {
        getFolderstructure(context) {
            axios.get(context.getters.config["rootURL"], {
                headers: {
                    Accept: "application/json"
                }
            }).then(r => context.dispatch("getSubstructure", r.data.items));
        },
        getSubstructure(context, items) {
            context.commit("getFolderstructure", items);
            for (let i = 0; i < items.length; i++) {
                if (items[i]["@type"] === "Folder") {
                    axios.get(items[i]["@id"], {
                        headers: {
                            Accept: "application/json"
                        }
                    }).then(r => context.commit("addSubitems", {i: i, items: r.data.items}));
                }
            }
        },
        getFragen(context, url) {
            context.commit("setFragebogenID", url);
            axios.get(url, {
                headers: {
                    Accept: "application/json"
                }
            }).then(r => context.commit("getFragen", r));
        },
        getFragenAndStart(context, pay) {
            context.commit("setFragebogenID", pay.url);
            axios.get(pay.url, {
                headers: {
                    Accept: "application/json"
                }
            }).then(r => context.commit("getFragenAndStart", {res: r, i: pay.i}));
        },
        getFrage(context, i) {
            context.dispatch("setLoadingFrage", true);
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
        setHistory(context, history) {
            context.commit("setHistory", history)
        },
        setNotizen(context, obj) {
            context.commit("setNotizen", obj)
        },
        setDismissed(context, p) {
            context.commit("setDismissed", p)
        },
        setLoading(context, b) {
            context.commit("setLoading", b);
        },
        setLoadingFrage(context, b) {
            context.commit("setLoadingFrage", b);
        },
        getListen(context) {
            context.commit("setListen", {angefangen: [], fertig: []});
            axios.get(context.getters.config["dataURL"] + "/" + context.getters.token, {
                headers: {
                    Accept: "application/json"
                }
            }).then(r => {
                console.log(r.data.items);
                for (const item of r.data.items) {
                    axios.get(item["@id"], {
                        headers: {
                            Accept: "application/json"
                        }
                    }).then(res => context.commit("addListenItem", res.data));
                }
            });
        },
        getConfig(context) {
            axios.get("config.json", {
                headers: {
                    Accept: "application/json"
                }
            }).then(r => context.dispatch("start", {config: r.data}));
        },

        start(context, p) {
            context.commit("getConfig", p.config);
            context.dispatch("getFolderstructure");
            context.dispatch("getListen");
        },
        sendAntwort(context, p) {
            //lokales
            context.commit("addSelected", {i: p.i, antwort: p.antwort});


            //server
            const data = {
                optionen: {},
                notiz: "",
                id: p.id,
                fortschritt: p.progress,
                fragebogen: context.getters.fragebogenID,
                keyword: context.getters.token,
                maschine: context.getters.savefile
            };
            const options = context.getters.frage.optionen;
            for (const option of options) {
                data.optionen[option.antwort] = false;
            }
            data.optionen[p.antwort] = true;
            data.notiz = context.getters.notizen[p.i];
            const axiosOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                data: data,
                url: context.getters.config["dataSendURL"]
                // url: "https://postman-echo.com/post"
            };
            axios(axiosOptions).then(res => console.log(res));
            // axios.post("https://ptsv2.com/t/neferin/post", JSON.stringify(data)).then(r => console.log(r.status));
        },
        setToken(context, t) {
            context.commit("setToken", t);
            Vue.ls.set("token", t);
        },
        setSavefile(context, file) {
            context.commit("setSavefile", file);
        },
        setFragebogenID(context, id) {
            context.commit("setFragebogenID", id)
        }
    },
    getters: {
        placeholders: state => state.placeholders,
        current:
            state => state.current,
        hinweise:
            state => state.hinweise,
        folderstructure:
            state => state.folderstructure,
        frage:
            state => state.frage,
        fragen:
            state => state.fragen,
        loading:
            state => state.current.loading,
        loadingFrage:
            state => state.current.loadingFrage,
        isFrage:
            state => state.isFrage,
        zuletztBesucht:
            state => state.zuletztBesucht,
        letztes:
            state => state.zuletztBesucht[state.zuletztBesucht.length - 1],
        notizen:
            state => state.save.notizen,
        listen:
            state => state.listen,
        config:
            state => state.config,
        fragebogenID:
            state => state.fragebogenID.replace(/§/g, "/"),
        fragebogenIDraw:
            state => state.fragebogenID,
        token:
            state => state.auth.token,
        loggedIn:
            state => state.auth.token !== null && state.auth.token !== undefined,
        savefile:
            state => state.save.file,
        selected:
            state => state.save.selected
    }
})
