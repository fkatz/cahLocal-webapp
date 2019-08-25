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
      {{$tc(error.text,error.n,error.props)}}
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
import PlayerModule from "../PlayerModule"

import broker from "../Broker";
@Component({
  components: {}
})
export default class Home extends Vue {
  public currentComponent: any = HelloWorld;
  private prop: any = { askStart: false, players: [], nameTaken: false };
  private error: { state: boolean; text: string; props: any, n?:number } = {
    state: false,
    text: "",
    props: {}
  };
  private created() {
    broker.emitter.addEventListener("connect", this.onConnect as EventListener);
    broker.emitter.addEventListener("askGame", this.onAskGame as EventListener);
    broker.emitter.addEventListener("askName", this.onAskName as EventListener);
    broker.emitter.addEventListener("askStart", this
      .onAskStart as EventListener);
    broker.emitter.addEventListener("askSelect", this
      .onAskSelectCards as EventListener);
    broker.emitter.addEventListener("askChoose", this
      .onAskChoose as EventListener);
    broker.emitter.addEventListener("winner", this.onWinner as EventListener);
    broker.emitter.addEventListener("nameTaken", this
      .onNameTaken as EventListener);
    broker.emitter.addEventListener("lobbyNotFound", this
      .onLobbyNotFound as EventListener);
  }
  private onConnect(event: Event) {
    if(PlayerModule.logged){
      broker.login(PlayerModule.name);
    }
    else broker.login("");
  }
  private onAskName(event:Event){
    PlayerModule.logged = false;
    PlayerModule.inGame = false;
    PlayerModule.inLobby = false;
    this.currentComponent = NameForm;
  }
  private onNameTaken(event: Event) {
    this.error.text = "error.name-taken";
    this.error.state = true;
  }
    private onLobbyNotFound(event: Event) {
    this.error.text = "error.lobby-not-found";
    this.error.state = true;
  }
  private onNameSent(name: string) {
    PlayerModule.name = name;
    broker.sendName(name);
  }
  private onAskGame() {
    PlayerModule.logged = true;
    PlayerModule.inGame = false;
    PlayerModule.inLobby = false;
    this.currentComponent = GameForm;
  }
  private onNewGame(obj: any) {
    broker.newGame(PlayerModule.name, obj.turns, obj.cards, obj.packs);
  }
  private onJoinGame(host: string) {
    broker.joinGame(PlayerModule.name, host);
  }
  private onAskStart(event: CustomEvent) {
    PlayerModule.inLobby = true;
    this.prop.players = event.detail.players;
    this.prop.askStart = event.detail.canStart;
    this.currentComponent = StartForm;
  }
  private onStart() {
    broker.start();
  }
  private onAskSelectCards(event: CustomEvent) {
    PlayerModule.inGame = true;
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
  private onError(args:[string, any]|string) {
    let error:string= (typeof args == "string")? args:args[0];
    console.log(error,args);
    switch (error) {
      case "select":
        this.error.text = "error.select";
        this.error.n = args[1].n;
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
    "select": "Please select {n} card.|Please select {n} cards.",
    "no-pack":"Please select at least one pack.",
    "lobby-not-found":"Game not found."
    }
  },
  "es": {
    "error":{
    "name-taken": "Ya existe un jugador con ese nombre.",
    "choose":"Seleccione un ganador.",
    "select":"Seleccione {n} carta.|Seleccione {n} cartas.",
    "no-pack":"Seleccione al menos un pack.",
    "lobby-not-found":"No se encontró un juego con ese nombre."
    }

  }
}
</i18n>