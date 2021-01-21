<template>
  <div>
    <div class="container py-lg-5">
      <h3 class="hny-title mb-0 text-center">Shop With <span>Us</span></h3>
      <p class="mb-4 text-center">Handpicked Favourites just for you</p>
      <div class="welcome-grids row mt-5">
        <div class="col-lg-2 col-md-4 col-6 welcome-image" v-for="(cate,index) in category" :key="index">
          <div class="boxhny13">
            <a :href="`/category/${cate.Name}`">
              <img src="@/assets/images/grid1.jpg" class="img-fluid" alt="" />
              <div class="boxhny-content">
                <h3 class="title">{{cate.Name}}</h3>
              </div>
            </a>
          </div>

        </div>
      </div>

    </div>
    <section class="w3l-ecommerce-main">
      <!-- /products-->
      <div class="ecom-contenthny py-5">
        <div class="container py-lg-5">
          <h3 class="hny-title mb-0 text-center">Shop With <span>Us</span></h3>
          <p class="text-center">Handpicked Favourites just for you</p>
          <!-- /row-->
          <div class="ecom-products-grids row mt-lg-5 mt-3">
            <div class="col-lg-3 col-6 product-incfhny mt-4" v-for="p in product" :key="p._id">
              <div class="product-grid2 transmitv">
                <div class="product-image2">
                  <a :href="`/product/detail/${p._id}`">
                    <img class="pic-1 img-fluid" :src="`http://localhost:8000/${p.Img}`">
                  </a>
                  <ul class="social">
                    <li><a :href="`/product/detail/${p._id}`" data-tip="Quick View">
                        <v-icon>visibility</v-icon>
                      </a></li>

                    <li><a href="#" data-tip="Add to Cart">
                        <v-icon>add_shopping_cart</v-icon>
                      </a>
                    </li>
                  </ul>
                  <div class="transmitv single-item">
                    <form action="#" method="post">
                      <input type="hidden" name="cmd" value="_cart">
                      <input type="hidden" name="add" value="1">
                      <input type="hidden" name="transmitv_item" value="Women Maroon Top">
                      <input type="hidden" name="amount" value="899.99">
                      <button type="submit" class="transmitv-cart ptransmitv-cart add-to-cart">
                        Add to Cart
                      </button>
                    </form>
                  </div>
                </div>
                <div class="product-content">
                  <h3 class="title"><a :href="`/product/detail/${p._id}`">{{p.Name}}</a></h3>
                  <span class="price"><del>{{p.Price}}</del>{{p.Price}} đồng</span>
                </div>
              </div>
            </div>
          </div>
          <!-- //row-->
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import api from '../service/api';
  export default {
    data() {
      return {
        product: [],
        category: []
      }
    },
    created() {
      this.getlistProduct()
      this.getCategory()
    },
    methods: {
      getlistProduct() {
        // submit form to server/API here...
        api.get('/products').then(res => {
          this.product = res.data
          console.log(this.product)
        }).catch(err => console.log(err))
      },
      getCategory() {
        api.get('/category').then(res => {
          this.category = res.data
        })
      }
    },
  }
</script>

<style scoped>

</style>