import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import NovelsView from "@/views/NovelsView.vue";
import DetailsView from "@/views/DetailsView.vue";
import ReaderView from "@/views/ReaderView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/novels",
    name: "novels",
    component: NovelsView,
  },
  {
    path: "/novel/:id",
    name: "details",
    component: DetailsView,
  },
  {
    path: "/reader/:id",
    name: "reader",
    component: ReaderView,
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
