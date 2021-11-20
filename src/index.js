import Vue from "vue";
import App from "./App.vue";
import { store } from "./store";
import { router } from "./router";

const init = () => {
  window.app = new Vue({
    store,
    router,
    created() {
      this.$store.dispatch("loadAtsList");
    },
    render: (h) => h(App),
  }).$mount("#app");
};

window.addEventListener("load", init);
