<template>
  <v-dialog v-model="dialog" fullscreen :scrim="false" transition="dialog-bottom-transition">
    <template v-slot:activator="{ props }">
      <v-card fixed raised class="ma-1 pa-0" id="title" v-bind="props">
        <v-container class="pa-2">
          <h4 class="text-center pa-0" absolute>
            {{ $t('main.title') }}
          </h4>
        </v-container>
      </v-card>
    </template>
    <v-card class="text-center">
      <v-card-title>
        <v-btn icon dark @click="dialog = false" class="float-right">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <h1 class="mb-5">{{ $t('main.panel.title') }}</h1>
        <div class="explanation-text" v-html="$t('main.panel.card').replaceAll('\n', '<br/>')"></div>

        <h2 class="ma-5">{{ $t('main.panel.dataBreakdown') }}</h2>
        <v-table density="compact" class="mb-10">
          <thead>
            <tr>
              <th class="text-left">
                {{ $t('main.panel.table.colVillage') }}
              </th>
              <th></th>
              <th class="text-center">
                <v-icon icon="mdi-town-hall" color="secondary"></v-icon>
                <br />
                {{ $t('impact.civinfra.name') }}:
                {{ villages.reduce((acc, v) => acc + v.incidents.filter(i => i.impact == "civinfra").length, 0) }}
              </th>
              <th class="text-center">
                <v-icon icon="mdi-home-city" color="secondary"></v-icon>
                <br />
                {{ $t('impact.privateprop.name') }}:
                {{ villages.reduce((acc, v) => acc + v.incidents.filter(i => i.impact == "privateprop").length, 0) }}
              </th>
              <th class="text-center">
                <v-icon icon="mdi-sign-caution" color="secondary"></v-icon>
                <br />
                {{ $t('impact.borderpost.name') }}:
                {{ villages.reduce((acc, v) => acc + v.incidents.filter(i => i.impact == "borderpost").length, 0) }}
              </th>
            </tr>
          </thead>
          <tbody>
            <template v-for="v in villages" :key="v.id">
              <tr>
                <td rowspan="2" class="text-left">
                  {{ $t(`villages.${v.id}.name`) }}: {{ v.incidents.length }}
                </td>
                <td class="text-left"><span class="geolocated">{{ $t('buildingLocation.socialmedia.name') }}:</span> {{ v.incidents.filter(i => i.tag ==
                  "socialmedia").length }}</td>
                <td class="text-center">{{ v.incidents.filter(i => i.impact == "civinfra" && i.tag ==
                  "socialmedia").length }}</td>
                <td class="text-center">{{ v.incidents.filter(i => i.impact == "privateprop" && i.tag ==
                  "socialmedia").length }}</td>
                <td class="text-center">{{ v.incidents.filter(i => i.impact == "borderpost" && i.tag ==
                  "socialmedia").length }}</td>
              </tr>
              <tr>
                <td class="text-left"><span class="satellite">{{ $t('buildingLocation.satellite.name') }}:</span> {{ v.incidents.filter(i => i.tag ==
                  "satellite").length }}</td>
                <td class="text-center">{{ v.incidents.filter(i => i.impact == "civinfra" && i.tag == "satellite").length
                }}</td>
                <td class="text-center">{{ v.incidents.filter(i => i.impact == "privateprop" && i.tag ==
                  "satellite").length }}</td>
                <td class="text-center">{{ v.incidents.filter(i => i.impact == "borderpost" && i.tag ==
                  "satellite").length }}</td>
              </tr>
            </template>
          </tbody>
        </v-table>
      </v-card-text>
      <v-card-actions v-if="!isEmbed" class="ma-10 text-uppercase" style="display:block">
        <div class="justify-center">
          <v-btn href="TODO" class="ma-2" target="_blank" variant="outlined" size="x-large" append-icon="mdi-open-in-new">
            <template v-slot:prepend>
              <v-avatar class="bcat-logo ma-2" image="@/assets/icon.ico" alt="Bellingcat logo" rounded=""
                size="28"></v-avatar>
            </template>
            {{ $t(`main.panel.read`) }}
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
// import config from "../../config";
export default {
  props: ['villages'],
  data() {
    return {
      title: this.$t('main.title'),
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      isEmbed: window !== window.parent
    }
  }
}
</script>
<style lang="scss"> @import '../styles/settings.scss';

 .v-overlay {
   z-index: $zMax + 225 !important;
 }

 #title {
   position: absolute;
   opacity: $opacityMax;
   z-index: $zMax + 10;
   text-transform: uppercase;
   max-width: 275px;

   &:hover {
     color: $accentColor;
   }
 }

 .explanation-text {
   max-width: 640px;
   margin: auto;
   text-align: justify;
   text-justify: inter-word;

   h3 {
     margin-top: 20px;
     margin-bottom: 10px;
     text-align: center;
   }

   a {
     text-align: center;
   }
 }


 table {
   max-width: 920px;
   margin: auto;
 }
</style>
