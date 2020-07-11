import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// Third-party
import Print from "vue-print-nb";
import VeeValidate from "vee-validate";
//Plugins
import HTMLControlsPlugin from "./plugins/HTMLControls.plugin";
import TemplatePlugin from "./plugins/Template.plugin";
import HelpersPlugin from "./plugins/Helpers.plugin";
import "./plugins/VeeValidation.plugin";

Vue.config.productionTip = false;
Vue.use(HTMLControlsPlugin);
Vue.use(TemplatePlugin);
Vue.use(HelpersPlugin);
Vue.use(VeeValidate);
Vue.use(Print);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");
