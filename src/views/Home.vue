<template>
  <div id="home">
    <component
      v-bind:is="currentComponent"
      v-bind:prop="prop"
      @nameSent="onNameSent($event)"
      @newGame="onNewGame($event)"
      @joinGame="onJoinGame($event)"
      @start="onStart()"
      @select="onSelect($event)"
      @chose="onChose($event)"
      @next="onNext()"
      @error="onError($event)"
      class="tab"
    ></component>
    <v-snackbar v-model="error.state" :top="true" :timeout="3000">
      {{$t(error.text,error.props)}}
      <v-btn text @click="error.state = false">{{$t('close')}}</v-btn>
    </v-snackbar>
  </div>
</template>
<script lang="ts">
import HelloWorld from "../components/HelloWorld.vue";
import NameForm from "../components/NameForm.vue";
import GameForm from "../components/GameForm.vue";
import StartForm from "../components/StartForm.vue";
import SelectForm from "../components/SelectForm.vue";
import ChooseForm from "../components/ChooseForm.vue";
import Winner from "../components/Winner.vue";
import { Prop, Component, Vue } from "vue-property-decorator";

import { Broker } from "../Broker";
const broker = new Broker();
@Component({
  components: {}
})
export default class Home extends Vue {
  private playerName?: string;
  public currentComponent: any = HelloWorld;
  private prop: any = { askStart: false, players: [], nameTaken: false };
  private error: { state: boolean; text: string; props: any } = {
    state: false,
    text: "",
    props: {}
  };
  private created() {
    broker.emitter.addEventListener("connect", this.onConnect as EventListener);
    broker.emitter.addEventListener("askGame", this.onAskGame as EventListener);
    broker.emitter.addEventListener("askStart", this
      .onAskStart as EventListener);
    broker.emitter.addEventListener("askSelect", this
      .onAskSelectCards as EventListener);
    broker.emitter.addEventListener("askChoose", this
      .onAskChoose as EventListener);
    broker.emitter.addEventListener("winner", this.onWinner as EventListener);
    broker.emitter.addEventListener("nameTaken", this
      .onNameTaken as EventListener);
  }
  private onConnect(event: Event) {
    this.currentComponent = NameForm;
  }
  private onNameTaken(event: Event) {
    this.error.text = "error.name-taken";
    this.error.state = true;
  }
  private onNameSent(name: string) {
    this.playerName = name;
    broker.sendName(name);
  }
  private onAskGame() {
    this.currentComponent = GameForm;
  }
  private onNewGame(obj: any) {
    broker.newGame(this.playerName!, obj.turns, obj.cards, obj.packs);
  }
  private onJoinGame(host: string) {
    broker.joinGame(this.playerName!, host);
  }
  private onAskStart(event: CustomEvent) {
    this.prop.players = event.detail.players;
    this.prop.askStart = event.detail.canStart;
    this.currentComponent = StartForm;
  }
  private onStart() {
    broker.start();
  }
  private onAskSelectCards(event: CustomEvent) {
    this.prop.select = event.detail;
    this.currentComponent = SelectForm;
  }
  private onSelect(cards: any[]) {
    broker.select(cards);
  }
  private onAskChoose(event: CustomEvent) {
    this.prop.choose = event.detail;
    this.currentComponent = ChooseForm;
  }
  private onChose(winner: string) {
    broker.choose(winner);
  }
  private onWinner(event: CustomEvent) {
    this.prop.winner = event.detail;
    this.currentComponent = Winner;
  }
  private onNext() {
    broker.nextTurn();
  }
  private onError(error: string, arg: any) {
    switch (error) {
      case "select":
        this.error.text = "error.select";
        this.error.props = { count: arg };
        break;
      case "choose":
        this.error.text = "error.choose";
        break;
      case "noPack":
        this.error.text = "error.no-pack";
        break;
    }
    this.error.state = true;
  }
}
</script>

<i18n>
{
  "en": {
    "error":{
    "name-taken": "This name is already taken.",
    "choose":"Please choose a winner.",
    "select": "Please select {count} card.",
    "select_plural": "Please select {count} cards.",
    "no-pack":"Please select at least one pack."
    }
  },
  "es": {
    "error":{
    "name-taken": "Ya existe un jugador con ese nombre.",
    "choose":"Seleccione un ganador.",
    "select":"Seleccione {count} carta.",
    "select_plural": "Seleccione {count} cartas.",
    "no-pack":"Seleccione al menos un pack."
    }

  }
}
</i18n>