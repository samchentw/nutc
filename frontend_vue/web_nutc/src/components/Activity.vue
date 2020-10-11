<template>
  <div>
    <div class="container-fluid">
      <div class="services-bar">
        <h1 class="my-4">平樂觀賦</h1>

        
        <div  v-if="
            nowtype == '兩天一夜過夜型(晴天)' ||
              nowtype == '兩天一夜過夜型(雨天)'">
          <b-form-datepicker
            v-model="selectDate"
            locale="cn"
          ></b-form-datepicker>

          <div>
            <div class="card">
              <div class="card-body">
                <h4 class="card-title mb-5">個人行程</h4>
                
                <div class="hori-timeline" dir="ltr">
                  <div  v-if="!day1">第一天目前無任何行程</div>
                  <ul class="list-inline events"  v-if="day1">
                    <li class="list-inline-item event-list">
                      <div class="px-4">
                        <div class="event-date bg-soft-primary text-primary">
                          第一天
                        </div>
                      </div>
                    </li>
                    <li
                      class="list-inline-item event-list"
                      v-for="item in day1"
                      :key="item.time"
                    >
                      <div class="px-4">
                        <div class="event-date bg-soft-success text-success">
                          {{ item.time | dateformate }}
                          <br />
                          <span style="color:black">{{
                            item.displayName
                          }}</span>
                          <!-- <span style="color:black">尚未安排行程</span> -->
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
                        </div>
                      </div>
                    </li>
                    <li
                      class="list-inline-item event-list"
                      v-for="item in day2"
                      :key="item.time"
                    >
                      <div class="px-4">
                        <div class="event-date bg-soft-success text-success">
                          {{ item.time | dateformate }}
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

                <div style="align-items: right;">
                  <button class="btn btn-info" v-on:click="saveDate()">儲存</button>
                </div>

              </div>
            </div>
          </div>
        </div>

        <!-- Services Section -->
        <div class="row" v-if="!select && mode == 1">
          <div class="col-lg-3 mb-3">
            <div class="card h-100" v-if="one.id">
              <h4 class="card-header">{{ one.value }}</h4>
              <div class="card-img">
                <img
                  class="img-fluid"
                  style="height:262.38px;width:100%"
                  src="S__8339588.jpg"
                  alt
                />
              </div>
              <div class="card-body">
                <p class="card-text">{{ one.description }}</p>
              </div>
              <div class="card-footer">
                <a
                  href="javascript:void(0)"
                  class="btn btn-primary"
                  v-on:click="selectNewsType('免費型活動')"
                  >詳細資料</a
                >
              </div>
            </div>
          </div>
          <div class="col-lg-3 mb-3">
            <div class="card h-100" v-if="two.id">
              <h4 class="card-header">{{ two.value }}</h4>
              <div class="card-img">
                <img
                  class="img-fluid"
                  style="height:262.38px;width:100%"
                  src="home1.jpg"
                  alt
                />
              </div>
              <div class="card-body">
                <p class="card-text">{{ two.description }}</p>
              </div>
              <div class="card-footer">
                <a
                  href="javascript:void(0)"
                  class="btn btn-primary"
                  v-on:click="selectNewsType('基本型商圈消費')"
                  >詳細資料</a
                >
              </div>
            </div>
          </div>
          <div class="col-lg-3 mb-3">
            <div class="card h-100" v-if="three.id">
              <h4 class="card-header">{{ three.value }}</h4>
              <div class="card-img">
                <img
                  class="img-fluid"
                  style="height:262.38px;width:100%"
                  src="home2.jpg"
                  alt
                />
              </div>
              <div class="card-body">
                <p class="card-text">{{ three.description }}</p>
              </div>
              <div class="card-footer">
                <a
                  href="javascript:void(0)"
                  class="btn btn-primary"
                  v-on:click="selectNewsType('兩天一夜過夜型')"
                  >詳細資料</a
                >
              </div>
            </div>
          </div>
          <div class="col-lg-3 mb-3">
            <div class="card h-100" v-if="four.id">
              <h4 class="card-header">{{ four.value }}</h4>
              <div class="card-img">
                <img
                  class="img-fluid"
                  style="height:262.38px;width:100%"
                  src="home3.jpg"
                  alt
                />
              </div>
              <div class="card-body">
                <p class="card-text">{{ four.description }}</p>
              </div>
              <div class="card-footer">
                <a
                  href="javascript:void(0)"
                  class="btn btn-primary"
                  v-on:click="selectNewsType('社區導覽')"
                  >詳細資料</a
                >
              </div>
            </div>
          </div>
        </div>
        <div v-if="!select && mode == 2">
          <!-- <button class="btn btn-primary" style="margin-bottom:20px" v-on:click="mode=1">返回</button> -->
          <a
            class="btn btn-primary"
            style="margin-bottom:20px;margin-top:20px;"
            href="./#/activity"
            >返回</a
          >
        </div>
        <div class="row" v-if="!select && mode == 2">
          <div class="col-lg-3 mb-3">
            <div class="card h-100">
              <h4 class="card-header">晴天</h4>
              <div class="card-img">
                <img
                  class="img-fluid"
                  style="height:262.38px;width:100%"
                  src="images/鹿港天后宮.jpg"
                  alt
                />
              </div>
              <div class="card-body">
                <p class="card-text"></p>
              </div>
              <div class="card-footer">
                <a
                  href="javascript:void(0)"
                  class="btn btn-primary"
                  v-on:click="selectNewsType('兩天一夜過夜型(晴天)')"
                  >詳細資料</a
                >
              </div>
            </div>
          </div>
          <div class="col-lg-3 mb-3">
            <div class="card h-100">
              <h4 class="card-header">雨天</h4>
              <div class="card-img">
                <img
                  class="img-fluid"
                  style="height:262.38px;width:100%"
                  src="images/鹿港天后宮.jpg"
                  alt
                />
              </div>
              <div class="card-body">
                <p class="card-text"></p>
              </div>
              <div class="card-footer">
                <a
                  href="javascript:void(0)"
                  class="btn btn-primary"
                  v-on:click="selectNewsType('兩天一夜過夜型(雨天)')"
                  >詳細資料</a
                >
              </div>
            </div>
          </div>
        </div>
        <!-- /.row -->

        <div v-if="select">
          <a
            class="btn btn-primary"
            style="margin-bottom:20px;margin-top:20px;"
            v-if="mode == 2"
            href="./#/activity?type=兩天一夜過夜型"
            >返回</a
          >
          <a
            class="btn btn-primary"
            style="margin-bottom:20px;margin-top:20px;"
            v-if="mode == 1"
            href="./#/activity"
            >返回</a
          >
        </div>

        <div class="row" v-if="select">
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
                <!-- <img class="card-img-top" src="images/portfolio-big-02.jpg" alt /> -->
              </a>
              <div class="card-body">
                <h4 class="card-title">
                  <a
                    :href="
                      './#/activityDetail/' + item.id + '?date=' + selectDate
                    "
                    >{{ item.title }}</a
                  >
                </h4>
                <p class="card-text">{{ item.subtitle }}</p>
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
import messageService from '../messageService';
import apiService from '../apiService';
import moment from 'moment';
export default {
  name: 'Activity',
  props: {},
  data() {
    return {
      one: {},
      two: {},
      selectDate: new Date(),
      three: {},
      four: {},
      newsType: [],
      nowtype: '',
      mode: 1,
      select: null,
      news: [],
      userNews: null,
      keys: [],
      day1: [],
      day2: [],
      type:null,
    };
  },
  watch: {
    $route(to, from) {
      let type = this.$route.query.type;
      if (type) {
        this.selectNewsType_new(type);
      } else {
        this.mode = 1;
        this.select = null;
      }
    },
    selectDate(newVal, oldVal) {
      this.$router.replace({ name: "", query: {type: this.$route.query.type,date:newVal} })
      this.refresh();
    },
  },
  async created() {
    var temp=this.$route.query.date;
    if(temp!=undefined)this.selectDate = temp;
     
  
    await this.getData();
    this.init();
    var type = this.$route.query.type;
    if (type) {
      this.selectNewsType_new(type);
    } else {
      this.mode = 1;
      this.select = null;
    }
  },
  filters: {
    dateformate: function(value) {
      return moment(value).format('HH:mm');
    },
  },
  methods: {
    init() {
      var token = apiService.getToken();
      if (token) {
        this.refresh();
      }
    },
    selectNewsType_new(type) {
      this.nowtype = type;
      if (type == '兩天一夜過夜型') {
        this.mode = 2;
        this.select = null;
        return;
      } else this.select = this.newsType.find(x => x.name == type);
      apiService.getAllBytypeId(this.select.id).then(x => {
        this.news = x.data.filter(x => x.isActive == true);
      });
    },
    selectNewsType(type) {
      location.href = './#/activity?type=' + type;
    },
    transferImage(image) {
      var temp = JSON.parse(image);
      if (temp.length > 0) {
        return temp[0].url;
      } else {
        return 'images/portfolio-big-02.jpg';
      }
    },
    async getData() {
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
    refresh() {
      this.day1 = [];
      this.day2 = [];
      apiService.getConsumerNews(new Date(this.selectDate).toLocaleDateString()).then(x => {
        this.userNews = x.data;
        this.keys = Object.keys(this.userNews);
        this.day1 = this.userNews[this.keys[0]];
        this.day2 = this.userNews[this.keys[1]];
      });
    },
    saveDate(){
      apiService.putConsumerDate(this.selectDate).then(x=>{
        messageService.success("儲存成功！");
      });
    }
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
    width: 12%;
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
