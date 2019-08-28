<template>
    <b-card class="mb-2 ">
        <radial-progress-bar :completed-steps="item.progress" :diameter="60" :stroke-width="5" class="float-left mr-3"
                             :total-steps=100
                             v-if="item.progress">{{item.progress}}%
        </radial-progress-bar>
        <div>
            <p v-if="item['maschnr']">{{item["maschnr"]}}</p>
            <p v-if="item['maschnr'] && item['hersteller']"> von </p>
            <p v-if="item['hersteller']">{{item["hersteller"]}}</p>
            <h5>{{item.title}}</h5>
        </div>
    </b-card>
</template>

<script>
    import RadialProgressBar from 'vue-radial-progress';

    export default {
        name: "Listenitem",
        props: ["item"],
        components: {
            RadialProgressBar
        }
    }
</script>

<style scoped>
    p {
        display: inline;
    }
</style>