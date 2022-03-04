<template>
  <header>
    <b-container>
      <b-row>
        <b-col cols="6" class="title">Where in the world?</b-col>
        <b-col cols="6" class="rtl change_theme" @click="changeTheme()">
          {{ activeTheme.name }} Mode
          <i class="fa fa-moon"></i>
        </b-col>
      </b-row>
    </b-container>
  </header>
</template>

<script lang="ts">
import { dark, light, Theme } from "@/types";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class Header extends Vue {
  activeTheme: Theme = light;
  mounted() {
    const theme = JSON.parse(localStorage.getItem('theme') || 'light');
    this.activeTheme = theme;
    this.setActiveTheme();
  }
  setActiveTheme(): void {
    Object.keys(this.activeTheme.properties).forEach((property) => {
      document.documentElement.style.setProperty(
        property,
        this.activeTheme.properties[property]
      );
    });
    localStorage.setItem('theme', JSON.stringify(this.activeTheme));
  }
  changeTheme() {
    if (this.activeTheme.name === 'light') {
      this.activeTheme = dark;
    } else {
      this.activeTheme = light;
    }
    this.setActiveTheme();
  }
}
</script>
<style scoped lang="scss">
header {
  box-shadow: 0px 2px 10px 0 rgba(0, 0, 0, 0.1);
  font-family: "NunitoSans_SemiBold";
  padding: 15px 0;
  background-color: var(--elements-background);
  @media only screen and (max-width: 480px) {
    font-size: 12px;
  }
  .title {
    font-family: "NunitoSans_ExtraBold";
    font-size: 16px;
    @media only screen and (max-width: 480px) {
      font-size: 13px;
    }
  }
}
.change_theme{
  cursor: pointer;
}
</style>
