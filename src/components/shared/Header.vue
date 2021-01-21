<template>
  <div>
    <div class="top">
      <b-navbar toggleable="lg" type="dark" variant="success">
        <b-navbar-brand to="/">Shop Online</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav >
            <b-nav-item to="/">Home</b-nav-item>
            <b-nav-item to="/products">Sản Phẩm</b-nav-item>
          </b-navbar-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-form class="mr-5">
              <b-form-input
                size="sm"
                class="mr-sm-2"
                placeholder="Nhập..."
              ></b-form-input>
              <b-button size="sm" class="my-2 my-sm-0" type="submit"
                >Tìm kiếm</b-button
              >
            </b-nav-form>
            <div class="text-center mt-3">
              <b-button variant="primary" to="/cart">
                <i class="fas fa-cart-plus"></i>
                <b-badge variant="light" class="ml-1">{{count}}</b-badge>
              </b-button>
            </div>
            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template #button-content>
                <em>
                  <b-avatar size="3rem">{{$store.state.user.username}}</b-avatar>
                </em>
              </template>
              <b-dropdown-item href="#">Profile</b-dropdown-item>
              <b-dropdown-item to="/login">Đăng nhập</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
  </div>
</template>

<script>
import {mapMutations, mapGetters} from 'vuex';
export default {
    methods: {
    ...mapMutations(['setUser', 'Cart'])
  },
  mounted(){
    this.setUser(),
    this.Cart()
  },
  computed:{
    ...mapGetters(['count'])
  }
};
</script>

<style scoped>
.top {
  position: fixed;
  top: 0;
  width: 100%;
  box-sizing: border-box;
  z-index: 1000;
}
</style>
