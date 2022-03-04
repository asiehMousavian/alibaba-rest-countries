<template>
  <div class="form-select-body">
    <b-form-select
      class="form-select"
      v-model="regionSelected"
      :options="options"
      @change="changeRegion()"
    >
    </b-form-select>
    <i class="fa fa-angle-down form-select-arrow"></i>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Watch, Vue } from "vue-property-decorator";

@Component({})
export default class Regions extends Vue {
  @Prop() regions: any;
  options: any = [
    { value: null, text: "Filter by region", disabled: true },
    { value: "All", text: "All", disabled: false },
  ];
  regionSelected = null;
  @Emit("change-region")
  changeRegion() {
    return this.regionSelected;
  }
  @Watch("regions", { immediate: true })
  getRegions() {
    this.regions.map((item: any) => {
      this.options.push({
        value: item,
        text: item,
        disabled: false,
      });
    });
  }
}
</script>
<style scoped lang="scss">
.form-select-body {
  position: relative;
  width: 170px;
  margin-left: 5px;
  @media only screen and (max-width: 568px){
    margin-left: 0;
    margin-right: 5px;
  }
  .form-select {
    height: 50px;
    border: none;
    width: 100%;
    font-size: 12px;
    background-color: var(--search-background);
    color: var(--text-color);
    box-shadow: 0px 2px 10px 0 rgba(0, 0, 0, 0.1);
    background-image: none;
    &:focus {
      border: none;
    }
  }
  .form-select-arrow {
    position: absolute;
    right: 15px;
    top: 20px;
  }
}
</style>
