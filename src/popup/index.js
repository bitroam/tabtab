import Vue from "vue";
import AppComponent from "./App/App.vue";
import {Button, Cascader, Popover, Table, TableColumn, Image, Empty,Icon} from "element-ui";

Vue.use(Button);
Vue.use(Cascader);
Vue.use(Popover);
Vue.use(Table);
Vue.use(TableColumn);
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
