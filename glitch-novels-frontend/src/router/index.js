import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import TitlesView from "@/views/TitlesView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/titles",
    name: "Titles",
    component: TitlesView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return {
      top: 0,
      left: 0,
      behavior: "smooth",
    };
  },
});

export default router;
