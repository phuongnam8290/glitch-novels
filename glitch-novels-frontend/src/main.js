import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "@/router";

import App from "./App.vue";

// import "@/index.css";
import "@/assets/fonts/proxima-nova/proxima-nova-font.css";
import "@/assets/fonts/font-awesome/css/all.css";
import "@/assets/css/global.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
