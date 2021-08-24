<template>
  <div>
    <b-form @submit="submit">
      <b-form-invalid-feedback :state="valid"><h5>Falscher Benutzername/Passwort</h5></b-form-invalid-feedback>
      <b-form-input
          :required="true"
          :state="valid"
          class="mb-2"
          id="user"
          placeholder="Benutzername"
          type="text"
          v-model="username"
      ></b-form-input>
      <b-form-input
          :required="true"
          :state="valid"
          class="mb-2"
          id="password"
          placeholder="Passwort"
          type="password"
          v-model="password"
      ></b-form-input>
      <b-button-group class="float-lg-right">
        <b-button :disabled="!isEnabled('register')" @click="$router.push('/register')">
          {{
            !isEnabled('register') ? 'Eine Registrierung ist momentan leider nicht möglich' : 'Registrierung'
          }}
        </b-button>
        <b-button type="submit" variant="primary">Anmelden</b-button>
      </b-button-group>
    </b-form>
  </div>
</template>

<script>
//@group Views
//@vuese
//LoginView
import {sync} from "@/js/localDatabase";
import {mapGetters} from "vuex"
import {isEnabled, loginNavCredentials, reportError} from "@/js/globalMethods";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      valid: null
    }
  },
  computed: {
    ...mapGetters(["config"])
  },
  created() {
    loginNavCredentials().then(res => {
      this.valid = res;
      if (res) {
        this.$router.push("/");
      }
    }).catch(console.error);
  },
  methods: {
    isEnabled,
    //Login
    submit(evt) {
      evt.preventDefault();
      this.http.post(this.config["login"], {
        username: this.username,
        password: this.password
      }).then(res => {
        //Wenn erfolgreich, setzen des Tokens, sonst Feedback
        if (res.data.token) {
          this.$store.commit("setUserID", res.data.token);
          this.$ls.set('userID', res.data.token);
          sync()

          try {
            // eslint-disable-next-line no-undef
            if (navigator.credentials && PasswordCredential && !this.config.disabledFeatures.includes('credentialsAPI')) {
              // eslint-disable-next-line no-undef
              const credential = new PasswordCredential({
                id: this.username,
                name: this.username,
                password: this.password
              })

              navigator.credentials.store(credential)
                  .then(() => console.log('Storing credential for ' + credential.id + ' (result cannot be checked by the website).'))
                  .catch((err) => console.log('Error storing credentials: ' + err));
            } else {
              console.log("Credentials API not supported")
            }
          } catch (e) {
            reportError(e)
          } finally {
            this.$router.replace("/")
          }
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
