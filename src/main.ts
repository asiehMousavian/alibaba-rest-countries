import Vue from "vue";
import App from "./App.vue";
// import "./registerServiceWorker";
import router from "./router";
// import store from "./store";
import { BootstrapVue } from "bootstrap-vue";
import Meta from 'vue-meta';


Vue.use(BootstrapVue);
Vue.use(Meta, {
  keyName: 'metaInfo',
  attribute: 'data-vue-meta',
  ssrAttribute: 'data-vue-meta-ssr',
  tagIDKeyName: 'vmid'
});
import "./assets/styles/site.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "./assets/styles/fontawesome.min.css";
import "./assets/styles/solid.min.css";
import "./environment/environment";
// require("./validation/index");
// require('./directives/index')
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
