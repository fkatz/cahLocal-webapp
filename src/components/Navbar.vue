<template>
  <div>
    <v-app-bar app flat dark color="accent">
      <v-app-bar-nav-icon @click="drawerVisible = !drawerVisible"></v-app-bar-nav-icon>

      <v-toolbar-title>{{ $t('appname') }}</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-navigation-drawer v-model="drawerVisible" temporary app dark color="accent">
      <v-list class="elevation-0" dark>
        <v-list-item>
          <v-list-item-title class="title">{{$t('drawer.title')}}</v-list-item-title>
        </v-list-item>
        <v-list-item v-if="PlayerModule.logged&&PlayerModule.inGame" @click="abortGame()">
          <v-list-item-title>{{$t('drawer.abort-game')}}</v-list-item-title>
        </v-list-item>
                <v-list-item v-if="PlayerModule.logged&&!PlayerModule.inLobby" @click="releaseName()">
          <v-list-item-title>{{$t('drawer.release-name')}}</v-list-item-title>
        </v-list-item>
        <v-list-group active-class="v-list-group-active">
          <template v-slot:activator>
            <v-list-item-title dark>{{$t('drawer.language')}}</v-list-item-title>
          </template>
          <v-btn-toggle class="pa-1 text-xs-center xs12 container accent" v-model="locale">
            <v-layout justify-space-around>
              <div>
                <v-btn class="ma-1 elevation-0 accent" value="en">English</v-btn>
                <v-btn class="ma-1 elevation-0 accent" value="es">Español</v-btn>
              </div>
            </v-layout>
          </v-btn-toggle>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script lang="ts">
import i18n from "@/plugins/i18n";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import PlayerModule from "../PlayerModule";
import broker from "../Broker";

@Component
export default class Navbar extends Vue {
  PlayerModule: any = PlayerModule;
  private drawerVisible: boolean = false;
  private i18n = i18n;
  private locale: string = i18n.locale;
  @Watch("locale") onLocaleChanged(locale: string) {
    i18n.locale = locale;
    document.cookie = "locale=" + locale + ";";
  }
  abortGame() {
    broker.abortGame();
  }
  releaseName() {
    broker.releaseName();
  }
}
</script>


<i18n>
{
  "en": {
    "drawer":{
      "title": "Settings",
      "language": "Language",
      "release-name": "Change name",
      "abort-game": "Finish game"
    }
  },
  "es": {
    "drawer":{
      "title": "Opciones",
      "language": "Idioma",
      "release-name": "Cambiar nombre",
      "abort-game": "Terminar juego"
    }
  }
}
</i18n>

<style>
.v-overlay.v-overlay--active.theme--dark {
  z-index: 6 !important;
}
.v-list-group-active {
  color: white;
}
.v-toolbar__title {
  user-select: none;
}
</style>