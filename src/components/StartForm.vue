<template>
  <v-container>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-card-title primary-title>
          <v-container grid-list-md>
            <v-layout>
              <h3 class="headline">
                  <span v-if="askStart">{{$t('start-title-start')}}</span>
                    <span v-else>{{$t('start-title-wait')}}</span>
                  </h3>
            </v-layout>
            <v-layout mt-4>
              <v-flex xs12>
                {{$t('start-players')}}
                <ul>
                  <li v-for="player in players" v-bind:key="player">{{player}}</li>
                </ul>
              </v-flex>
            </v-layout>
            <v-layout mt-2 row right>
              <v-flex xs2>
                <v-btn outline color="indigo" @click="start()" v-bind:disabled="!askStart">
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
    "start-title-start" : "Ready to begin",
    "start-players":"Players:",
    "start-title-wait": "Waiting for more players..."
},
  "es": {
    "start-title-start" : "Listo para comenzar",
    "start-players":"Jugadores:",
    "start-title-wait": "Esperando más jugadores..."
  }
}
</i18n>