<template>
  <div style="margin-top: 100px">
      <div class="container">
            <div class="title"><h2>Sản phẩm mới</h2></div>
            <hr>
            <div class="d-flex flex-wrap">
              <Product
                v-for="item in newProduct"
                :key="item._id"
                :item="item"
                style="border: 1px solid #e0e0e0"
              ></Product>
            </div>
            <hr>
            <div><h2>Tất cả sản phẩm</h2></div>
            <hr>
            <div class="d-flex flex-wrap">
              <Product
                v-for="item in allProduct"
                :key="item._id"
                :item="item"
                style="border: 1px solid #e0e0e0"
              ></Product>
            </div>
            <div class="clearfix"></div>
          </div>
  </div>
</template>

<script>
import Product from "../components/product";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    Product,
  },
  methods: {
    ...mapActions(["getProduct"]),
  },
  mounted() {
    this.getProduct();
  },
  computed: {
    ...mapGetters(["allProduct", "newProduct"]),
  },
};
</script>

<style scoped>
.left {
  background-color: cadetblue;
}

.boder {
  border: 1px solid;
  border-radius: 10px;
}
</style>
