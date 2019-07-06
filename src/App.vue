<template>
  <v-app>
    <Navbar/>
    <keep-alive>
    <router-view/>
    </keep-alive>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import Vuetify from "vuetify";
import Navbar from "./components/Navbar.vue";
import "vuetify/dist/vuetify.css";
import colors from "vuetify/es5/util/colors";

Vue.use(Vuetify, {
  iconfont: "md",
  options: {
    customProperties: true
  }
});
//import "../node_modules/materialize-css/dist/css/materialize.min.css"
//import "../node_modules/materialize-css/dist/js/materialize.min.js"

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
