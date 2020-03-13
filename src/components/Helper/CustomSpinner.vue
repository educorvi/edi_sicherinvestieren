<template>
    <div class="d-flex justify-content-center mt-3 mb-3">
        <b-spinner :variant="variant" label="Loading..."/>
    </div>
</template>
<script>
    //@group Helper
    //@vuese
    //Eigener, zentrierter Spinner
    export default {
        name: 'CustomSpinner',
        props: {
            variant: {
                type: String,
                required: false,
                default: "primary"
            }
        }
    }
</script>
