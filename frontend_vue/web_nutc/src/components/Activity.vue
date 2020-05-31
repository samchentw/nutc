<template>
<div>
    <div class="container">
      <div class="services-bar">
        <h1 class="my-4">商家介紹</h1>
        <!-- Services Section -->
        <div class="row">
          <div class="col-lg-3 mb-3">
            <div class="card h-100" v-if="one.id">
              <h4 class="card-header">{{one.value}}</h4>
              <div class="card-img">
                <img class="img-fluid"  style="height:262.38px;width:350px" src="home1.jpg" alt />
              </div>
              <div class="card-body">
                <p
                  class="card-text"
                >{{one.description}}</p>
              </div>
              <div class="card-footer">
                <a href="#" class="btn btn-primary">詳細資料</a>
              </div>
            </div>
          </div>
          <div class="col-lg-3 mb-3">
            <div class="card h-100" v-if="one.id">
              <h4 class="card-header">{{one.value}}</h4>
              <div class="card-img">
                <img class="img-fluid"  style="height:262.38px;width:350px" src="home1.jpg" alt />
              </div>
              <div class="card-body">
                <p
                  class="card-text"
                >{{one.description}}</p>
              </div>
              <div class="card-footer">
                <a href="#" class="btn btn-primary">詳細資料</a>
              </div>
            </div>
          </div>
          <div class="col-lg-3 mb-3">
            <div class="card h-100" v-if="two.id">
              <h4 class="card-header">{{two.value}}</h4>
              <div class="card-img">
                <img class="img-fluid" style="height:262.38px;width:350px" src="home2.jpg" alt />
              </div>
              <div class="card-body">
                <p
                  class="card-text"
                >{{two.description}}</p>
              </div>
              <div class="card-footer">
                <a href="#" class="btn btn-primary">詳細資料</a>
              </div>
            </div>
          </div>
          <div class="col-lg-3 mb-3">
            <div class="card h-100" v-if="three.id">
              <h4 class="card-header">{{three.value}}</h4>
              <div class="card-img">
                <img class="img-fluid" src="home3.jpg" alt />
              </div>
              <div class="card-body">
                <p
                  class="card-text"
                >{{three.description}}</p>
              </div>
              <div class="card-footer">
                <a href="#" class="btn btn-primary">詳細資料</a>
              </div>
            </div>
          </div>
        </div>
        <!-- /.row -->
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios';
import Swal from 'sweetalert2'
import apiService from '../apiService'
export default {
   name: 'Activity',
  props: {},
  data() {
    return {
       one:{},
       two:{},
       three:{},
       four:{}
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      var data = { key: ['前台.活動.欄位一', '前台.活動.欄位二', '前台.活動.欄位三','前台.活動.欄位四'] };
      apiService.getSettingKeys(data).then(x => {
        this.one = x.data.find(y => y.key == '前台.活動.欄位一');
        this.two = x.data.find(
          y => y.key == '前台.活動.欄位二',
        );
        this.three = x.data.find(
          y => y.key == '前台.活動.欄位三',
        );
        this.four = x.data.find(
          y => y.key == '前台.活動.欄位四',
        ); 
        // console.log(this.one);
      });
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
