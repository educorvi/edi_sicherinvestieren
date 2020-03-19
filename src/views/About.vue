<template>
    <div>
        <h3>Sicher investieren</h3>
        <h5>Version: {{appVersion}}</h5>
    </div>
</template>

<script>
    //@group Views
    //@vuese
    //Über die Anwendung
    import {mapGetters} from "vuex";

    export default {
        name: "About",
        computed: {
            ...mapGetters(["appVersion"])
        },
    };
</script>
