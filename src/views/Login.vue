<template>
    <b-form @submit="submit">
        <b-form-invalid-feedback :state="valid"><h5>Falscher Benutzername/Passwort</h5></b-form-invalid-feedback>
        <b-form-input
                class="mb-2"
                v-model="username"
                id="user"
                placeholder="Benutzername"
                :required="true"
                type="text"
                :state="valid"
        ></b-form-input>
        <b-form-input
                class="mb-2"
                v-model="password"
                placeholder="Passwort"
                type="password"
                id="password"
                :required="true"
                :state="valid"
        ></b-form-input>
        <b-button type="submit" variant="primary">Anmelden</b-button>
    </b-form>
</template>

<script>
    import {sync} from "../js/localDatabase";

    export default {
        name: "Login",
        data() {
            return {
                username: "",
                password: "",
                valid: null
            }
        },
        methods: {
            submit(evt) {
                evt.preventDefault();
                this.http.post("https://new-etem-praev.bg-kooperation.de/anwendungen/sicher-investieren/medialogin", {
                    username: this.username,
                    password: this.password
                }).then(res => {
                    if (res.data.token) {
                        this.$store.commit("setUserID", res.data.token);
                        this.$ls.set('userID', res.data.token);
                        sync()
                        this.$router.replace("/")
                    } else {
                        this.valid = false;
                    }
                })
            }
        },
    }
</script>

<style scoped>

</style>
