<template>
  <div>
    <div class="card shadow mb-4">
      <div class="card-header py-3">訂購管理</div>
      <div class="card-body">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">購買人</th>
              <th scope="col">購買時間</th>
              <th scope="col">地址</th>

              <th scope="col">付款方式</th>
              <th scope="col">運送方式</th>
              <th scope="col">狀態</th>

              <th scope="col">詳細資料</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(data,index) in items" :key="data.id">
              <th scope="row">{{index+1}}</th>
              <td>{{data.userData.name}}</td>
              <td>{{data.createTime | dateformate}}</td>
              <td>{{data.address}}</td>

              <td>{{paymentEnum[data.payment]}}</td>
              <td>{{deliveryEnum[data.delivery]}}</td>
              <td>{{orderStateEnum[data.state]}}</td>

              <td>
                <a href="javascript:void(0)" v-on:click="open(modalShow,data)">詳細資料</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <b-modal v-model="modalShow" @ok="handleOk">
      <div v-if="select.id">
        <div>購買人:{{select.userData.name}}</div>
        <div>購買時間：{{select.createTime | dateformate}}</div>
        <div>送貨地址：{{select.address}}</div>
        <div>送貨方式：{{paymentEnum[select.payment]}}</div>
        <div>付款方式：{{deliveryEnum[select.delivery]}}</div>
        <div>
          狀態：{{orderStateEnum[select.state]}}
          <a v-on:click="change()" href="javascrip:void(0)">切換</a>
        </div>

        <div v-for="(item) in select.orderDetail" :key="item.id">
          <div>產品名稱： {{item.product.name}}，購買數量： {{item.count}}</div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import apiService from '../apiService';
import messageService from '../messageService';
import moment from 'moment';

export default {
  name: 'Order',
  props: {
    msg: String,
  },
  data() {
    return {
      items: [],
      modalShow: false,
      deliveryEnum: ['貨到付款', '信用卡'],
      paymentEnum: ['超商取貨', '寄送到府'],
      orderStateEnum: ['準備中', '運送中', '已送達', '未出貨','已取消'],
      select: {},
    };
  },
  created() {
    this.init();
  },
  filters: {
    dateformate: function(value) {
      return moment(value).format('YYYY-MM-DD HH:mm:ss');
    },
  },
  methods: {
    init() {
      apiService.getorders().then(x => {
        this.items = x.data;
      });
    },
    open(show, data) {
      this.modalShow = !show;
      this.select = data;
    },
    handleOk() {
      apiService.change(this.select.id,this.select.state).then(x=>{
        messageService.success("更改成功！");
      })
    },
    change() {
      this.select.state += 1;
      if( this.select.state >= this.orderStateEnum.length ){
        this.select.state = 0;
      }
      
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
