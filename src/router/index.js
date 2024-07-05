import { createRouter, createWebHistory } from "vue-router";
import Payrolls from "../views/PayrollsView.vue";

const routes = [
  {
    path: "/",
    name: "Payrolls",
    component: Payrolls,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
