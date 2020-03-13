import Dexie from "dexie";

const db = new Dexie('listen');
db.version(3).stores({
    listen: 'name, maschinentyp, hersteller, baujahr, fertig'
})

const retObject = {
    getAllListen,
    getListen,
    putListe,
    deleteListe
}

export default retObject;

export function getAllListen() {
    return db.listen.toArray();
}

export function putListe(liste) {
    db.listen.put(liste);
}

export function deleteListe(name) {
    return db.listen.where("name").equals(name).delete();
}

// eslint-disable-next-line no-unused-vars
export async function getListen(fertig) {
    const IntFertig = fertig ? 1 : 0;
    return db.listen.where('fertig').equals(IntFertig).toArray();
}
