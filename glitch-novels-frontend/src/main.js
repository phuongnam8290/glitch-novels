import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "@/router";

import App from "./App.vue";

import "@/assets/fonts/metropolis/metropolis.css";
import "@/assets/fonts/font-awesome/css/all.css";
import "@/assets/fonts/font-awesome/css/sharp-solid.css";
import "@/assets/css/global.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
