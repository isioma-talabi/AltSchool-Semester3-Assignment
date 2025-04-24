import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import "./style.css";

// Import pages
import Home from "./pages/Home.vue";
import TodoDetails from "./pages/TodoDetails.vue";
import TestErrorBoundary from "./pages/TestErrorBoundary.vue";
import Error from "./pages/Error.vue";

// Create router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import("./components/Layout.vue"),
      children: [
        { path: "", component: Home },
        { path: "todos/:id", component: TodoDetails },
      ],
    },
    {
      path: "/test-error",
      component: TestErrorBoundary,
    },
    {
      path: "/:pathMatch(.*)*",
      component: Error,
    },
  ],
});

// Create app
createApp(App).use(router).mount("#app");
