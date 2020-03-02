<template>
    <div>
        <b-card no-body>
            <b-card-header>
                <h5>Fragebogen abgeschlossen</h5>
            </b-card-header>
            <b-card-body>
                <b-button @click="download" v-if="token!==null && token !== undefined">PDF-Dokument herunterladen
                </b-button>
                <h5 class="mt-2">Auswertung</h5>
                <Auswertung></Auswertung>
            </b-card-body>
        </b-card>
    </div>
</template>

<script>
    import axios from "axios"
    import {mapGetters} from "vuex"
    import Auswertung from "@/components/Auswertung/Auswertung";

    export default {
        name: "Abschluss",
        components: {Auswertung},
        computed: {
            ...mapGetters(["config", "token", "savefile"]),
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
                    // eslint-disable-next-line no-console
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
            // share() {
            //     alert(JSON.stringify(navigator.share))
            //     if (navigator.share) {
            //         navigator.share({
            //             title: this.savefile.title,
            //             text: 'Auswertung zur Maschine ' + this.savefile.title + " (" + this.savefile.maschnr + ") von " + this.savefile.hersteller,
            //             url: this.config.dataURL + "/" + this.token + "/pdfdownload?maschine=" + this.savefile.title,
            //         })
            //             .then(() => console.log('Successful share'))
            //             .catch((error) => console.log('Error sharing', error));
            //     } else {
            //         alert("Leider kein Versand in ihrem Browser möglich")
            //     }
            // }
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
