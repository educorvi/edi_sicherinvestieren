import config from "@/config.json";
import {sync} from "@/js/localDatabase";
import axios from "axios";
import vuex from "../store"
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
                            console.log(res)
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
