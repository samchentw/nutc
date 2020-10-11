<template>
  <div>
    <div class="card shadow mb-4">
      <div class="container">
        <div class="row my-2" v-if="!isDetail">
          <div class="col-lg-8 order-lg-2">
            <ul class="nav nav-tabs">
              <li class="nav-item">
                <a
                  href
                  data-target="#edit"
                  data-toggle="tab"
                  class="nav-link active"
                  >個人資料</a
                >
              </li>
              <li class="nav-item">
                <a
                  href
                  data-target="#messages"
                  data-toggle="tab"
                  class="nav-link"
                  >購買記錄</a
                >
              </li>

              <li class="nav-item">
                <a
                  href
                  data-target="#activity"
                  data-toggle="tab"
                  class="nav-link"
                  >活動</a
                >
              </li>
            </ul>
            <div class="tab-content py-4">
              <div class="tab-pane" id="messages">
                <div v-if="orders.length == 0">
                  目前無資料
                </div>
                <table class="table table-hover table-striped">
                  <tbody>
                    <tr v-for="item in orders" :key="item.id">
                      <td>
                        <a
                          href="javascript:void(0)"
                          class="float-right font-weight-bold"
                          v-on:click="show(item)"
                          >詳細資料</a
                        >
                        購買時間：{{ item.createTime | dateformate }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="tab-pane active" id="edit" v-if="user.id">
                <form role="form">
                  <div class="form-group row">
                    <label class="col-lg-3 col-form-label form-control-label"
                      >帳號</label
                    >
                    <div class="col-lg-9">
                      <input
                        class="form-control"
                        v-model="user.account"
                        type="text"
                        value="Jane"
                      />
                    </div>
                  </div>

                  <div class="form-group row">
                    <label class="col-lg-3 col-form-label form-control-label"
                      >電子信箱</label
                    >
                    <div class="col-lg-9">
                      <input
                        class="form-control"
                        v-model="user.userinfo.email"
                        type="email"
                        value="email@gmail.com"
                      />
                    </div>
                  </div>

                  <div class="form-group row">
                    <label class="col-lg-3 col-form-label form-control-label"
                      >地址</label
                    >
                    <div class="col-lg-9">
                      <input
                        class="form-control"
                        v-model="user.userinfo.address"
                        type="text"
                        value
                        placeholder="Street"
                      />
                    </div>
                  </div>

                  <div class="form-group row">
                    <label class="col-lg-3 col-form-label form-control-label"
                      >姓名</label
                    >
                    <div class="col-lg-9">
                      <input
                        class="form-control"
                        v-model="user.userinfo.name"
                        type="text"
                        value="janeuser"
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label class="col-lg-3 col-form-label form-control-label"
                      >密碼</label
                    >
                    <div class="col-lg-9">
                      <input class="form-control" type="password" value />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label class="col-lg-3 col-form-label form-control-label"
                      >確認密碼</label
                    >
                    <div class="col-lg-9">
                      <input class="form-control" type="password" value />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label
                      class="col-lg-3 col-form-label form-control-label"
                    ></label>
                    <div class="col-lg-9">
                      <!-- <input type="button" class="btn btn-primary" value="儲存" /> -->
                    </div>
                  </div>
                </form>
              </div>

              <div class="tab-pane" id="activity">
               <!--  -->

        
            <div v-if="!selectDate">目前無任何行程</div>
            <div class="card" v-if="selectDate">
              <div class="card-body">
                <h4 class="card-title mb-5">個人行程</h4>
                
                <div class="hori-timeline" dir="ltr">
                  <div  v-if="!day1">第一天目前無任何行程</div>
                  <ul class="list-inline events"  v-if="day1">
                    <li class="list-inline-item event-list">
                      <div class="px-4">
                        <div class="event-date bg-soft-primary text-primary">
                          第一天<br>
                            {{selectDate | dateformateForDay}}
                        </div>
                      
                      </div>
                    </li>
                    <li
                      class="list-inline-item event-list"
                      v-for="item in day1"
                      :key="item.time"
                    >
                      <div class="px-4">
                        <div class="event-date bg-soft-success text-success"
                         v-bind:class="{ 'event-date bg-soft-success text-success': !item.isExpired, 'event-date bg-soft-danger text-danger': item.isExpired }">
                          {{ item.time | dateformateForHHMM }}
                          <br />
                          <span style="color:black">{{
                            item.displayName
                          }}</span>
                        </div>
                      </div>
                    </li>

                    <li class="list-inline-item event-list">
                      <div class="px-4">
                        <div class="event-date bg-soft-danger text-danger">
                          結束
                        </div>
                      </div>
                    </li>
                  </ul>

                <div  v-if="!day2">第二天目前無任何行程</div>
                  <ul class="list-inline events"  v-if="day2">
                    <li class="list-inline-item event-list">
                      <div class="px-4">
                        <div class="event-date bg-soft-primary text-primary">
                          第二天
                          <br>
                          {{ano_selectDate | dateformateForDay}}
                        </div>
                      </div>
                    </li>
                    <li
                      class="list-inline-item event-list"
                      v-for="item in day2"
                      :key="item.time"
                    >
                      <div class="px-4">
                        <div class="event-date bg-soft-success text-success"
                         v-bind:class="{ 'event-date bg-soft-success text-success': !item.isExpired, 'event-date bg-soft-danger text-danger': item.isExpired }">
                          {{ item.time | dateformateForHHMM }}
                          <br />
                          <span style="color:black">{{
                            item.displayName
                          }}</span>
                        </div>
                      </div>
                    </li>

                    <li class="list-inline-item event-list">
                      <div class="px-4">
                        <div class="event-date bg-soft-danger text-danger">
                          結束
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
         

               <!--  -->

              </div>
            </div>
          </div>
          <div class="col-lg-4 order-lg-1 text-center">
            <img
              src="user.png"
              style="height:150px;margin-top:30px;"
              class="mx-auto img-fluid img-circle d-block"
              alt="avatar"
            />
          </div>
        </div>

        <div
          class="row"
          v-if="isDetail"
          style="padding-top:20px;margin-bottom:30px"
        >
          <div class="col-lg-4 order-lg-1 text-left">
            <div>
              <button
                v-on:click="back()"
                type="button"
                style="margin-bottom:20px"
                class="btn btn-primary"
              >
                返回
              </button>
              <div>地址：{{ selectItem.address }}</div>

              <div>狀態: {{ st[selectItem.state] }}</div>
              <div>總額: {{ selectItem.total }}</div>
            </div>
          </div>
          <div class="col-lg-8 order-lg-2">
            <div class="tab-pane" id="messages">
              <table class="table table-hover table-striped">
                <thead>
                  <tr>
                    <!-- <th scope="col">#</th> -->
                    <th scope="col">產品名稱</th>
                    <th scope="col">數量</th>
                    <th scope="col">價格</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in selectItem.orderDetail" :key="item.id">
                    <td>{{ item.product.name }}</td>
                    <td>{{ item.count }}</td>
                    <td>{{ item.product.price }}</td>
                  </tr>
                </tbody>
              </table>
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
import messageService from '../messageService';
import moment from 'moment';
import apiService from '../apiService';
import * as _ from 'lodash';
export default {
  name: 'User',
  props: {},
  data() {
    return {
      user: {},
      orders: [],
      selectItem: {},
      news: {},
      newsKey: [],
      isDetail: false,
      st: ['準備中', '運送中', '已送達', '未出貨'],
      day1:[],
      day2:[],
      selectDate:null,
      ano_selectDate:new Date()
    };
  },
  created() {
    apiService.getUserinfo().then(x => {
      this.user = x.data;
    });
    apiService.getConsumerInfo().then(x=>{
      this.selectDate = x.data.selectDate
      this.refresh();
    });
    apiService.getOrdersByUser().then(x => {
      this.orders = x.data;
    });
  },
  filters: {
    dateformate: function(value) {
      return moment(value).format('YYYY-MM-DD HH:mm:ss');
    },
     dateformateForDay: function(value) {
      return moment(value).format('YYYY-MM-DD');
    },
    dateformateForHHMM: function(value) {
      return moment(value).format('HH:mm');
    },
  },
  methods: {
    show(item) {
      this.selectItem = item;
      this.isDetail = true;
    },
    back() {
      this.selectItem = {};
      this.isDetail = false;
    },
    refresh(){
        if(!this.selectDate) return;
        this.ano_selectDate = new Date(this.selectDate);
        this.ano_selectDate.setDate(this.ano_selectDate.getDate() + 1);
       apiService.getConsumerNews(new Date(this.selectDate).toLocaleDateString()).then(x => {
        this.userNews = x.data;
        this.keys = Object.keys(this.userNews);
        this.day1 = this.userNews[this.keys[0]];
        this.day2 = this.userNews[this.keys[1]];
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hori-timeline .events {
  border-top: 1px solid #e9ecef;
}
.hori-timeline .events .event-list {
  display: block;
  position: relative;
  text-align: center;
  padding-top: 70px;
  margin-right: 0;
}
.hori-timeline .events .event-list:before {
  content: '';
  position: absolute;
  height: 36px;
  border-right: 2px dashed #dee2e6;
  top: 0;
}
.hori-timeline .events .event-list .event-date {
  position: absolute;
  top: 38px;
  left: 0;
  right: 0;
  width: 105px;
  margin: 0 auto;
  border-radius: 4px;
  padding: 2px 4px;
}
@media (min-width: 1140px) {
  .hori-timeline .events .event-list {
    display: inline-block;
    width: 24%;
    padding-top: 60px;
  }
  .hori-timeline .events .event-list .event-date {
    top: -12px;
  }
}
.bg-soft-primary {
  background-color: rgba(64, 144, 203, 0.3) !important;
}
.bg-soft-success {
  background-color: rgba(71, 189, 154, 0.3) !important;
}
.bg-soft-danger {
  background-color: rgba(231, 76, 94, 0.3) !important;
}
.bg-soft-warning {
  background-color: rgba(249, 213, 112, 0.3) !important;
}
.card {
  border: none;
  margin-bottom: 24px;
  -webkit-box-shadow: 0 0 13px 0 rgba(236, 236, 241, 0.44);
  box-shadow: 0 0 13px 0 rgba(236, 236, 241, 0.44);
}
</style>

