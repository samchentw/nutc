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
                <div>
                  晴天：
                  <!--  -->

                  <!-- <div class="row">
                    <div
                      class="col-lg-3 col-md-4 col-sm-6 portfolio-item"
                      v-for="item in news"
                      :key="item.id"
                    >
                      <div class="card h-100">
                        <a href="#">
                          <img
                            class="card-img-top"
                            style="height:200px;width:100%"
                            :src="item.newsDetailsSortBySeq[0].ImageUrl"
                            alt
                          />
                        </a>
                        <div class="card-body">
                          <h4 class="card-title">
                            <a :href="'./#/activityDetail/' + item.id">{{
                              item.title
                            }}</a>
                          </h4>
                          <p class="card-text">{{ item.subtitle }}</p>

                          <span>
                            <button
                              class="btn btn-danger"
                              v-on:click="removeNews(item.id)"
                            >
                              移除行程
                            </button>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div> -->

                  <!--  -->
                </div>

                <hr />
                <div>
                  雨天：
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4 order-lg-1 text-center">
            <img
              src="user.png"
              style="height:150px"
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
export default {
  name: 'User',
  props: {},
  data() {
    return {
      user: {},
      orders: [],
      selectItem: {},
      news: [],
      isDetail: false,
      st: ['準備中', '運送中', '已送達', '未出貨'],
    };
  },
  created() {
    apiService.getUserinfo().then(x => {
      // console.log(x.data);
      this.user = x.data;
    });
    apiService.getOrdersByUser().then(x => {
      // console.log(x);
      this.orders = x.data;
    });
    this.refresh();
  },
  filters: {
    dateformate: function(value) {
      return moment(value).format('YYYY-MM-DD HH:mm:ss');
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
    removeNews(newsId) {
      apiService.deleteConsumerNews(newsId).then(x => {
        messageService.success('移除成功！');
        this.refresh();
      });
    },
    refresh() {
      apiService.getConsumerNews().then(x => {
        this.news = x.data;
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

