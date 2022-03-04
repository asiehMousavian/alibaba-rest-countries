<template>
  <div class="form-select-body">
    <b-form-select
      class="form-select"
      v-model="sortSelected"
      :options="options"
      @change="changeSort()"
    >
    </b-form-select>
    <i class="fa fa-angle-down form-select-arrow"></i>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Watch, Vue } from "vue-property-decorator";

@Component({})
export default class Sort extends Vue {
  @Prop() countriesFilter: any;
  options: any = [
    { value: null, text: "Sort by", disabled: true },
    { value: "None", text: "None", disabled: false },
    { value: "CountryName", text: "Country name", disabled: false },
    { value: "Population", text: "Population", disabled: false },
  ];
  sortSelected: any = null;
  @Emit("change-sort")
  changeSort() {
      if (this.sortSelected === 'Population') {
          this.countriesFilter.sort((a: any, b: any) => b.population - a.population);
      } else {
          this.countriesFilter.sort((a: any, b: any) => a.name.localeCompare(b.name));
      }
        return this.countriesFilter;
  }
}
</script>
<style scoped lang="scss">
.form-select-body {
  position: relative;
  width: 110px;
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
