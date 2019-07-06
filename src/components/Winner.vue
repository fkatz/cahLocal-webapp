<template>
  <v-container grid-list-lg pa-0 mt-3>
    <v-flex xs12 sm6 offset-sm3>
      <v-card mt-10>
        <v-card-title primary-title>
          <v-container grid-list-md>
            <v-layout justify-start>
              <v-flex>
                <h1>
                  <span v-if="!isFinal">{{$t('winner-points-turn',{turn:turn})}}</span>
                  <span v-else>{{$t('winner-points-turn-final')}}</span>
                </h1>
              </v-flex>
            </v-layout>
            <v-layout col wrap>
              <v-card dark class="card">
                <v-card-title primary-title :style="{fontSize:fontSize(bCard.text)}">{{bCard.text}}</v-card-title>
              </v-card>
              <v-card light class="card" v-for="card in wCards" v-bind:key="card.text">
                <v-card-title primary-title :style="{fontSize:fontSize(card.text)}">{{card.text}}</v-card-title>
              </v-card>
            </v-layout>
            <v-flex my-3>
              <h2 v-html="$t('winner-winner',{winner:winner})"></h2>
            </v-flex>
            <v-layout justify-space-between>
              <v-flex>
                <h3>{{$t('winner-points-player')}}</h3>
              </v-flex>
              <v-flex text-xs-right>
                <h3>{{$t('winner-points-points')}}</h3>
              </v-flex>
            </v-layout>
            <v-container grid-list-xs offset-xs1 pa-2>
              <template v-for="point in points">
                <v-layout v-bind:key="point.player.name" class="list" justify-space-between>
                  <v-flex xs6>
                    <strong>{{point.player}}</strong>
                  </v-flex>
                  <v-flex xs6 text-xs-right>
                    <span>{{point.points}}</span>
                  </v-flex>
                </v-layout>
              </template>
            </v-container>
            <v-layout mt-2 row right>
              <v-flex xs2>
                <v-btn outline color="indigo" @click="next()">
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

@Component
export default class Winner extends Vue {
  @Prop() public readonly prop!: any;
  get winner() {
    return this.prop.winner.winner;
  }
  get isFinal() {
    return this.prop.winner.isFinal;
  }
  get points() {
    return this.prop.winner.points;
  }
  get turn() {
    return this.prop.winner.turn;
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
  private fontSize(text: string): string {
    if (text.length < 50) {
      return "1.1em";
    } else if (text.length > 200) {
      return "0.75em";
    } else if (text.length > 136) {
      return "0.85em";
    } else if (text.length > 70) {
      return "0.9em";
    } else return "inherit";
  }
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
</script>
<i18n>
{
  "en": {
    "winner-winner" : "The winner of this round is <strong>{winner}</strong>",
    "winner-points-points": "Points",
    "winner-points-player":"Player",
    "winner-points-turn-final": "Final round",
    "winner-points-turn":"Round #{turn}"
  },
  "es": {
    "winner-winner" : "El ganador de esta ronda es <strong>{winner}</strong>",
    "winner-points-points": "Puntuación",
    "winner-points-player":"Jugador",
    "winner-points-turn-final": "Ronda final",
    "winner-points-turn":"Ronda {turn}"
  }
}
</i18n>