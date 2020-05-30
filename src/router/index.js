import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "../views/Layout.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Layout,
  },
  {
    path: "/resume/add",
    component: () => import("../views/AddUpdateResume.vue"),
  },
  {
    path: "/resume/edit/:id",
    component: () => import("../views/AddUpdateResume.vue"),
  },
  {
    path: "*",
    component: () => import("../views/error/404.vue"),
  },
];

const router = new VueRouter({
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes,
});

export default router;
