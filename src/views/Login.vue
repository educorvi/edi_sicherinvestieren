<template>
    <b-card>
        <div v-if="loggedIn">
            <h4>Bereits angemeldet</h4>
            <router-link :to="'/'">Zurück</router-link>
        </div>
        <b-form v-else>
            <h6>Bitte geben Sie Ihre Login-Daten ein:</h6>
            <b-input class="rounded-0" name="email" placeholder="E-Mail" type="text" v-model="user.email"></b-input>
            <b-input class="rounded-0" name="password" placeholder="Passwort" type="password"
                     v-model="user.pin"></b-input>
            <b-button :disabled="working" @click="login" class="float-right mt-2">Einloggen</b-button>
        </b-form>
    </b-card>

</template>

<script>
    import {mapGetters} from "vuex";
    import axios from "axios";

    export default {
        name: "Login",
        data() {
            return {
                working: false,
                user: {
                    email: "",
                    pin: ""
                }
            }
        },
        computed: {
            ...mapGetters(["loggedIn", "config"])

        },
        methods: {
            login() {
                this.working = true;
                const axiosOptions = {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    data: this.user,
                    url: this.config["loginURL"]
                };
                axios(axiosOptions).then(res => this.verarbeiteLogin(res));
            },
            verarbeiteLogin(res) {
                if (res.status < 300) {
                    //    save Token
                    this.$store.dispatch("setToken", res.data.keyword);
                    this.$router.replace("/")
                }
            }
        }
    }
</script>

<style scoped>

</style>