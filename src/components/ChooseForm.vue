<template>
  <v-container>
    <v-card class="card" dark>
      <v-card-title primary-title :style="{fontSize:fontSize(black.text)}">{{black.text}}</v-card-title>
    </v-card>
    <div class="mt-3">
      <div>
        <div v-if="isCzar">
          <h2 v-if="!hasChosen">{{$t("choose.title-czar")}}</h2>
          <h2 v-else>{{$t("choose.subtitle-czar")}}</h2>
        </div>
        <div v-else>
          <h2>{{$t("choose.title-player")}}</h2>
          <h3>{{$t("choose.subtitle-player")}}</h3>
        </div>
        <v-container grid-list-md pa-0 mt-3>
          <v-item-group v-model="selectedWinnerIndex">
            <v-layout row wrap>
              <v-flex class="flex" v-for="select in selects" v-bind:key="select.player">
                <v-item>
                  <v-layout
                    mr-3
                    mb-5
                    offset-xs3
                    slot-scope="{ active, toggle }"
                    @click="if(isCzar && !hasChosen) toggle()"
                  >
                    <v-card
                      v-ripple="isCzar"
                      class="card"
                      v-for="card in select.cards"
                      v-bind:key="card.text"
                    >
                      <v-card-title
                        primary-title
                        :style="{fontSize:fontSize(card.text)}"
                      >{{card.text}}</v-card-title>
                    </v-card>
                  </v-layout>
                </v-item>
              </v-flex>
            </v-layout>
          </v-item-group>
        </v-container>
      </div>
    </div>
    <v-btn
      fixed
      fab
      bottom
      right
      large
      color="accent"
      @click="chooseWinner()"
      v-bind:disabled="hasChosen"
      v-if="isCzar"
    >
      <v-icon>send</v-icon>
    </v-btn>
  </v-container>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import _fontSize from "../util/fontSize";
@Component
export default class ChooseForm extends Vue {
  @Prop() public readonly prop: any;
  private hasChosen: boolean = false;
  private selectedWinnerIndex?: number = -1;
  get black() {
    if (this.prop.choose == undefined || this.prop.choose.bCard == undefined) {
      return null;
    } else return this.prop.choose.bCard;
  }
  get isCzar() {
    if (this.prop.choose == undefined || this.prop.choose.isCzar == undefined) {
      return null;
    } else return this.prop.choose.isCzar;
  }
  get selects(): any[] {
    if (this.prop.choose == undefined || this.prop.choose.wCards == undefined) {
      return [];
    } else return this.prop.choose.wCards;
  }
  get chosenWinner() {
    if (
      this.selectedWinnerIndex != undefined &&
      this.selects[this.selectedWinnerIndex] != undefined
    ) {
      return this.selects[this.selectedWinnerIndex].player;
    } else return undefined;
  }
  get chosenCards() {
    if (
      this.selectedWinnerIndex != undefined &&
      this.selects[this.selectedWinnerIndex] != undefined
    ) {
      return this.selects[this.selectedWinnerIndex].cards;
    }
  }
  private chooseWinner() {
    if (
      this.selectedWinnerIndex == undefined ||
      this.selectedWinnerIndex == -1
    ) {
      this.$emit("error", "choose");
    } else {
      this.$emit("chose", {
        winner: this.chosenWinner,
        wChosen: this.chosenCards
      });
      this.hasChosen = true;
    }
  }
  private fontSize: (text: string) => string = _fontSize;
}
</script>

<style scoped lang="scss">
.card {
  width: 160px;
  height: 180px;
  margin-right: 15px;
  user-select: none;
}
.v-item--active {
  .v-card {
    outline: 2px solid #3f51b5;
  }
}
.flex {
  flex: none;
}
.v-item-group > * {
  cursor: default !important;
}
</style>

<i18n>
{
  "en": {
    "choose":{
      "title-czar" : "Choose the best answer",
      "subtitle-czar": "Sending...",
      "title-player": "Answers recieved",
      "subtitle-player": "Waiting for the Czar..."
    }
  },
  "es": {
    "choose":{
      "title-czar" : "Elije la mejor respuesta",
      "subtitle-czar": "Enviando respuesta...",
      "title-player": "Respuestas recibidas",
      "subtitle-player": "Esperando al juez..."
    }
  }
}
</i18n>