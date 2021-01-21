<template>
  <div>
    <div class="container" style="margin-top : 100px">
      <table id="cart" class="table table-hover table-condensed" v-if="dataApi.length > 0">
        <thead>
          <tr>
            <th style="width:50%">Sản phẩm</th>
            <th style="width:10%">Giá</th>
            <th style="width:8%">Số lượng</th>
            <th style="width:22%" class="text-center">Thành tiền</th>
            <th style="width:10%"></th>
          </tr>
        </thead>
        <tbody v-for="(pr, i) in dataApi" :key="i">
          <tr>
            <td data-th="Product">
              <div class="row">
                <div class="col-sm-2 hidden-xs"><img style="height : 100px" :src="`http://localhost:8000/${pr.product.Img}`"
                    alt="..." class="img-responsive" /></div>
                <div class="col-sm-10">
                  <h4>{{pr.product.Name}}</h4>
                </div>
              </div>
            </td>
            <td data-th="Price">{{pr.product.Price.toLocaleString(undefined, {minimumFractionDigits: 0,maximumFractionDigits: 0})}}</td>
            <td data-th="Quantity">
              <input type="number" class="form-control text-center" v-model="pr.product.quantity">
            </td>
            <td data-th="Subtotal" class="text-center">{{(pr.product.quantity? (pr.product.quantity * pr.product.Price) :(1 * pr.product.Price)).toLocaleString(undefined, {minimumFractionDigits: 0,maximumFractionDigits: 0})}} VNĐ</td>
            <td class="actions" data-th="">
              <button @click="deleteProductToCart(pr)" class="btn btn-danger btn-sm"><i
                  class="fa fa-trash-o">X</i></button>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td>
              <router-link tag="button" to="/products" class="btn btn-warning"><i class="fa fa-angle-left"></i> Continue
                Shopping</router-link>
            </td>
            <td colspan="2" class="hidden-xs"></td>
            <td class="hidden-xs text-center"><strong>Total: {{totalPrice?totalPrice:0}} VNĐ</strong></td>
            <td><a href="#" class="btn btn-success btn-block">Checkout <i class="fa fa-angle-right"></i></a></td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
  import {
    mapGetters,
    mapActions
  } from 'vuex';
  import jwt_decode from "jwt-decode"
  import api from '../service/api'
  export default {
    data() {
      return {
        dataApi: []
      }
    },
    computed: {
      ...mapGetters(['allCart', 'price']),
      totalPrice() {
        let prices = 0
        this.dataApi.forEach(el => {
          if(el.product){
            prices = prices + (el.product.Price * el.product.quantity)
          }
        })
        return prices
      }
    },
    async created() {
      await Promise.all([
        this.getCart()
      ])
    },
    methods: {
      ...mapActions(['deleteProductToCart']),
      getCart() {
        let userInfo = jwt_decode(localStorage.getItem('user'))
        if (!userInfo) {
          this.$router.push('/login')
        }
        api.get(`/getCartUser/${userInfo.sub._id}`).then((res) => {
          let data = res.data
          data.forEach(async (e)=> {
            e['product'] = (await api.get(`detail/${e.SanphamId}`)).data
          })
          this.dataApi = [...data]
          console.log(this.dataApi)
        }).catch(err => console.log(err))
      }
    },
  }
</script>

<style scoped>
  .table>tbody>tr>td,
  .table>tfoot>tr>td {
    vertical-align: middle;
  }

  @media screen and (max-width: 600px) {
    table#cart tbody td .form-control {
      width: 20%;
      display: inline !important;
    }

    .actions .btn {
      width: 36%;
      margin: 1.5em 0;
    }

    .actions .btn-info {
      float: left;
    }

    .actions .btn-danger {
      float: right;
    }

    table#cart thead {
      display: none;
    }

    table#cart tbody td {
      display: block;
      padding: .6rem;
      min-width: 320px;
    }

    table#cart tbody tr td:first-child {
      background: #333;
      color: #fff;
    }

    table#cart tbody td:before {
      content: attr(data-th);
      font-weight: bold;
      display: inline-block;
      width: 8rem;
    }

    table#cart tfoot td {
      display: block;
    }

    table#cart tfoot td .btn {
      display: block;
    }
  }
</style>