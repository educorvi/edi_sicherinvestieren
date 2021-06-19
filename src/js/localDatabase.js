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
        fields: ['name']
    }
}).catch(err => console.error(err));

db.changes({
    since: 'now',
    live: true
}).on('change', getAllListen);

export function sync() {
    config = {
        remoteCouch: store.state.remoteCouch,
        loggedIn: store.getters.loggedIn
    }
    const opts = {live: true, retry: true};
    db.replicate.to(config.remoteCouch, opts, syncErrorTo);
    db.replicate.from(config.remoteCouch, opts, syncErrorFrom);
    log("Syncing Database", "#32bd04")

}

if (config.remoteCouch && config.loggedIn) {
    sync()
}


function syncErrorTo(err) {
    log("Failed to sync to Database", "#ff0000")
}

function syncErrorFrom(err) {
    log("Failed to sync from Database", "#ff0000")
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
        selector: {name: {$ne: ""}}
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

export function deleteAllListen() {
    db.bulkDocs(store.state.listen.map(obj => ({...obj, _deleted: true})))
}

// eslint-disable-next-line no-unused-vars
export function getListen(fertig) {
    return store.state.listen.filter(list => fertig === list.fertig);
}

export function getListe(name) {
    return store.state.listen.filter(list => name === list.name);
}

function log(text, bg) {
    setTimeout(console.log.bind(console, `%c${text}`, `background: ${bg};color:#FFF;padding-left:5px;padding-right:5px;border-radius: 5px;line-height: 26px;`));
}
