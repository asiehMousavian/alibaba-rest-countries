<template>
  <div class="">
    <Header />
    <div class="mainarea">
      <b-container>
        <div class="main_top">
          <a class="back" @click="goBack()">
            <i class="fa fa-arrow-left-long" style="margin-right: 5px"></i>
            Back
          </a>
        </div>
        <div class="page_loader" v-if="loader">
          <span class="page_loader_spinner"></span>
        </div>
        <b-row v-else>
          <b-col xl="6" lg="6" md="6" sm="12" cols="12">
            <div class="country_photo">
              <img :src="country.flag" alt="" />
            </div>
          </b-col>
          <b-col xl="6" lg="6" md="6" sm="12" cols="12">
            <div class="country_detail">
              <h3 class="country_title mb-2 mt-3">{{ country.name }}</h3>
              <b-row>
                <b-col xl="6" lg="6" md="6" sm="12" cols="12">
                  <ul class="list-unstyled">
                    <li>
                      Native name :
                      <span>{{ country.nativeName }}</span>
                    </li>
                    <li>
                      Population :
                      <span>{{ country.populationSlash }}</span>
                    </li>
                    <li>
                      Region:
                      <span>{{ country.region }}</span>
                    </li>
                    <li>
                      Sub Region:
                      <span>{{ country.subregion }}</span>
                    </li>
                    <li>
                      Capital:
                      <span>{{ country.capital }}</span>
                    </li>
                  </ul>
                </b-col>
                <b-col xl="6" lg="6" md="6" sm="12" cols="12">
                  <ul class="list-unstyled">
                    <li>
                      Top Level Domain :
                      <span>{{ country.topLevelDomain[0] }}</span>
                    </li>
                    <li>
                      Currencies :
                      <span>{{ country.currencies[0].name }}</span>
                    </li>
                    <li>
                      <span
                        v-for="(lang, index) of country.languages"
                        :key="index"
                      >
                        {{ lang.name }} ,
                      </span>
                    </li>
                  </ul>
                </b-col>
              </b-row>
              <b-row class="mt-4">
                <b-col cols="12">
                  <ul class="list-unstyled">
                    <li>
                      Border Countries:
                      <i
                        class="border_c"
                        v-for="(border, index) of country.borders"
                        :key="index"
                      >
                        {{ border }}
                      </i>
                    </li>
                  </ul>
                </b-col>
              </b-row>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import service from "@/services/generalService";
import Header from "@/components/Header.vue";
import { CountryDto } from "@/types";

@Component({
  components: {
    Header,
  },
})
export default class CountryDetail extends Vue {
  country: CountryDto | undefined;
  loader = false;
  constructor() {
    super();
    this.country = {
      flag: "",
      name: "",
      population: 0,
      populationSlash: "",
      languages: [],
      topLevelDomain: [],
      borders: [],
      currencies: [
        {
          name: "",
        },
      ],
      subregion: "",
      region: "",
      capital: "",
    };
  }
  created() {
    if (this.$route.params["name"]) {
      const countryName = this.$route.params["name"];
      this.getCountryDetail(countryName);
    } else {
      //
    }
  }
  getCountryDetail(name: string) {
    if (localStorage.getItem("Countries")) {
      const countries = JSON.parse(localStorage.getItem("Countries") || "[]");
      if (countries.length !== 0) {
        this.country = countries.find((x: { name: string }) => x.name === name);
        if (this.country && this.country.population) {
          this.country.populationSlash = String(
            this.country.population
          ).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
        }
      }
    } else {
      this.getCountryInfo(name);
    }
  }
  getCountryInfo(name: string) {
    this.loader = true;
    service
      .getMethod(`name/${name}?fullText=true`)
      .then((res: any) => {
        this.loader = false;
        this.country = res[0];
        if (this.country && this.country.population) {
          this.country.populationSlash = String(
            this.country.population
          ).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
        }
      })
      .catch((error: any) => {
        this.loader = false;
        // this.errorMsg = error.response.data.message;
      });
  }
  goBack() {
    this.$router.push("/");
  }
}
</script>
<style scoped lang="scss">
.main_top {
  padding: 30px 0;
}
.back {
  background-color: var(--search-background);
  border-radius: 5px;
  height: 30px;
  display: inline-flex;
  align-items: center;
  padding: 0 30px;
  text-decoration: none;
  color: var(--text-color);
  box-shadow: 0px 2px 10px 0 rgba(0, 0, 0, 0.1);
}
.country_photo {
  aspect-ratio: 5 / 3;
  width: 100%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.country_detail {
  padding: 0 0 0 20px;
  .country_title {
    font-family: "NunitoSans_ExtraBold";
    font-size: 16px;
    @media only screen and (max-width: 568px) {
      font-size: 14px;
    }
  }
  ul {
    li {
      font-family: "NunitoSans_SemiBold";
      font-size: 14px;
      margin-bottom: 3px;
      @media only screen and (max-width: 568px) {
        font-size: 13px;
      }
      > span {
        font-family: "NunitoSans_Light";
      }
    }
  }
}
.border_c {
  font-style: normal;
  font-size: 13px;
  font-family: "NunitoSans_Light";
  box-shadow: 0px 2px 10px 0 rgba(0, 0, 0, 0.1);
  margin-left: 5px;
  margin-bottom: 5px;
  border-radius: 5px;
  padding: 0 5px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 80px;
  background-color: var(--search-background);
}
</style>
