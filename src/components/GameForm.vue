<template>
  <v-container>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-card-title primary-title>
          <v-container grid-list-md>
            <v-layout>
              <h3 class="headline">{{$t("create-title")}}</h3>
            </v-layout>
            <v-layout mt-4>
              <v-flex xs6>
                <v-text-field
                  v-model="turns"
                  type="number"
                  :label="$t('create-turns')"
                  min="0"
                  step="1"
                  @keypress.enter="newGame()"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  v-model="cards"
                  min="0"
                  step="1"
                  type="number"
                  :label="$t('create-cards')"
                  @keypress.enter="newGame()"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout>
              <v-combobox
                v-model="selectedPacks"
                :items="suggestedPacks"
                item-text="name"
                item-value="code"
                label="Card packs"
                chips
                clearable
                solo
                multiple
                required
              >
                <template v-slot:selection="data">
                  <v-chip
                    dark
                    :input-value="data.selected"
                    :color="chipColor(data.item)"
                    close
                    @input="remove(data.item)"
                  >
                    <strong>{{ data.item.name }}</strong>&nbsp;
                    <span>
                      {{typeof(data.item)=='string'?data.item:data.item.code}}
                      <strong v-if="data.item.error!=undefined" class="pl-2">!</strong>
                    </span>
                  </v-chip>
                </template>
              </v-combobox>
            </v-layout>
            <v-layout row justify-end>
                <v-btn color="accent" large dark @click="newGame()">{{$t("create")}}</v-btn>
            </v-layout>
          </v-container>
        </v-card-title>
      </v-card>
    </v-flex>
    <v-flex xs12 sm6 offset-sm3 mt-3>
      <v-card>
        <v-card-title primary-title>
          <v-container grid-list-md>
            <v-layout>
              <h3 class="headline">{{$t("join-title")}}</h3>
            </v-layout>
            <v-layout mt-4>
              <v-flex xs12>
                <v-text-field
                  v-model="host"
                  type="text"
                  :label="$t('join-host')"
                  @keypress.enter="joinGame()"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row justify-end>
                <v-btn color="accent" large dark @click="joinGame()">{{$t("join")}}</v-btn>
            </v-layout>
          </v-container>
        </v-card-title>
      </v-card>
    </v-flex>
  </v-container>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
@Component
export default class GameForm extends Vue {
  @Prop() public readonly prop: any;
  private suggestedPacks: (
    | { code: string; name?: string; error?: string }
    | string)[] = [
    { code: "CAHBS", name: "Cards Against Humanity" },
    { code: "UMJ8V", name: "CAH Argentina" }
  ];
  private selectedPacks: (
    | { code: string; name?: string; error?: string }
    | string)[] = [];
  public host: string = "";
  public turns: number = 15;
  public cards: number = 10;
  @Watch("selectedPacks") onSelectedPacksChanged(
    newSel: ({ code: string; name: string } | string)[]
  ) {
    var news: string[] = newSel.filter(
      (value: any) => typeof value == "string"
    ) as string[];
    news.map(newVal => this.setDeckDescription(newVal));
  }
  private get cleanPacks() {
    return this.selectedPacks
      .filter(pack => (pack as any).name != undefined)
      .map(pack => (pack as any).code);
  }
  public newGame(): void {
    if(this.cleanPacks.length>0){
    this.$emit("newGame", {
      turns: this.turns,
      cards: this.cards,
      packs: this.cleanPacks
    });
    } else this.$emit("error","noPack");
  }
  public joinGame(): void {
    this.$emit("joinGame", this.host);
  }
  private remove(item: { code: string; name: string }) {
    this.selectedPacks = this.selectedPacks.filter(value => value != item);
  }
  private async setDeckDescription(code: string) {
    var req = await fetch("/api/deck/" + code);
    var obj: any = await req.json();
    console.log(obj);
    if (obj.name != undefined) {
      this.selectedPacks = this.selectedPacks.map(value =>
        value == code ? { code: code, name: obj.name } : value
      );
    } else {
      this.selectedPacks = this.selectedPacks.map(value =>
        value == code ? { code: code, error: "not-found" } : value
      );
    }
  }
  private chipColor(chip: any): string {
    return chip.name != undefined
      ? "green"
      : chip.error != undefined
      ? "red"
      : "";
  }
}
</script>
<i18n>
{
  "en": {
    "create-title": "New game",
    "create-turns": "Turns",
    "create-cards": "Cards per hand",
    "join-title": "Join a game",
    "join-host": "Host's name"
  },
  "es": {
    "create-title" : "Nueva Partida",
    "create-turns": "Turnos",
    "create-cards": "Cartas por mano",
    "join-title" : "Unirse a partida",
    "join-host" : "Nombre del anfitrión"
  }
}
</i18n>