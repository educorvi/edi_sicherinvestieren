/* eslint-disable no-unused-vars */
import PouchDB from "pouchdb";
import store from "../store/index";
import {mapGetters} from "vuex";

const db = new PouchDB('sicherInvestListen');
const remoteCouch = store.state.remoteCouch;

db.changes({
    since: 'now',
    live: true
}).on('change', getAllListen);

function sync() {
    // syncDom.setAttribute('data-sync-state', 'syncing');
    const opts = {live: true};
    db.replicate.to(remoteCouch, opts, syncError);
    db.replicate.from(remoteCouch, opts, syncError);
}

if (remoteCouch) {
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
    return db.allDocs({include_docs: true, descending: true}, (err, doc) => store.commit("setListen", doc.rows));
}

export function putListe(liste) {
    const listen = store.state.listen;


    let rev = null;
    let index = null;
    for (let i = 0; i < listen.length; i++) {
        if (listen[i].doc.name === liste.name) {
            rev = listen[i].doc._rev;
            index = i;
        }

    }


    const put = {
        ...liste,
        _rev: rev,
        user: store.state.userID
    };

    db.put(put, function callback(err, result) {
        if (err) {
            console.error(err);
        }
    });
}

export function deleteListe(item) {
    return db.remove(item)
}

// eslint-disable-next-line no-unused-vars
export function getListen(fertig) {
    return store.state.listen.filter(list => fertig === list.doc.fertig);
}
