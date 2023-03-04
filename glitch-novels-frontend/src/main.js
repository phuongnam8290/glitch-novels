import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "@/router";

import App from "./App.vue";

// Metropolis font
import "@/assets/fonts/metropolis/metropolis.css";

// Font Awesome 6 font
import "@/assets/fonts/font-awesome/css/all.css";
import "@/assets/fonts/font-awesome/css/sharp-solid.css";

// Animate.css
import "animate.css";

// Tailwind directives
import "@/assets/css/global.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
