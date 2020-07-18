<template>
  <div>
    <div class="container">
      <div class="services-bar">
        <h1 class="my-4">活動介紹</h1>
        <!-- Services Section -->
        <div class="row" v-if="!select && mode == 1">
          <div class="col-lg-3 mb-3">
            <div class="card h-100" v-if="one.id">
              <h4 class="card-header">{{one.value}}</h4>
              <div class="card-img">
                <img class="img-fluid" style="height:262.38px;width:100%" src="home1.jpg" alt />
              </div>
              <div class="card-body">
                <p class="card-text">{{one.description}}</p>
              </div>
              <div class="card-footer">
                <a
                  href="javascript:void(0)"
                  class="btn btn-primary"
                  v-on:click="selectNewsType('免費型活動')"
                >詳細資料</a>
              </div>
            </div>
          </div>
          <div class="col-lg-3 mb-3">
            <div class="card h-100" v-if="two.id">
              <h4 class="card-header">{{two.value}}</h4>
              <div class="card-img">
                <img class="img-fluid" style="height:262.38px;width:100%" src="home1.jpg" alt />
              </div>
              <div class="card-body">
                <p class="card-text">{{two.description}}</p>
              </div>
              <div class="card-footer">
                <a
                  href="javascript:void(0)"
                  class="btn btn-primary"
                  v-on:click="selectNewsType('基本型商圈消費')"
                >詳細資料</a>
              </div>
            </div>
          </div>
          <div class="col-lg-3 mb-3">
            <div class="card h-100" v-if="three.id">
              <h4 class="card-header">{{three.value}}</h4>
              <div class="card-img">
                <img class="img-fluid" style="height:262.38px;width:100%" src="home2.jpg" alt />
              </div>
              <div class="card-body">
                <p class="card-text">{{three.description}}</p>
              </div>
              <div class="card-footer">
                <a
                  href="javascript:void(0)"
                  class="btn btn-primary"
                  v-on:click="selectNewsType('兩天一夜過夜型')"
                >詳細資料</a>
              </div>
            </div>
          </div>
          <div class="col-lg-3 mb-3">
            <div class="card h-100" v-if="four.id">
              <h4 class="card-header">{{four.value}}</h4>
              <div class="card-img">
                <img class="img-fluid" style="height:262.38px;width:100%" src="home3.jpg" alt />
              </div>
              <div class="card-body">
                <p class="card-text">{{four.description}}</p>
              </div>
              <div class="card-footer">
                <a
                  href="javascript:void(0)"
                  class="btn btn-primary"
                  v-on:click="selectNewsType('社區導覽')"
                >詳細資料</a>
              </div>
            </div>
          </div>
        </div>
        <div v-if="!select && mode == 2">
          <button class="btn btn-primary" style="margin-bottom:20px" v-on:click="mode=1">返回</button>
        </div>
        <div class="row" v-if="!select && mode == 2">
          <div class="col-lg-6 mb-6">
            <a
              href="javascript:void(0)"
              class="btn btn-primary"
              style="width:100%;margin-bottom:30px; font-size: 60px;"
              v-on:click="selectNewsType('兩天一夜過夜型(晴天)')"
            >晴天</a>
          </div>
          <div class="col-lg-6 mb-6">
            <a
              href="javascript:void(0)"
              class="btn btn-primary"
              style="width:100%;margin-bottom:30px; font-size: 60px;"
              v-on:click="selectNewsType('兩天一夜過夜型(雨天)')"
            >雨天</a>
          </div>
        </div>
        <!-- /.row -->

        <div v-if="select">
          <button class="btn btn-primary" style="margin-bottom:20px" v-on:click="select=null">返回</button>
        </div>

        <div class="row" v-if="select">
          <div
            class="col-lg-3 col-md-4 col-sm-6 portfolio-item"
            v-for="(item) in news"
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
                <!-- <img class="card-img-top" src="images/portfolio-big-02.jpg" alt /> -->
              </a>
              <div class="card-body">
                <h4 class="card-title">
                  <a :href="'./#/activityDetail/'+item.id">{{item.title}}</a>
                </h4>
                <p class="card-text">{{item.subtitle}}</p>
              </div>
            </div>
          </div>
        </div>

        <!--  -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import apiService from '../apiService';
export default {
  name: 'Activity',
  props: {},
  data() {
    return {
      one: {},
      two: {},
      three: {},
      four: {},
      newsType: [],
      mode: 1,
      select: null,
      news: [],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    selectNewsType(type) {
      // var newType;
      if (type == '兩天一夜過夜型') {
        this.mode = 2;
        return;
      } else this.select = this.newsType.find(x => x.name == type);

      apiService.getAllBytypeId(this.select.id).then(x => {
        this.news = x.data.filter(x=>x.isActive == true);
      });
    },
    transferImage(image) {
      console.log(image);
      var temp = JSON.parse(image);
      if (temp.length > 0) {
        return temp[0].url;
      } else {
        return 'images/portfolio-big-02.jpg';
      }
    },
    async getData() {
      // 免費型活動 基本型商圈消費 兩天一夜過夜型 社區導覽
      var result = await apiService.getallNewsType();
      this.newsType = result.data;

      var data = {
        key: [
          '前台.活動.欄位一',
          '前台.活動.欄位二',
          '前台.活動.欄位三',
          '前台.活動.欄位四',
        ],
      };
      apiService.getSettingKeys(data).then(x => {
        this.one = x.data.find(y => y.key == '前台.活動.欄位一');
        this.two = x.data.find(y => y.key == '前台.活動.欄位二');
        this.three = x.data.find(y => y.key == '前台.活動.欄位三');
        this.four = x.data.find(y => y.key == '前台.活動.欄位四');
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
