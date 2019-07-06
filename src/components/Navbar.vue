<template>
  <div>
    <v-toolbar dark color="indigo">
      <v-toolbar-side-icon @click="drawerVisible = !drawerVisible"></v-toolbar-side-icon>

      <v-toolbar-title>{{ $t('appname') }}</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-navigation-drawer v-model="drawerVisible" fixed temporary>
      <v-toolbar color="indigo" flat dark>
        <v-list class="elevation-0">
          <v-list-tile>
            <v-list-tile-title class="title">{{$t('drawer-title')}}</v-list-tile-title>
          </v-list-tile>
          <v-expansion-panel light class="elevation-0">
            <v-expansion-panel-content>
              <template v-slot:header>
                <div>{{$t('drawer-language')}}</div>
              </template>
                <v-btn-toggle class="pa-1 text-xs-center xs12 container" v-model="locale">
                    <v-layout justify-space-around>
                      <div>
                        <v-btn class="ma-1" flat value="en">English</v-btn>
                        <v-btn class="ma-1" flat value="es">Español</v-btn>
                        </div>
                    </v-layout>
                </v-btn-toggle>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-divider />
        </v-list>
      </v-toolbar>
    </v-navigation-drawer>
  </div>
</template>
<script lang="ts">
import i18n from "@/plugins/i18n";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component
export default class Navbar extends Vue {
  private drawerVisible: boolean = false;
  private i18n = i18n;
  private locale:string = i18n.locale;
  @Watch("locale") onLocaleChanged(locale:string){
    i18n.locale = locale;
    document.cookie="locale="+locale+";";
  }

}
</script>


<i18n>
{
  "en": {
    "drawer-title": "Settings",
    "drawer-language": "Language"
  },
  "es": {
    "drawer-title": "Opciones",
    "drawer-language": "Idioma"
  }
}
</i18n>
