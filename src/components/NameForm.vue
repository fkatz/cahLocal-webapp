<template>
  <v-container>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-card-title primary-title>
          <v-container grid-list-md>
            <v-layout>
              <h3 class="headline">{{$t("name.title")}}</h3>
            </v-layout>
            <v-layout mt-4>
              <v-flex xs12>
                <v-text-field
                  v-model="name"
                  :counter="10"
                  @keypress.enter="send()"
                  :label="$t('name.name')"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout mt-2 row justify-end>
                <v-btn color="accent" large @click="send()">{{$t('send')}}</v-btn>
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
export default class NameForm extends Vue {
  @Prop() public readonly prop: any;
  public name: string = "";
  public send(): void {
    if (this.name.length > 1) {
      this.$emit("nameSent", this.name);
    }
  }
}
</script>
<i18n>
{
  "en": {
    "name": {
      "title" : "Choose your name",
      "name": "Player name"
    }
  },
  "es": {
    "name":{
      "title" : "Ingresa un nombre",
      "name": "Nombre de jugador"
    }
  }
}
</i18n>