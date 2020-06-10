<template>
  <div class="container-fluid">
    <h2 style="text-align: center;margin-bottom:10px">商家介紹</h2>

    <div class="row">
      <div
        class="col-lg-3 col-md-4 col-sm-6 portfolio-item"
        v-for="(item) in showList"
        :key="item.id"
      >
        <div class="card h-100">
          <a href="#">
            <img class="card-img-top" src="images/portfolio-big-02.jpg" alt />
          </a>
          <div class="card-body">
            <h4 class="card-title">
              <a href="#">{{item.name}}</a>
            </h4>
            <p class="card-text">{{item.remark}}</p>
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
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      apiService.getShopPage(0).then(x => {
        this.items = x.data.items;
        this.rows = x.data.count / 8;
        this.change();
      });
    },
    async change() {
      await this.sleep(500);
      this.showList = [];
      var start = (this.currentPage-1) * 8;
      // console.log(this.currentPage-1);
      for (var i = start; i < start + 8; i++) {
        this.showList.push(this.items[i]);
      }
    },
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
