<template>
  <div>
    <div class="container card">
      <!-- Heading Row -->
      <div class="row align-items-center my-5" v-if="shop">
        <div class="col-lg-7">
          <img class="img-fluid rounded mb-4 mb-lg-0" :src="transferImage(shop.shopImage)" alt />
        </div>
        <!-- /.col-lg-8 -->
        <div class="col-lg-5">
          <h3 class="font-weight-light">商店名稱：{{shop.name}}</h3>
          <p style="white-space: pre-line;">{{shop.description}}</p>
          <p style="white-space: pre-line;">{{shop.remark}}</p>
        </div>
        <!-- /.col-md-4 -->
      </div>
      <!-- /.row -->

      <!-- Call to Action Well -->
      <div class="card text-white bg-secondary my-5 py-4 text-center">
        <div class="card-body">
          <p class="text-white m-0" v-if="shop.address">地址：{{shop.address}}</p>
          <p class="text-white m-0" v-if="shop.phone">電話：{{shop.phone}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import apiService from '../apiService';
export default {
  name: 'ShopDetail',
  props: {},
  data() {
    return {
      shop: {},
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      var id = this.$route.params.id;
      // console.log(id);
      apiService.getshop(id).then(x => {
        this.shop = x.data;
        // console.log(x.data);
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
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
