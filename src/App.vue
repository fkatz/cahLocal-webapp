<template>
  <v-app>
    <Navbar/>
    <v-content>
    <keep-alive>
    <router-view/>
    </keep-alive>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import Navbar from "./components/Navbar.vue";
import "vuetify/dist/vuetify.css";

@Component({
  components: {
    Navbar
  }
})
export default class App extends Vue {
  @Watch("$i18n.locale") onLocaleChanged(){
    document.title = this.$t("appname").toString();
  }
}
</script>

<style lang="scss" scoped>
</style>
