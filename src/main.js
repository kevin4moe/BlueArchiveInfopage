import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import "./assets/tailwind.css";
import "./registerServiceWorker";

createApp(App).use(store).mount("#app");
