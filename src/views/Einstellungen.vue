<template>
    <div>
        <div v-if="loggedIn">
            <b-row align-v="center" i>
                <b-col cols="4">
                    <b-button @click="logout">Verbindung aufheben</b-button>
                </b-col>
                <b-col cols="8">
                    <p class="text-muted m-0">Hierdurch wird die Verbindung bzw Synchronisierung mit der Cloud
                        aufgehoben, es
                        werden jedoch weder lokal, noch in der Cloud Daten gelöscht</p>
                </b-col>
            </b-row>
            <hr>
        </div>
        <b-row align-v="center">
            <b-col cols="4">
                <b-button variant="danger" @click="deleteData">Daten löschen</b-button>
            </b-col>
            <b-col cols="8">
                <p class="text-muted m-0">Alle Daten werden gelöscht</p>
            </b-col>
        </b-row>

    </div>
</template>

<script>
    import {mapGetters} from "vuex"
    import {deleteAllListen} from "../js/localDatabase";

    export default {
        name: "Einstellungen",
        methods: {
            //Verbindung trennen
            logout() {
                this.$store.commit("setUserID", null)
                this.$ls.set('userID', null)
                location.reload();
            },
            deleteData() {
                this.$bvModal.msgBoxConfirm("Wollen Sie wirklich alle gespeicherten Fragebögen löschen?", {
                    title: "Bestätigen",
                    size: "sm",
                    okVariant: "danger",
                    okTitle: "Löschen",
                    cancelTitle: "Abbrechen",
                    centered: true
                }).then(value => {
                    if (value) {
                        deleteAllListen();
                    }
                })
            }
        },
        computed: {
            ...mapGetters(["loggedIn"])
        }
    }
</script>

<style scoped>

</style>
