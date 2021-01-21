import Vue from "vue";
import Vuex from "vuex";
import api from "../service/api";
import router from '../router/index'
import decode from 'jwt-decode';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    detail : [],
    user : '',
    cart : []
  },
  mutations: {
    async Cart(state){
      return state.cart = (await api.get(`getCart/${state.user._id}`)).data
    },
    setUser(state){
      return state.user = decode(localStorage.user).sub
    },
    async GET_PRODUCT(state) {
      state.products = (await api.get("Products")).data;
    },
    async DETAIL(state, id){
      state.detail = (await api.get(`Detail/${id}`)).data
    },
    addToCart(state, {product, quantity}){
      let productInCart = state.cart.find(item => item.product._id === product._id)
      if(productInCart){
        productInCart.quantity += quantity
        return
      }
      state.cart.push({product, quantity})
    },
    deleteProductToCart(state, product){
      return state.cart = state.cart.filter(item => item.product._id !== product.SanphamId)
    },
  },
  actions: {
    getProduct({ commit }) {
      commit("GET_PRODUCT");
    },
    getDetail({commit}, id){
      commit('DETAIL', id)
    },
    async addProductToCart({commit, state}, {product, quantity}){
      commit('addToCart', {product, quantity})
      await api.put(`cart/${state.user._id}`, state.cart)
      return router.push('/Products')
    },
    async deleteProductToCart({commit, state}, product){
      commit('deleteProductToCart', product)
      await api.put(`cart/${state.user._id}`, state.cart)
    },
  },
  getters: {
    allProduct(state) {
      return state.products;
    },
    newProduct(state){
      let i = state.products.length
      return state.products.slice(i - 8 , i)
    },
    detail(state){
      return state.detail
    },
    count(state){
      return state.cart.length
    },
    allCart(state){
      return state.cart
    },
    price(state){
      return state.cart.reduce((a, b) => a + (b.product.Price * b.quantity), 0)
    }
  }
});
