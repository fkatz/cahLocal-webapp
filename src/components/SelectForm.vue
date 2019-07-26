<template>
  <v-container>
    <v-card class="card" dark>
      <v-card-title :style="{fontSize:fontSize(black.text)}">{{black.text}}</v-card-title>
    </v-card>
    <div class="mt-3">
      <div v-if="isCzar">
        <h2>{{$t('select-title-czar')}}</h2>
        <h3>{{$t('select-subtitle-czar')}}</h3>
      </div>
      <div v-else>
        <h2>{{$t('select-title-player',{czar:czar})}}</h2>
        <h3>
          <span
            v-if="!hasSelected"
          >{{$t(black.requires==1?'select-subtitle-player':'select-subtitle-player_plural',{count: black.requires})}}</span>
          <span v-else>{{$t('select-subtitle-player-selected')}}</span>
        </h3>
      </div>
      <v-container grid-list-lg pa-0 mt-3>
        <v-layout row wrap>
          <v-flex v-for="card in hand" v-bind:key="card.text">
            <v-card
              class="card"
              @click="toggle(card);"
              v-ripple="!hasSelected&&!isCzar"
              v-bind:class="{ active: selected.includes(card) }"
              :style="{pointerEvents:isCzar?'none':'auto'}"
            >
              <v-card-title :style="{fontSize:fontSize(card.text)}">{{card.text}}</v-card-title>
              <div v-if="selected.includes(card)" class="number">{{selected.indexOf(card)+1}}</div>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
    <v-btn
      fixed
      fab
      bottom
      right
      large
      color="accent"
      @click="sendCards()"
      v-bind:disabled="hasSelected"
      v-if="!isCzar"
    >
      <v-icon>send</v-icon>
    </v-btn>
  </v-container>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import _fontSize from "../util/fontSize";
@Component
export default class SelectForm extends Vue {
  @Prop() public readonly prop: any;
  private hasSelected = false;
  private selected: any[] = [];
  get hand(): any[] {
    if (this.prop.select == undefined || this.prop.select.hand == undefined) {
      return [];
    } else return this.prop.select.hand;
  }
  get notSelected(): any[] {
    return this.hand.filter(card => !this.selected.includes(card));
  }
  get black() {
    if (this.prop.select == undefined || this.prop.select.bCard == undefined) {
      return null;
    } else return this.prop.select.bCard;
  }
  get isCzar() {
    if (this.prop.select == undefined || this.prop.select.isCzar == undefined) {
      return null;
    } else return this.prop.select.isCzar;
  }
  get czar() {
    if (this.prop.select == undefined || this.prop.select.isCzar == undefined) {
      return null;
    } else return this.prop.select.czar;
  }
  private toggle(card: any) {
    if (!this.hasSelected && !this.isCzar) {
      if (!this.selected.includes(card)) {
        this.selected.push(card);
      } else this.selected = this.selected.filter(sCard => card != sCard);
    }
  }
  private sendCards() {
    if (this.selected.length != this.black.requires) {
      this.$emit("error", "select", this.black.requires);
    } else {
      this.$emit("select", this.selected);
      this.hasSelected = true;
    }
  }
  private fontSize: (text: string) => string = _fontSize;
}
</script>

<style scoped lang="scss">
.card {
  width: 160px;
  height: 180px;
  user-select: none;
  &.active {
    outline: 2px solid #3f51b5;
    .number {
      opacity: 1;
    }
  }
  .v-card--link:focus:before{
    opacity:0!important;
  }
  .number {
    font-size: 1.3em;
    display: block;
    position: absolute;
    bottom: 0;
    right: 0;
    border: 2px solid #3f51b5;
    border-radius: 100% !important;
    height: 30px;
    width: 30px;
    margin: 10px;
    line-height: 26px;
    text-align: center;
    color: #3f51b5;
    font-weight: bolder;
    opacity: 0;
    transition: opacity 0.2s;
  }
}
.flex {
  flex: none;
}
</style>
<i18n>
{
  "en": {
    "select-title-czar" : "You are the Czar.",
    "select-subtitle-czar": "Waiting for the players...",
    "select-title-player":"{czar} is the Czar.",
    "select-subtitle-player":"Select {count} card.",
    "select-subtitle-player_plural":"Select {count} cards.",
    "select-subtitle-player-selected":"Waiting for the other players...",
    "waiting": "Waiting..."
  },
  "es": {
    "select-title-czar" : "Eres el juez",
    "select-subtitle-czar": "Esperando a los demás jugadores...",
    "select-title-player":"{czar} es el juez.",
    "select-subtitle-player":"Selecciona {count} carta.",
    "select-subtitle-player_plural":"Selecciona {count} cartas.",
    "select-subtitle-player-selected":"Esperando a los demás jugadores...",
    "waiting": "Esperando"
  }
}
</i18n>
