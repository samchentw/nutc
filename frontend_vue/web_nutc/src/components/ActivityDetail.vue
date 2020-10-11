<template>
  <div v-if="news" style="margin-bottom:20px">
    <h2 style="text-align: center;margin-bottom:10px">{{ news.title }}</h2>

    <p style="text-align: center;margin-bottom:10px">{{ news.subtitle }}</p>
    <div
      class="container card"
      style="margin-bottom:10px"
      v-for="item in news.newsDetailsSortBySeq"
      :key="item.id"
    >
      <!-- Heading Row -->
      <div class="row align-items-center my-5">
        <div class="col-lg-7">
          <img
            class="img-fluid rounded mb-4 mb-lg-0"
            :src="item.ImageUrl"
            alt
          />
        </div>
        <!-- /.col-lg-8 -->
        <div class="col-lg-5">
          <h3 class="font-weight-light">{{ item.subtitle }}</h3>
          <p style="white-space: pre-line; ">{{ item.description }}</p>

          <span v-if="token && news.isAvalibleAddTravel">
            <button
              v-if="checkUserNews(item.id)"
              class="btn btn-info"
              v-on:click="add(item.id)"
            >
              加入行程
            </button>
            <button
              v-if="!checkUserNews(item.id)"
              class="btn btn-danger"
              v-on:click="remove(item.id)"
            >
              移除行程
            </button>
          </span>

          <!-- <p>{{shop.remark}}</p> -->
        </div>
        <!-- /.col-md-4 -->
      </div>
      <!-- /.row -->
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import axios from 'axios';
import Swal from 'sweetalert2';
import apiService from '../apiService';
import messageService from '../messageService';
export default {
  name: 'ActivityDetail',
  props: {},
  data() {
    return {
      news: null,
      token: '',
      selectDay:new Date(),
      userNewsDetails: [],
    };
  },
  created() {
    // date
    this.init();
    this.token = apiService.getToken();
  },
  watch:{
    
  },
  methods: {
    checkUserNews(detailId) {
      let check = this.userNewsDetails.find(x => x.newsDetailId == detailId);
      return !check;
    },
    add(newDetailId) {
      var input = {
        newsId: this.news.id,
        isComplete: false,
        newsDetailId: newDetailId,
        date: this.selectDay,
      };
      apiService
        .addorUpdateNews(input)
        .then(
          x => {
            messageService.success('加入成功！');
            this.init();
          }
        )
        .catch(error => {
           messageService.error(error.response.data.errorResponse.result);
        });
    },
    remove(newDetailId) {
      apiService.deleteConsumerNews(newDetailId, this.selectDay).then(x => {
        messageService.success('移除成功！');
        this.init();
      });
    },
    init() {
      this.selectDay = moment(this.$route.query.date).format('YYYY-MM-DD HH:mm:ss')
      var id = this.$route.params.id;
      apiService.getNewsById(id).then(x => {
        this.news = x.data;
        if (this.token) {
          apiService.oneNewsByUser(this.news.id,this.selectDay).then(y => {
            this.userNewsDetails = y.data;
          });
        }
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
