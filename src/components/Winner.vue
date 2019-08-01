<template>
  <v-container grid-list-lg pa-0 mt-3>
    <v-flex xs12 sm6 offset-sm3>
      <v-card mt-10>
        <v-card-title primary-title>
          <v-container grid-list-md>
            <v-layout justify-start>
              <v-flex>
                <h2>
                  <span v-if="!isFinal">{{$t('winner.points-turn',{turn:turn,maxTurns:maxTurns})}}</span>
                  <span v-else>{{$t('winner.points-turn-final')}}</span>
                </h2>
              </v-flex>
            </v-layout>
            <v-layout col wrap>
              <v-card dark class="card">
                <v-card-title :style="{fontSize:fontSize(bCard.text)}">{{bCard.text}}</v-card-title>
              </v-card>
              <v-card light class="card" v-for="card in wCards" v-bind:key="card.text">
                <v-card-title :style="{fontSize:fontSize(card.text)}">{{card.text}}</v-card-title>
              </v-card>
            </v-layout>
            <v-flex my-3>
              <h4 v-html="$t('winner.winner',{winner:winner})"></h4>
            </v-flex>
            <v-simple-table>
              <thead>
                <tr>
                  <th class="text-left">{{$t('winner.points-player')}}</th>
                  <th class="text-left">{{$t('winner.points-points')}}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="point in points" v-bind:key="point.player.name">
                  <td>{{ point.player }}</td>
                  <td>{{ point.points }}</td>
                </tr>
              </tbody>
            </v-simple-table>
            <v-layout mt-2 row justify-end>
              <v-flex xs3>
                <v-btn color="accent" large @click="next()">
                  <span v-if="!isFinal">{{$t('continue')}}</span>
                  <span v-else>{{$t('back')}}</span>
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
import _fontSize from "../util/fontSize";
@Component
export default class Winner extends Vue {
  @Prop() public readonly prop!: any;
  get winner() {
    return this.prop.winner.winner;
  }
  get isFinal() {
    return this.prop.winner.turn == this.prop.winner.maxTurns;
  }
  get points() {
    let points = this.prop.winner.points as {points:number,player:string}[];
    return points.sort((a,b)=>b.points-a.points);
  }
  get turn() {
    return this.prop.winner.turn;
  }
  get maxTurns() {
    return this.prop.winner.maxTurns;
  }
  get wCards() {
    return this.prop.winner.wChosen;
  }
  get bCard() {
    return this.prop.winner.bCard;
  }
  public name: string = "";
  public next(): void {
    this.$emit("next");
  }
  private fontSize: (text: string) => string = _fontSize;
}
</script>
<style scoped lang="scss">
.card {
  width: 160px;
  height: 180px;
  margin: 10px;
  user-select: none;
}

.list {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
</style>
<i18n>
{
  "en": {
    "winner":{
      "winner" : "The winner of this round is <strong>{winner}</strong>",
      "points-points": "Points",
      "points-player":"Player",
      "points-turn-final": "Final round",
      "points-turn":"Round {turn} of {maxTurns}"
    }
  },
  "es": {
    "winner":{
      "winner" : "El ganador de esta ronda es <strong>{winner}</strong>",
      "points-points": "Puntuación",
      "points-player":"Jugador",
      "points-turn-final": "Ronda final",
      "points-turn":"Ronda {turn} de {maxTurns}"
    }
  }
}
</i18n>