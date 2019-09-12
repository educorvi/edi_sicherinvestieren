<template>
    <div>
        <b-card no-body>
            <b-card-header>
                <h5>Fragebogen abgeschlossen</h5>
            </b-card-header>
            <b-card-body>
                <b-button @click="download" v-if="token!==null && token !== undefined">PDF-Dokument herunterladen
                </b-button>
            </b-card-body>
        </b-card>
    </div>
</template>

<script>
    import axios from "axios"
    import {mapGetters} from "vuex"

    export default {
        name: "Abschluss",
        computed: {
            ...mapGetters(["config", "token", "savefile"])
        },
        methods: {
            download() {
                const url = this.config.dataURL + "/" + this.token + "/pdfdownload";
                axios({
                    method: 'get',
                    url: url,
                    responseType: 'arraybuffer',
                    headers: {
                        Accept: "application/json"
                    },
                    params: {
                        maschine: this.savefile.title
                    }
                })
                    .then(response => {

                        this.forceFileDownload(response);

                    })
                    .catch(() => console.log('error occured'))
            },
            forceFileDownload(response) {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', this.savefile.title + '.pdf');
                document.body.appendChild(link);
                link.click()
            },
        },
        beforeRouteLeave(to, from, next) {
            if (to.name !== "fragebogen") {
                this.$store.dispatch("setSavefile", null);
                this.$store.dispatch("setNotizen", []);
                this.$store.commit("setSelected", []);
                this.$store.dispatch("setHistory", []);
                this.$store.dispatch("getListen");
            }
            next();
        }

    }
</script>

<style scoped>

</style>