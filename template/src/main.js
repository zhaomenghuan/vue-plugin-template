import Vue from 'vue'

import App from './App'
{{#router}}
import Router from 'vue-router'
{{/router}}

new Vue({
  el: '#app',
  {{#router}}
  router,
  {{/router}}
  render: h => h(App)
})