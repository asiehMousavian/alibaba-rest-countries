import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import CountryDetail from "../views/CountryDetail.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/country/:name/detail",
    name: "CountryDetail",
    component: CountryDetail
  },
  {
    path: '*',
    redirect: '/'
  }
];

const router = new VueRouter({
  routes,
});

export default router;
