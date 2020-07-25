<template>
  <div>
    <div class="container mb-4">
      <div class="row">
        <h3>基本資料：</h3>
        <div class="card">
          <div class="card-body">
            <form>
              <div class="form-row">
                <div class="form-group">
                  <label for="inputAddress2">選擇希望到貨日：</label>
                  <b-form-datepicker v-model="time" locale="cn"></b-form-datepicker>
                </div>

                <div class="form-group">
                  <b-form-group label="付款方式：">
                    <b-form-radio-group
                      id="radio-group-1"
                      v-model="select"
                      :options="options"
                      name="radio-options"
                    ></b-form-radio-group>
                  </b-form-group>
                </div>

                <div class="form-group">
                  <label for="inputAddress">地址</label>
                  <input type="text" v-model="address" class="form-control" id="inputAddress" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="container mb-4">
      <div class="row">
        <h3>購物車：</h3>
        <div class="col-12">
          <div class="table-responsive">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">產品名稱</th>
                  <th scope="col" class="text-center">數量</th>
                  <th scope="col" class="text-right">價格</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item) in selectItems" :key="item.id">
                  <td>
                    <img src="https://dummyimage.com/50x50/55595c/fff" />
                  </td>
                  <td>{{item.product.name}}</td>
                  <td class="text-center">{{item.count}}</td>
                  <td class="text-right">{{item.product.price}}</td>
                  <td class="text-right">
                    <button class="btn btn-sm btn-danger" v-on:click="remove(item.product.id)">
                      <i class="fa fa-trash"></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>小計</td>
                  <td class="text-right">{{sum}}</td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>運費</td>
                  <td class="text-right">100</td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <strong>總額</strong>
                  </td>
                  <td class="text-right">
                    <strong>{{sum+100}}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="col mb-2">
          <div class="row">
            <div class="col-sm-12 col-md-6">
              <a href="./#/product" class="btn btn-block btn-light">繼續購買</a>
            </div>
            <div class="col-sm-12 col-md-6 text-right">
              <button
                class="btn btn-lg btn-block btn-success text-uppercase"
                v-on:click="checkout()"
              >結帳</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import apiService from '../apiService';
import moment from 'moment';
import messageService from '../../../app_nutc/src/messageService';
export default {
  name: 'ShoppingCart',
  props: {},
  data() {
    return {
      selectItems: [],
      time: new Date(new Date().setDate(new Date().getDate() + 5)),
      select: null,
      address: '',
      sum: 0,
      options: [
        { text: '貨到付款', value: 0 },
        { text: '信用卡', value: 1 },
      ],
    };
  },
  created() {
    // this.change();
    this.init();
  },
  methods: {
    init() {
      this.sum = 0;
      this.selectItems = apiService.getUserProduct();
      this.selectItems.forEach(element => {
        this.sum += element.count * element.product.price;
      });
    //   console.log(this.selectItems);
    },
    remove(id) {
      this.selectItems = this.selectItems.filter(x => x.product.id != id);
      apiService.saveUserProduct(this.selectItems);
      this.init();
    },
    checkout() {
      if (this.address.length == 0) {
        messageService.error('請輸入地址！');
        return;
      }
      if (this.select == null) {
        messageService.error('請選擇付款方式！');
        return;
      }
      if(this.sum == 0){
          messageService.error("購物車無購買項目！")
          return;
      }
      var detail = apiService.getUserProduct();
      var orderDetail = [];
      detail.forEach(x => {
        var input = {
          productId: x.product.id,
          count: x.count,
        };
        orderDetail.push(input);
      });
      var order = {
        delivery: 1,
        payment: this.select,
        deliveryTime: this.time,
        address: this.address,
        orderDetail: orderDetail,
        usePoints: 0,
      };

      apiService.createOrder(order).then(x => {
        apiService.saveUserProduct([]);
        location.href = './#/';
        messageService.success('你的訂單已成立！').then(result => {});
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form-group {
  margin-right: 30px;
}
</style>
