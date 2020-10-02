<template>
  <div class="container-fluid">
    <h2 style="text-align: center;margin-bottom:10px" v-if="shopType==0">五行八祚</h2>

    <h2 style="text-align: center;margin-bottom:10px" v-if="shopType==1">百司官廚</h2>
    <div class="row">
      <div
        class="col-lg-3 col-md-4 col-sm-6 portfolio-item"
        v-for="(item) in showList"
        :key="item.id"
      >
        <div class="card h-100">
          <a href="#">
            <img
              class="card-img-top"
              style="height:200px;width:100%"
              :src="transferImage(item.shopImage)"
              alt
            />

            <!-- <img class="card-img-top" src="images/portfolio-big-02.jpg" alt /> -->
          </a>
          <div class="card-body">
            <h4 class="card-title">
              <a :href="'./#/shopDetail/'+item.id">{{item.name}}</a>
            </h4>
            <p class="card-text">{{item.remark | capitalize}}</p>
          </div>
        </div>
      </div>
    </div>

    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      @change="change()"
      align="center"
      prev-text="上一頁"
      next-text="下一頁"
    ></b-pagination>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import apiService from '../apiService';
export default {
  name: 'Shop',
  props: {},
  data() {
    return {
      items: [],
      rows: 1,
      perPage: 1,
      currentPage: 1,
      showList: [],
      shopType: 0,
    };
  },
  watch: {
    $route(to, from) {
      var route = to.path;
      this.shopType = route.split('/')[2];
      this.init();
    },
  },
  created() {
    this.shopType = this.$route.params.typeId;
    this.init();
  },
  filters: {
    capitalize: function(value) {
      if (!value) return '';
      if(value.length > 30) return value.substring(0,30)+"..."
      else value; 
    },
  },
  methods: {
    init() {
      apiService.getShopByType(this.shopType).then(x => {
        this.items = x.data.items;
        if (x.data.count < 8) {
          this.rows = 1;
        } else {
          this.rows = Math.ceil(x.data.count / 8);
        }
        this.change();
      });
    },
    async change() {
      await this.sleep(500);
      this.showList = [];
      var start = (this.currentPage - 1) * 8;
      for (var i = start; i < start + 8; i++) {
        if (!this.items[i]) break;
        this.showList.push(this.items[i]);
      }
    },
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    transferImage(image) {
      var temp = JSON.parse(image);
      if (temp.length > 0) {
        return temp[0].url;
      } else {
        return 'images/portfolio-big-02.jpg';
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
