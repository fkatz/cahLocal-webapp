<template>
<v-progress-circular
      :size="70"
      :width="7"
      color="indigo"
      indeterminate
    ></v-progress-circular>
    </template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.v-progress-circular{
  $size: 70px;
  top: 50%;
  left: calc(50% - #{$size / 2});
  position:fixed;
}
</style>
