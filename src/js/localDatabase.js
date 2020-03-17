/* eslint-disable no-unused-vars */
import PouchDB from "pouchdb";
import pdfind from "pouchdb-find"
PouchDB.plugin(pdfind);
import store from "../store/index";

const db = new PouchDB('sicherInvestListen');
let config = {
    remoteCouch: store.state.remoteCouch,
    loggedIn: store.getters.loggedIn
}

db.createIndex({
    index: {
        fields: ['user']
    }
}).catch(err => console.error(err));

db.changes({
    since: 'now',
    live: true
}).on('change', getAllListen);

export function sync() {
    log()
    config = {
        remoteCouch: store.state.remoteCouch,
        loggedIn: store.getters.loggedIn
    }
    const opts = {live: true};
    db.replicate.to(config.remoteCouch, opts, syncError);
    db.replicate.from(config.remoteCouch, opts, syncError);
}

if (config.remoteCouch&&config.loggedIn) {
    sync()
}

function syncError(err) {
    console.error("Fehler");
    console.error(err)
}

const retObject = {
    getAllListen,
    getListen,
    putListe,
    deleteListe
}

export default retObject;

export function getAllListen() {
    return db.find({
        selector: {user: {$ne: ""}}
    }).then(res => store.commit("setListen", res.docs));
}

export function putListe(liste) {
    const listen = store.state.listen;


    let rev = null;
    let index = 0;
    for (let i = 0; i < listen.length; i++) {
        if (listen[i].name === liste.name) {
            rev = listen[i]._rev;
            index = i;
        }

    }


    const put = {
        user: store.state.userID || "local",
        ...liste,
        _rev: rev,
    };


    db.put(put, function callback(err, result) {
        if (err) {
            console.error(err);
        } else {
            store.state.listen[index]._rev = result.rev;
        }
    });
}

export function deleteListe(item) {
    return db.remove(item)
}

// eslint-disable-next-line no-unused-vars
export function getListen(fertig) {
    return store.state.listen.filter(list => fertig === list.fertig);
}

function log() {
    setTimeout(console.log.bind(console, "%cSyncing to Server Database%c", "background: #32bd04;color:#FFF;padding-left:5px;padding-right:5px;border-radius: 5px;line-height: 26px;", ""));
}
