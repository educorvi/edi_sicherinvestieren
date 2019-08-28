/* eslint-disable no-console */
import axios from "axios"
import store from "./store"
import router from "./router"

function load(url) {
    store.dispatch("setLoading", true);
    axios.get(url, {
        headers: {
            Accept: "application/json"
        }
    }).then(res => process(res))
}

async function process(res) {
    const data = res.data;


    //Fileinformation
    let save = {
        title: data["title"],
        maschnr: data["maschnr"],
        hersteller: data["hersteller"]
    };
    store.dispatch("setSavefile", save);


    //Fragen
    store.dispatch("setFragebogenID", data["fragebogen"]);
    const res2 = await axios.get(data["fragebogen"], {
        headers: {
            Accept: "application/json"
        }
    });
    const fragen = res2.data.items;

    //Notizen
    store.dispatch("setNotizen", []);
    let notizen = [];
    for (let i = 0; i < fragen.length; i++) {
        notizen[i] = data["notizen"][fragen[i]["@id"]];
    }
    store.dispatch("setNotizen", notizen);


    //Letzte Position
    const history = data["history"];
    let vorletzte = history[history.length - 1];
    const antworten = data["daten"][vorletzte];
    vorletzte = (await axios.get(vorletzte, {
        headers: {
            Accept: "application/json"
        }
    })).data;

    //Sync History
    const indexHistory = historyIdToIndex(fragen, history);
    store.dispatch("setHistory", indexHistory);

    for (const indexHistoryElement of indexHistory) {
        try {
            await router.push("/" + store.getters.fragebogenIDraw + "/" + indexHistoryElement);
        } catch (e) {
            console.log(e)
        }
    }
    console.log("History synced");

    //Sync selected
    const daten = data["daten"];
    console.log("Anzahl an Fragen: " + fragen.length);
    for (let i = 0; i < fragen.length; i++) {
        if (daten[fragen[i]["@id"]] !== null && daten[fragen[i]["@id"]] !== undefined) {
            const antworten = Object.entries(daten[fragen[i]["@id"]]);
            let antwort = undefined;
            for (let j = 0; j < antworten.length; j++) {
                if (antworten[j][1]) {
                    antwort = antworten[j][0];
                }

            }
            store.commit("addSelected", {i: i, antwort: antwort});
        }
    }
    console.log("Selected synced");


    //Sprungziel bestimmen
    let aktion = null;

    for (let i = 0; i < Object.keys(antworten).length; i++) {
        if (Object.entries(antworten)[i][1] === true) {
            const key = Object.keys(antworten)[i];
            const optionen = vorletzte["optionen"];
            for (const option of optionen) {
                if (option.antwort === key) {
                    aktion = option["aktion"];
                }
            }
        }
    }

    let indexFrage = 0;
    for (let i = 0; i < fragen.length; i++) {
        if (fragen[i]["@id"] === vorletzte["@id"]) {
            indexFrage = i;
        }
    }
    console.log(indexFrage);

    if (aktion === null) {
        if (parseInt(indexFrage) >= fragen.length - 1) {
            router.push("/abschluss")
        } else {
            router.push("/" + store.getters.fragebogenIDraw + "/" + (parseInt(indexFrage) + 1));
        }
    } else {
        let index = null;
        for (let i = 0; i < fragen.length; i++) {
            if (aktion === fragen[i]["@id"]) {
                index = i;
                break;
            }
        }
        if (index !== null) {
            router.push("/" + store.getters.fragebogenIDraw + "/" + index);
        } else {
            alert("Ungültige Referenz: " + aktion);
        }
    }


    store.dispatch("setLoading", false);
}

function historyIdToIndex(fragen, history) {
    let retHistory = [];
    for (const historyElement of history) {
        for (let i = 0; i < fragen.length; i++) {
            if (fragen[i]["@id"] === historyElement) {
                retHistory.push(i);
            }
        }
    }
    return retHistory;
}


export {load}