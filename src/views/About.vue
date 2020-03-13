<template>
    <div>
        <h1>Sicher investieren</h1>
        <h3>Version: {{appVersion}}</h3>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "About",
        computed: {
            ...mapGetters(["appVersion"])
        },
    };
</script>
