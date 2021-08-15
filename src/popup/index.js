import Vue from "vue";
import AppComponent from "./App/App.vue";
import {Button} from "element-ui";

Vue.use(Button)
Vue.component("app-component", AppComponent);

new Vue({
  el: "#app",
  render: createElement => {
    return createElement(AppComponent);
  }
});
