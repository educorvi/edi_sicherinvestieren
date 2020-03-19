<template>
    <b-form @submit="onSubmit" class="text-left">
<!--        <b-form-group label="Thema" label-for="adresse">-->
<!--            <b-form-select id="adresse" v-model="form.adresse" required-->
<!--                           :options="[-->
<!--                               {text: 'Bitte auswählen', value: null},-->
<!--                               {text: 'Mitgliedschaft/Beitrag', value: 'ba.koeln@bgetem.de'},-->
<!--                               {text: 'Unfall/Berufskrankheit', value: 'reha@bgetem.de'},-->
<!--                               {text: 'Seminare/Weiterbildung', value: }-->
<!--                           ]"/>-->
<!--        </b-form-group>-->
        <b-form-group label="Anrede *" label-for="anrede">
            <b-form-select id="anrede" :options="[{text: 'Bitte auswählen', value: null}, 'Herr', 'Frau', 'Divers']" v-model="form.anrede" required/>
        </b-form-group>
        <b-form-group label="Vorname *" label-for="vorname">
            <b-form-input id="vorname" v-model="form.vorname" type="text" required/>
        </b-form-group>
        <b-form-group label="Nachname *" label-for="nachname">
            <b-form-input id="nachname" v-model="form.nachname" type="text" required/>
        </b-form-group>
        <b-form-group label="Firma" label-for="firma">
            <b-form-input id="firma" v-model="form.firma" type="text"/>
        </b-form-group>
        <b-form-group label="Mitgliedsnummer" label-for="mitgliedsnr">
            <b-form-input id="mitgliedsnr" v-model="form.mitgliedsnr" type="text"/>
        </b-form-group>
        <b-form-group label="Aktenzeichen" label-for="aktenzeichen">
            <b-form-input id="aktenzeichen" v-model="form.aktenzeichen" type="text"/>
        </b-form-group>
        <b-form-group label="Adresse">
            <b-form-input class="rounded-0 !rounded-top" name="Straße und Hausnummer" placeholder="Straße und Hausnummer" v-model="form.adresse"/>
            <b-row>
                <b-col cols="4" style="padding-right: 0"><b-form-input v-model="form.plz" class="rounded-0" name="Postleitzahl" placeholder="Postleitzahl" type="number"></b-form-input></b-col>
                <b-col cols="8" style="padding-left: 0"><b-form-input v-model="form.ort" class="rounded-0" name="Ort" placeholder="Ort"></b-form-input></b-col>
            </b-row>
        </b-form-group>
        <b-form-group label="E-Mail *" label-for="email">
            <b-form-input id="email" v-model="form.email" type="email" required/>
        </b-form-group>
        <b-form-group label="Telefon" label-for="telefon">
            <b-form-input id="telefon" v-model="form.telefon" type="number"/>
        </b-form-group>
        <b-form-group label="Betreff" label-for="betreff">
            <b-form-input id="betreff" v-model="form.betreff" type="text"/>
        </b-form-group>
        <b-form-group label="Ihre Nachricht *" label-for="nachricht">
            <b-form-textarea id="nachricht" v-model="form.nachricht" required style="min-height: 150px"/>
        </b-form-group>
        <b-form-group label="Datenschutzerklärung *" label-for="datenschutz">
            <b-form-invalid-feedback :state="form.datenschutz">Bitte akzeptieren Sie die Datenschutzerklärung</b-form-invalid-feedback>
            <b-form-checkbox id="datenschutz" v-model="form.datenschutz">
                <p>Ich bin einverstanden, dass meine Daten gespeichert und zum Zwecke der Abwicklung meiner Bestellungen an den vertraglichen Versanddienstleister der BG ETEM weitergeleitet werden. Die <a href="https://www.bgetem.de/die-bgetem/datenschutz">Datenschutzerklärung der BG ETEM</a> habe ich gelesen.</p>
            </b-form-checkbox>
        </b-form-group>
        <b-button type="submit" variant="primary" class="float-right">Absenden</b-button>
    </b-form>
</template>

<script>
    //@group Views
    //@vuese
    //View für ein Kontaktformular
    export default {
        name: "Kontakt",
        methods: {

            //Absenden des Kontaktformulars
            onSubmit(evt) {
                evt.preventDefault()
            //    @TODO gimme contact
                console.log("Nach Hause telefonieren")
            }
        },
        data() {
            return {
                //Daten des Kontaktformulars
                form: {
                    //@TODO Ist das die richtige EMail?
                    zielmail: 'medien@bgetem.de',
                    anrede: null,
                    vorname: "",
                    nachname: "",
                    firma: "",
                    mitgliedsnr: "",
                    aktenzeichen: "",
                    adresse: "",
                    plz: "",
                    ort: "",
                    email: "",
                    telefon: "",
                    betreff: "",
                    nachricht: "",
                    datenschutz: false
                }
            }
        },
    }
</script>

<style scoped>

</style>
