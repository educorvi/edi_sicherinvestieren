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


    //Sprungziel bestimmen
    let aktion = null;

    for (let i = 0; i < Object.keys(antworten).length; i++) {
        if (Object.entries(antworten)[i][1] === true) {
            const key = Object.keys(antworten)[i];
            console.log(key);
            const optionen = vorletzte["optionen"];
            for (const option of optionen) {
                if (option.antwort === key) {
                    aktion = option["aktion"];
                }
            }
            console.log(aktion)
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


export {load}