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
        <b-form-group label="Passwort" label-for="passwort">
            <b-form-input id="passwort" v-model="form.passwort" type="password" :state="passwortState" required/>
            <b-form-invalid-feedback :state="passwortState">Passwörter stimmen nicht überein</b-form-invalid-feedback>
        </b-form-group>
        <b-form-group label="Passwort wiederholen" label-for="passwortWDH">
            <b-form-input id="passwortWDH" v-model="form.passwortWDH" type="password" :state="passwortState" required/>
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
                if (this.form.passwort.length + this.form.passwortWDH.length > 0 && (this.form.passwort === this.form.passwortWDH) && this.form.datenschutz) {
                    //@TODO Register
                    console.log("register")
                }
            }
        },
        computed: {
            //check if passwords match
            passwortState() {
                return this.form.passwort.length + this.form.passwortWDH.length > 0 ? (this.form.passwort === this.form.passwortWDH) : null;
            }
        },
    }
</script>

<style scoped>

</style>
