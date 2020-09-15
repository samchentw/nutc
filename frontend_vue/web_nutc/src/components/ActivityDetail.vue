<template>
  <div v-if="news" style="margin-bottom:20px">
    <h2 style="text-align: center;margin-bottom:10px">{{news.title}}</h2>

    <p style="text-align: center;margin-bottom:10px">{{news.subtitle}}</p>
    <div class="container card" style="margin-bottom:10px" v-for="(item) in news.newsDetailsSortBySeq" :key="item.id">
      <!-- Heading Row -->
      <div class="row align-items-center my-5">
        <div class="col-lg-7">
          <img class="img-fluid rounded mb-4 mb-lg-0" :src="item.ImageUrl" alt />
        </div>
        <!-- /.col-lg-8 -->
        <div class="col-lg-5">
          <h3 class="font-weight-light">{{item.subtitle}}</h3>
          <p style="white-space: pre-line; ">{{item.description}}</p>
          <!-- <p>{{shop.remark}}</p> -->
        </div>
        <!-- /.col-md-4 -->
      </div>
      <!-- /.row -->
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import apiService from '../apiService';
export default {
  name: 'ActivityDetail',
  props: {},
  data() {
    return {
      news: null,
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      var id = this.$route.params.id;
      apiService.getNewsById(id).then(x => {
        this.news = x.data;
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
