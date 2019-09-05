<template>
    <b-card no-body>
        <b-card-header><h4>Einstellungen</h4></b-card-header>
        <b-card-body>
            <b-button @click="deleteData" variant="danger">Daten löschen</b-button>
        </b-card-body>
    </b-card>
</template>

<script>
    export default {
        name: "Settings",
        methods: {
            deleteData() {
                this.$bvModal.msgBoxConfirm('Wollen Sie wirklich alle Daten löschen? (Im Moment bezieht sich das lediglich auf lokale Daten)', {
                    title: 'Daten löschen',
                    size: 'sm',
                    buttonSize: 'sm',
                    okVariant: 'danger',
                    okTitle: 'Löschen',
                    cancelTitle: 'Abbrechen',
                    footerClass: 'p-2',
                    hideHeaderClose: false,
                    centered: true
                }).then(value => {
                    if (value) {
                        this.$ls.clear();
                        this.$router.go("/logout")
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>