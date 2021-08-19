import Vue from "vue";
Vue.config.devtools = true
import AppComponent from "./App/App.vue";
import {Image, Empty, Icon} from "element-ui";

Vue.use(Image);
Vue.use(Empty);
Vue.use(Icon);
Vue.component("app-component", AppComponent);

new Vue({
  el: "#app",
  render: createElement => {
    return createElement(AppComponent);
  }
});
