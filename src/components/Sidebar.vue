<template>
    <v-card max-width="500px" fixed raised class="ma-1" id="sidebar">
        <v-container>
            <h3 class="text-center pt-2" absolute>
                INFO TO DISPLAY
            </h3>
        </v-container>
    </v-card>
</template>
<script>
export default {
    methods: {
    },
    mounted() {
        console.log(`sidebar mounted`)
    },
}
</script>
<style lang="scss"> @import '../styles/settings.scss';

 #sidebar {
     position: absolute;
     top: 20%;
     opacity: $opacityMax;
     z-index: $zMax + 10;
 }
</style>
