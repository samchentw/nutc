<template>
  <div>
    <div class="container card">
      <!-- Heading Row -->
      <div class="row align-items-center my-5">
        <div class="col-lg-7">
          <img class="img-fluid rounded mb-4 mb-lg-0" :src="transferImage(shop.shopImage)" alt />
        </div>
        <!-- /.col-lg-8 -->
        <div class="col-lg-5">
          <h3 class="font-weight-light">商店名稱：{{shop.name}}</h3>
          <p>
            {{shop.description}}
          </p>
          <p>
            {{shop.remark}}
          </p>
        </div>
        <!-- /.col-md-4 -->
      </div>
      <!-- /.row -->

      <!-- Call to Action Well -->
      <div class="card text-white bg-secondary my-5 py-4 text-center">
        <div class="card-body">
          <p class="text-white m-0" v-if="shop.address">
           地址：{{shop.address}}
          </p>
           <p class="text-white m-0" v-if="shop.phone">
           電話：{{shop.phone}}
          </p>
        </div>
      </div>

      <!-- Content Row -->
      <!-- <div class="row">
        <div class="col-md-4 mb-5">
          <div class="card h-100">
            <div class="card-body">
              <h2 class="card-title">Card One</h2>
              <p
                class="card-text"
              >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem magni quas ex numquam, maxime minus quam molestias corporis quod, ea minima accusamus.</p>
            </div>
            <div class="card-footer">
              <a href="#" class="btn btn-primary btn-sm">More Info</a>
            </div>
          </div>
        </div>
        <div class="col-md-4 mb-5">
          <div class="card h-100">
            <div class="card-body">
              <h2 class="card-title">Card Two</h2>
              <p
                class="card-text"
              >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod tenetur ex natus at dolorem enim! Nesciunt pariatur voluptatem sunt quam eaque, vel, non in id dolore voluptates quos eligendi labore.</p>
            </div>
            <div class="card-footer">
              <a href="#" class="btn btn-primary btn-sm">More Info</a>
            </div>
          </div>
        </div>
        <div class="col-md-4 mb-5">
          <div class="card h-100">
            <div class="card-body">
              <h2 class="card-title">Card Three</h2>
              <p
                class="card-text"
              >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem magni quas ex numquam, maxime minus quam molestias corporis quod, ea minima accusamus.</p>
            </div>
            <div class="card-footer">
              <a href="#" class="btn btn-primary btn-sm">More Info</a>
            </div>
          </div>
        </div>
      </div> -->
      <!-- /.row -->
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
      shop:{}
    };
  },
  created() {
    this.init();
  },
  methods: {
    init(){
      var id = this.$route.params.id;
      // console.log(id);
      apiService.getshop(id).then(x=>{
        this.shop = x.data;
        console.log(x.data);
      })
    },
    transferImage(image) {
      var temp = JSON.parse(image);
      if (temp.length > 0) {
        return temp[0].url;
      } else {
        return 'images/portfolio-big-02.jpg';
      }
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
