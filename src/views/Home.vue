<template>
  <div class="home">
    <Header />
    <div class="mainarea">
      <b-container>
        <div class="main_top">
          <b-row>
            <b-col xl="5" lg="5" md="6" sm="6" cols="12">
              <div class="search">
                <button type="button" @click="searchByCountry()">
                  <i class="fa fa-search"></i>
                </button>
                <input
                  type="text"
                  placeholder="search for a country"
                  v-model="searchText"
                  @keyup="checkEmpty()"
                  @keyup.enter="searchByCountry()"
                />
              </div>
            </b-col>
            <b-col xl="7" lg="7" md="6" sm="6" cols="12" class="d-flex main_top_right">
              <Regions
                :regions="regions"
                @change-region="changeRegion($event)"
              ></Regions>
              <Sort
                :countriesFilter="countriesFilter"
                @change-sort="changeSort($event)"
              ></Sort>
            </b-col>
          </b-row>
        </div>
        <div class="main_bottom">
          <div class="page_loader" v-if="loader">
            <span class="page_loader_spinner"></span>
          </div>
          <div v-if="errorMsg">
            {{ errorMsg }}
          </div>
          <b-row v-if="!loader && countriesFilter.length !== 0">
            <b-col
              xl="3"
              lg="4"
              md="4"
              sm="6"
              cols="12"
              v-for="(country, index) in countriesFilter"
              :key="index"
              @click="goToDetail(country.name)"
            >
              <div class="country_box">
                <div class="country_photo">
                  <img :src="country.flag" alt="" />
                </div>
                <div class="country_detail">
                  <h3 class="country_title mb-2">{{ country.name }}</h3>
                  <ul class="list-unstyled">
                    <li>
                      Population : <span>{{ country.populationSlash }}</span>
                    </li>
                    <li>
                      Region : <span>{{ country.region }}</span>
                    </li>
                    <li>
                      Capital : <span>{{ country.capital }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </b-col>
          </b-row>
        </div>
      </b-container>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import service from "@/services/generalService";
import Header from "@/components/Header.vue";
import Regions from "@/components/Regions.vue";
import Sort from "@/components/Sort.vue";
import { CountryDto } from "@/types/index";

@Component({
  components: {
    Header,
    Regions,
    Sort,
  },
})
export default class Home extends Vue {
  countries: CountryDto[] = [];
  regions: any = [];
  countriesFilter: any = [];
  loader = false;
  searchText = "";
  errorMsg = "";
  mounted() {
    if (localStorage.getItem("Countries")) {
      this.countries = JSON.parse(localStorage.getItem("Countries") || "[]");
      if (this.countries.length !== 0) {
        this.countries.map((item) => {
          item.populationSlash = String(item.population).replace(
            /(\d)(?=(\d\d\d)+(?!\d))/g,
            "$1,"
          );
        });
      }
      this.countriesFilter = this.countries;
      this.setRegions();
    } else {
      this.getAllCountries();
    }
  }
  getAllCountries() {
    this.loader = true;
    service
      .getMethod("all")
      .then((res: any) => {
        this.loader = false;
        this.countries = res;
        if (this.countries.length !== 0) {
          this.countries.map((item) => {
            item.populationSlash = String(item.population).replace(
              /(\d)(?=(\d\d\d)+(?!\d))/g,
              "$1,"
            );
          });
        }
        this.countriesFilter = this.countries;
        localStorage.setItem("Countries", JSON.stringify(this.countries));
        this.setRegions();
      })
      .catch((error: any) => {
        this.loader = false;
        this.errorMsg = error.response.data.message;
      });
  }
  setRegions() {
    this.countries.forEach((item) => {
      this.regions.push(item.region);
    });
    this.regions = [...new Set(this.regions)];
  }
  changeRegion(evt: string) {
    this.loader = true;
    if (evt === "All") {
      this.countriesFilter = this.countries;
    } else {
      this.countriesFilter = this.countries.filter(
        (item) => item.region === evt
      );
    }
    setTimeout(() => {
      this.loader = false;
    }, 100);
  }
  changeSort(evt: any) {
    this.loader = true;
    this.countriesFilter = evt;
    setTimeout(() => {
      this.loader = false;
    }, 100);
  }
  checkEmpty() {
    if (this.searchText === "") {
      this.countriesFilter = this.countries;
    }
  }
  searchByCountry() {
    this.errorMsg = "";
    if (this.searchText === "") {
      this.countriesFilter = this.countries;
    } else {
      this.loader = true;
      service
        .getMethod(`name/${this.searchText}?fullText=true`)
        .then((res: any) => {
          this.loader = false;
          this.countriesFilter = res;
          this.countriesFilter.map((item: any) => {
            item.populationSlash = String(item.population).replace(
              /(\d)(?=(\d\d\d)+(?!\d))/g,
              "$1,"
            );
          });
        })
        .catch((error: any) => {
          this.loader = false;
          this.errorMsg = error.response.data.message;
          this.countriesFilter = [];
        });
    }
  }
  goToDetail(name: string) {
    this.$router.push(`country/${name}/detail`);
  }
}
</script>
<style scoped lang="scss">
.main_top {
  padding: 20px 0;
  .main_top_right{
    flex-direction: row-reverse;
    @media only screen and (max-width: 568px){
      flex-direction: row;
    }
  }
}
.main_bottom {
  .row {
    margin: 0 -20px;
    @media only screen and (max-width: 568px) {
      margin: 0;
    }
    > div {
      padding: 0 20px;
      @media only screen and (max-width: 568px) {
        padding: 0;
      }
    }
  }
}
.country_box {
  background: var(--elements-background);
  border-radius: 5px;
  margin: 0 0 30px;
  box-shadow: 0px 2px 10px 0 rgba(0, 0, 0, 0.1);
  overflow: hidden;
  .country_photo {
    aspect-ratio: 5 / 3;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .country_detail {
    min-height: 150px;
    padding: 20px;
    .country_title {
      font-family: "NunitoSans_ExtraBold";
      font-size: 14px;
      cursor: pointer;
    }

    ul {
      li {
        font-family: "NunitoSans_SemiBold";
        font-size: 13px;
        > span {
          font-family: "NunitoSans_Light";
        }
      }
    }
  }
}
.search {
  position: relative;
  @media only screen and (max-width: 568px) {
    margin-bottom: 10px;
  }
  button {
    width: 50px;
    height: 50px;
    border: none;
    background-color: transparent;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 10;
    color: var(--text-color);
  }
  input {
    border: none;
    background: var(--search-background);
    color: var(--text-color);
    height: 50px;
    border-radius: 5px;
    width: 100%;
    padding: 0 15px 0 60px;
    box-shadow: 0px 2px 10px 0 rgba(0, 0, 0, 0.1);
  }
}
/*.form-select-body{*/
/*  position: relative;*/
/*  width: 170px;*/
/*  margin-left: auto;*/
/*  @media only screen and (max-width: 568px) {*/
/*    margin-right: auto;*/
/*    margin-left: 0;*/
/*  }*/
/*  .form-select {*/
/*    height: 50px;*/
/*    border: none;*/
/*    width: 100%;*/
/*    font-size: 12px;*/
/*    background-color: var(--search-background);*/
/*    color: var(--text-color);*/
/*    box-shadow: 0px 2px 10px 0 rgba(0, 0, 0, 0.1);*/
/*    background-image: none;*/
/*    &:focus {*/
/*      border: none;*/
/*      box-shadow: none;*/
/*    }*/
/*  }*/
/*  .form-select-arrow{*/
/*    position: absolute;*/
/*    right: 15px;*/
/*    top: 20px;*/
/*  }*/
/*}*/
</style>
