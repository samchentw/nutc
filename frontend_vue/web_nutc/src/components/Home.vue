<template>
  <div>
    <div class="container-fluid">
      <div class="services-bar">
        <h1 class="my-4">商家介紹</h1>
        <!-- Services Section -->
        <div class="row">
          <div class="col-lg-4 mb-4">
            <div class="card h-100" v-if="one.id">
              <h4 class="card-header">{{one.value}}</h4>
              <div class="card-img">
                <img class="img-fluid"  style="height:262.38px;width:100%" src="home1.jpg" alt />
              </div>
              <div class="card-body">
                <span
                  class="card-text"
                  v-if="!isShow.one && one.description.length >= textLen"
                >{{show(one.description)}}<a href="javascript:void(0)" v-on:click="setShow(1)">More...</a></span>
                <span
                  class="card-text"
                  v-if="isShow.one || one.description.length < textLen"
                >{{one.description}}</span>
              </div>
              <!-- <div class="card-footer">
                <a href="#" class="btn btn-primary">詳細資料</a>
              </div> -->
            </div>
          </div>
          <div class="col-lg-4 mb-4">
            <div class="card h-100" v-if="two.id">
              <h4 class="card-header">{{two.value}}</h4>
              <div class="card-img">
                <img class="img-fluid" style="height:262.38px;width:100%" src="home2.jpg" alt />
              </div>
              <div class="card-body">
                <span
                  class="card-text"
                  v-if="!isShow.two && two.description.length >= textLen"
                >{{show(two.description)}}<a href="javascript:void(0)" v-on:click="setShow(2)">More...</a></span>
                <span
                  class="card-text"
                  v-if="isShow.two || two.description.length < textLen"
                >{{two.description}}</span>
              </div>
              <!-- <div class="card-footer">
                <a href="#" class="btn btn-primary">詳細資料</a>
              </div> -->
            </div>
          </div>
          <div class="col-lg-4 mb-4">
            <div class="card h-100" v-if="three.id">
              <h4 class="card-header">{{three.value}}</h4>
              <div class="card-img">
                <img class="img-fluid" style="height:262.38px;width:100%" src="home3.jpg" alt />
              </div>
              <div class="card-body">
                <span
                  class="card-text"
                  v-if="!isShow.three && three.description.length >= textLen"
                >{{show(three.description)}}<a href="javascript:void(0)" v-on:click="setShow(3)">More...</a></span>
                <span
                  class="card-text"
                  v-if="isShow.three|| three.description.length < textLen"
                >{{three.description}}</span>
              </div>
              <!-- <div class="card-footer">
                <a href="#" class="btn btn-primary">詳細資料</a>
              </div> -->
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
import Swal from 'sweetalert2';
import apiService from '../apiService';
export default {
  name: 'Home',
  props: {},
  data() {
    return {
       one:{},
       two:{},
       three:{},
       isShow:{
         one:false,
         two:false,
         three:false
       },
      textLen:30
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      var data = { key: ['前台.首頁.欄位一', '前台.首頁.欄位二', '前台.首頁.欄位三'] };
      apiService.getSettingKeys(data).then(x => {
        this.one = x.data.find(y => y.key == '前台.首頁.欄位一');
        this.two = x.data.find(
          y => y.key == '前台.首頁.欄位二',
        );
        this.three = x.data.find(
          y => y.key == '前台.首頁.欄位三',
        ); 
        // console.log(this.title);
      });
    },
    show(text){
      return text.substring(0,this.textLen);
    },
    setShow(type){
      if(type==1){
        this.isShow.one = true;
      }else if(type==2) this.isShow.two = true;
      else if(type==3) this.isShow.three = true;
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
