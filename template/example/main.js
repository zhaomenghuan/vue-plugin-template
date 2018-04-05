import Vue from "vue";
import App from "./App";

import router from "./router";

import plugin from "../src";

window.plugin = plugin;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  render: h => h(App)
});