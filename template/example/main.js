import Vue from "vue";
import App from "./App";

import router from "./router";

import plugin from "../src";

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  render: h => h(App)
});

console.log(`${plugin.name}: ${plugin.version}`);