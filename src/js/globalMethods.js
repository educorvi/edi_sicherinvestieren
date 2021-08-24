import config from "@/config.json";
import {sync} from "@/js/localDatabase";
import axios from "axios";
import vuex from "../store"
import LZString from "@/libs/lz-string";
const store = vuex.state

/**
 * Checks if the feature with the given name is enabled
 * @param name the name of the feature
 * @returns {boolean}
 */
export function isEnabled(name) {
    return !config.disabledFeatures.includes(name)
}

/**
 * compress data and make it suitable to pass in an url
 * @param data {any} The data to be compressed
 * @return {string} Data as compressed string
 */
export function urlCompressData(data) {
    return encodeURIComponent(JSON.stringify(LZString.compress((JSON.stringify(data)))))
}

/**
 * Decompresses data compressed by method {@link urlCompressData}
 * @param string {string} Data as compressed string
 * @return {any}
 */
export function decompressData(string) {
    return JSON.parse(LZString.decompress(JSON.parse(string)))
}

/**
 * Tries to login the user with navigator credentials API
 * @param ls Local Storage
 * @return {Promise<Boolean>} whether logIn was successful or not
 */
export function loginNavCredentials(ls) {
    return new Promise((resolve, reject) => {
        try {
            // eslint-disable-next-line no-undef
            if (navigator.credentials && PasswordCredential && !store.loggedIn && isEnabled('credentialsAPI') && isEnabled('login')) {
                navigator.credentials.get({password: true}).then(cred => {
                    if (cred != null) {
                        axios.post(config["login"], {
                            username: cred.name,
                            password: cred.password
                        }).then(res => {
                            //Wenn erfolgreich, setzen des Tokens, sonst Feedback
                            if (res.data.token) {
                                vuex.commit("setUserID", res.data.token);
                                ls.set('userID', res.data.token);
                                sync()
                            }
                            resolve(!!res.data.token);
                        });
                    } else {
                        resolve(false);
                    }
                })
            }
        } catch (e){
            reject(e);
        }
    });
}

/**
 * Reports an error
 * @param err {Error}
 */
export function reportError(err) {
    console.error(err);
    axios.post("https://new-etem-praev.bg-kooperation.de/anwendungen/sicher-investieren/logger", {
        error: err.message,
        details: {
            name: err.name,
            message: err.message,
            stacktrace: err.stack
        }
    }).then(console.log).catch(console.error)
}
