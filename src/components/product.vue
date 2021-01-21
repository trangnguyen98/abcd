<template>
  <div class="col-sm-3 col-md-3 hidden-sm hidden-xs box-product-outer mb-5" style="margin-right : 80px">
    <div class="box-product">
      <div class="img-wrapper">
        <router-link :to="`product/detail/${item._id}`">
          <img style="height : 200px" alt="Product" :src="`http://localhost:8000/${item.Img}`" />
        </router-link>
        <div class="option">
          <a
            @click="addToCart"
            href="#"
            data-toggle="tooltip"
            data-placement="bottom"
            title=""
            data-original-title="Add to Cart"
            ><i class="ace-icon fa fa-shopping-cart"></i
          ></a>
          <a
            href="#"
            data-toggle="tooltip"
            data-placement="bottom"
            title=""
            data-original-title="Compare"
            ><i class="ace-icon fa fa-align-left"></i
          ></a>
          <a
            href="#"
            data-toggle="tooltip"
            data-placement="bottom"
            title=""
            data-original-title="Wishlist"
            ><i class="ace-icon fa fa-heart"></i
          ></a>
        </div>
      </div>
      <h6>
        <router-link to="/product/detail" tag="a"> {{ item.Name }}</router-link>
      </h6>
      <!-- định dạng sản phẩm giảm giá theo quality -->
      <div class="price" v-if="item.Quantity > 60">
        <div>
        <!-- định dạng giá sản phẩm ,, -->
          {{ (item.Price - (item.Price * 10) / 100).toLocaleString(undefined, {minimumFractionDigits: 0,maximumFractionDigits: 0}) }}
          <span class="price-down">-10%</span>
        </div>
        <span class="price-old">{{
          item.Price.toLocaleString(undefined, {minimumFractionDigits: 0,maximumFractionDigits: 0})
        }}</span>
      </div>
      <div class="price" v-else>
        <span>{{
          item.Price.toLocaleString(undefined, {minimumFractionDigits: 0,maximumFractionDigits: 0})
        }}</span>
      </div>
      <div class="rating">
        <i class="ace-icon fa fa-star"></i>
        <i class="ace-icon fa fa-star"></i>
        <i class="ace-icon fa fa-star"></i>
        <i class="ace-icon fa fa-star"></i>
        <i class="ace-icon fa fa-star-half-o"></i>
        <a href="#">(5 reviews)</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item"],
  methods: {
    addToCart(){
            this.$store.dispatch('addProductToCart', {
                product : this.item,
                quantity : 1
            })
            }
  },
};
</script>

<style lang="scss" scoped>
body {
  margin-top: 20px;
}
.box-product-outer {
  margin-bottom: 5px;
  padding-top: 15px;
  padding-bottom: 15px;
}
.box-product-outer:hover {
  outline: 1px solid #aaa;
  -webkit-box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
}
.tab-content .box-product-outer {
  margin-bottom: 0;
}
.box-product-slider-outer {
  padding: 10px;
}
.box-product .img-wrapper {
  position: relative;
  overflow: hidden;
}
.box-product .img-wrapper > :first-child {
  position: relative;
  display: block;
}
.box-product .img-wrapper > a > img {
  width: 100%;
}
.box-product .img-wrapper .tags {
  position: absolute;
  top: 0;
  right: 0;
  display: inline-block;
  overflow: visible;
  width: auto;
  height: auto;
  margin: 0;
  padding: 0;
  vertical-align: inherit;
  border-width: 0;
  background-color: transparent;
  direction: rtl;
}
.box-product .img-wrapper .tags-left {
  left: 0;
  direction: ltr;
}
.box-product .img-wrapper .tags > .label-tags {
  display: table;
  margin: 1px 0 0 0;
  text-align: left;
  opacity: 0.92;
  filter: alpha(opacity=92);
  direction: ltr;
}
.box-product .img-wrapper .tags > .label-tags:hover {
  opacity: 1;
  filter: alpha(opacity=100);
}
.box-product .img-wrapper .tags > .label-tags a:hover {
  text-decoration: none;
}
.box-product .img-wrapper > .option {
  position: absolute;
  top: auto;
  right: 0;
  bottom: -30px;
  left: 0;
  width: auto;
  height: 28px;
  -webkit-transition: all 0.2s ease;
  -o-transition: all 0.2s ease;
  transition: all 0.2s ease;
  text-align: center;
  vertical-align: middle;
  background-color: rgba(0, 0, 0, 0.55);
}
.box-product .img-wrapper .option > a {
  font-size: 18px;
  font-weight: normal;
  display: inline-block;
  padding: 0 4px;
  color: #fff;
}
.box-product .img-wrapper:hover > .option {
  top: auto;
  bottom: 0;
}
.box-product h6 a {
  line-height: 1.4;
}
.price {
  margin-bottom: 5px;
  color: #f44336;
}
.price .price-down {
  margin-left: 5px;
  padding: 2px 5px;
  color: #fff;
  background: #f44336;
}
.price-old {
  position: relative;
  display: inline-block;
  margin-right: 7px;
  color: #666;
}
.price-old:before {
  position: absolute;
  width: 100%;
  height: 60%;
  content: "";
  border-bottom: 1px solid #666;
}
.rating i {
  color: #fc0;
}
.product-sorting-bar {
  border: 1px solid #e5e5e5;
}
</style>
