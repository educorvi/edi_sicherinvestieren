<template>
    <b-form @submit="onSubmit" class="text-left">
        <b-form-group label="Anrede" label-for="anrede">
            <b-form-select id="anrede" :options="[{text: 'Bitte auswählen', value: null}, 'Herr', 'Frau', 'Divers', 'Firma']" v-model="form.anrede" required/>
        </b-form-group>
        <b-form-group label="Voller Name oder Firmenname" label-for="firmaOderName">
            <b-form-input id="firmaOderName" v-model="form.firmaOderName" type="text" required/>
        </b-form-group>
        <b-form-group label="Straße und Hausnummer" label-for="adresse">
            <b-form-input id="adresse" v-model="form.adresse" type="text" required/>
        </b-form-group>
        <b-form-group label="Postleitzahl" label-for="plz">
            <b-form-input id="plz" v-model="form.plz" type="number" required/>
        </b-form-group>
        <b-form-group label="Ort" label-for="ort">
            <b-form-input id="ort" v-model="form.ort" type="text" required/>
        </b-form-group>
        <b-form-group label="Land" label-for="land">
            <b-form-select id="land" :options="[
                {text: 'Österreich', value: 'Oesterreich'},
                'Belgien',
                'Bulgarien',
                {text: 'Weißrussland', value: 'Weissrussland'},
                'Schweiz',
                'Deutschland',
                {text: 'Dänemark', value: 'Daenemark'},
                'Estland',
                'Spanien',
                'Finnland',
                'Frankreich',
                'Griechenland',
                'Ungarn',
                'Irland',
                'Italien',
                'Luxemburg',
                'Lettland',
                'Malta',
                'Niederlande',
                'Norwegen',
                'Polen',
                'Portugal',
                {text: 'Rumänien', value: 'Rumaenien'},
                'Serbien',
                {text: 'Russische Förderation', value: 'Russische Foerderation'},
                'Schweden',
                'Slowenien',
                'Slowakei',
                'Türkei',
                'Ukraine',
                'Jugoslawien'
                ]" v-model="form.land" required/>
        </b-form-group>
        <b-form-group label="E-Mail" label-for="mail">
            <b-form-input id="mail" v-model="form.mail" type="email" required/>
        </b-form-group>
        <b-form-group :description="passwortLongEnough?null : 'Das Passwort muss mindestens 8 Zeichen lang sein'" label="Passwort" label-for="passwort">
            <b-form-input id="passwort" v-model="form.passwort" type="password" :state="passwortsMatch" required/>
            <b-form-invalid-feedback :state="passwortsMatch">Passwörter stimmen nicht überein</b-form-invalid-feedback>
<!--            <b-form-invalid-feedback :state="passwortLongEnough">Das Passwort ist zu kurz</b-form-invalid-feedback>-->
            <b-form-valid-feedback :state="passwortLongEnough">Das Passwort muss mindestens 8 Zeichen lang sein</b-form-valid-feedback>
        </b-form-group>
        <b-form-group label="Passwort wiederholen" label-for="passwortWDH">
            <b-form-input id="passwortWDH" v-model="form.passwortWDH" type="password" :state="passwortsMatch" required/>
        </b-form-group>
        <b-form-group label="Datenschutzerklärung" label-for="datenschutz">
            <b-form-invalid-feedback :state="form.datenschutz">Bitte akzeptieren Sie die Datenschutzerklärung</b-form-invalid-feedback>
            <b-form-checkbox id="datenschutz" v-model="form.datenschutz">
                <p>Ich bin einverstanden, dass meine Daten gespeichert und zum Zwecke der Abwicklung meiner Bestellungen an den vertraglichen Versanddienstleister der BG ETEM weitergeleitet werden. Die <a href="https://www.bgetem.de/die-bgetem/datenschutz">Datenschutzerklärung der BG ETEM</a> habe ich gelesen.</p>
            </b-form-checkbox>
        </b-form-group>

        <b-button type="submit" variant="primary" class="float-right">Registrieren</b-button>
    </b-form>
</template>

<script>
    //@group Helper
    //@vuese
    //Formular zum Registrieren

    import {mapGetters} from "vuex"
    export default {
        name: "Registrieren",
        data() {
            return {
                form: {
                    anrede: null,
                    firmaOderName: "",
                    adresse: "",
                    plz: "",
                    ort: "",
                    land: "Deutschland",
                    mail: "",
                    passwort: "",
                    passwortWDH: "",
                    datenschutz: false
                }
            }
        },
        methods: {
            //Registrieren
            onSubmit(evt) {
                evt.preventDefault();
                if (this.form.passwort.length  >= 8 && (this.form.passwort === this.form.passwortWDH) && this.form.datenschutz) {
                    this.http.post(this.config["register"], this.form).then(res => {
                        if (res.status === 200 || res.status === 201) {
                            this.$root.$bvToast.toast("Registrierung erfolgreich abgeschlossen. Bitte aktivieren Sie das Konto mithilfe des an Ihre E-Mail zugesendeten Aktivierungslinks", {
                                title: "Registierung erfolgreich",
                                variant: "success",
                                autoHideDelay: 10000
                            });
                            this.$router.push("/login");
                        } else {
                            this.$bvToast.toast("Etwas ist schief gegangen", {
                                title: "Registrierung fehlgeschlagen",
                                variant: "danger",
                                autoHideDelay: 5000
                            })
                        }
                    }).catch(()=> {
                        this.$bvToast.toast("Etwas ist schief gegangen", {
                            title: "Registrierung fehlgeschlagen",
                            variant: "danger",
                            autoHideDelay: 5000
                        })
                    });
                }
            }
        },
        computed: {
            //check if passwords match
            passwortsMatch() {
                return this.form.passwortWDH.length > 0 ? (this.form.passwort === this.form.passwortWDH) : null;
            },
            passwortLongEnough() {
                return this.form.passwort.length > 0 ? this.form.passwort.length >= 8 : null;
            },
            ...mapGetters(["config"])
        },
    }
</script>

<style scoped>

</style>
