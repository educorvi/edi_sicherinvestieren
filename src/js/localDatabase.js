/* eslint-disable no-unused-vars */
import PouchDB from "pouchdb";
import store from "../store/index"

const db = new PouchDB('sicherInvestListen');
const remoteCouch = false;

db.changes({
    since: 'now',
    live: true
}).on('change', getAllListen)

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
    db.put(liste, function callback(err, result) {
        if (err) {
            console.log(err);
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
