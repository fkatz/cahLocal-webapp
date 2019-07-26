<template>
  <v-container>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-card-title primary-title>
          <v-container grid-list-md>
            <v-layout>
              <h3 class="headline">
                <span v-if="askStart">{{$t('start-form.title-start')}}</span>
                <span v-else>{{$t('start-form.title-wait')}}</span>
              </h3>
            </v-layout>
            <v-simple-table>
              <thead>
                <tr>
                  <th class="text-left">{{$t('start-form.players')}}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="player in players" :key="player">
                  <td>{{ player }}</td>
                </tr>
              </tbody>
            </v-simple-table>
            <v-layout mt-2 row justify-end>
              <v-flex xs3>
                <v-btn color="accent" large @click="start()" v-bind:disabled="!askStart">
                  <span v-if="askStart">{{$t('start')}}</span>
                  <span v-else>{{$t('waiting')}}</span>
                </v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-title>
      </v-card>
    </v-flex>
  </v-container>
</template>
<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator";

@Component
export default class StartForm extends Vue {
  @Prop() public readonly prop: any;
  get players() {
    if (this.prop.players == undefined) {
      return [];
    } else return this.prop.players;
  }
  get askStart() {
    return this.prop.askStart;
  }
  public name: string = "";
  public start(): void {
    this.$emit("start");
  }
}
</script>
<i18n>
{
  "en": {
    "start-form":{
      "title-start" : "Ready to begin",
      "players":"Players",
      "title-wait": "Waiting for more players..."
    }
},
  "es": {
    "start-form":{
      "title-start" : "Listo para comenzar",
      "players":"Jugadores",
      "title-wait": "Esperando más jugadores..."
    }
  }
}
</i18n>