import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Products from "@/views/Products.vue";
import ProductsList from "@/views/ProductList.vue";
import Login from "@/views/Login.vue";
import Details from "@/views/Details.vue";
import Cart from '@/views/Cart.vue';
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/products",
    component: Products
  },
  {
    path: "/category/:id",
    component: ProductsList,
    props(route) {
      const props = {
          ...route.params
      }
      props.id
      return props
    },
  },
  {
    path: "/product/detail/:id",
    component: Details,
    props(route) {
      const props = {
          ...route.params
      }
      props.id
      return props
    },
  },

  {
    path: "/login",
    component: Login
  },
  {
    path : '/cart',
    component : Cart
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
