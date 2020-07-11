<template>
  <div>
    <div class="container" v-if="showType==1">
      <div class="row" style="margin-bottom:100px">
        <div class="col-lg-3">
          <h3 class="my-4">產品種類</h3>
          <div class="list-group" v-if="productType.length>0">
            <a
              href="javascript:void(0)"
              class="list-group-item"
              v-bind:class="{ 'active': selectType==0 }"
              v-on:click="funSelectType(0)"
            >全部</a>

            <a
              href="javascript:void(0)"
              v-for="(item) in productType"
              :key="item.id"
              class="list-group-item"
              v-bind:class="{ 'active': selectType== item.id }"
              v-on:click="funSelectType(item.id)"
            >{{item.name}}</a>
          </div>
        </div>
        <!-- /.col-lg-3 -->

        <div class="col-lg-9">
          <div class="row">
            <div class="col-lg-12 col-md-12 mb-12" style="margin:10px" v-if="products.length == 0">
              <div class="alert alert-info" role="alert">目前沒有產品</div>
            </div>

            <div class="col-lg-4 col-md-6 mb-4" v-for="(item) in products" :key="item.id">
              <div class="card h-100">
                <a href="#">
                  <img class="card-img-top" style="height:200px;" :src="transferImage(item.productImage)" alt />
                </a>
                <div class="card-body">
                  <h4 class="card-title">
                    <a href="#">{{item.name}}</a>
                  </h4>
                  <h5>${{item.price}}</h5>
                  <p class="card-text">{{item.description}}</p>
                </div>
                <div class="card-footer">
                  <!-- <button></button> -->
                  <b-button v-on:click="change(2)">購買</b-button>
                </div>
              </div>
            </div>
          </div>
          <!-- /.row -->
        </div>
        <!-- /.col-lg-9 -->
      </div>
      <!-- /.row -->
    </div>

    <div class="container" v-if="showType==2">
      test
      <b-button v-on:click="change(1)">back</b-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import apiService from '../apiService';
export default {
  name: 'Product',
  props: {},
  data() {
    return {
      productType: [],
      selectType: 0,
      products: [],
      showType: 1,
    };
  },
  created() {
    this.init();
  },
  methods: {
    change(type) {
      this.showType = type;
    },
    init() {
      apiService.getProductType().then(x => {
        this.productType = x.data;
      });
      apiService.getProducts(0, 0, false).then(x => {
        this.products = x.data.items;
      });
    },
    funSelectType(id) {
      this.selectType = id;
      apiService.getProducts(0, id, false).then(x => {
        this.products = x.data.items;
      });
    },
    transferImage(image) {
      var temp = JSON.parse(image);
      if (temp.length > 0) {
        return temp[0].url;
      } else {
        return 'http://placehold.it/700x400';
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list-group-item {
  position: relative;
  display: block;
  padding: 0.75rem 1.25rem;
  background-color: #fff;
  border: 3px solid rgba(0, 0, 140, 0.125);
}

.list-group-item.active {
  background-color: #ff9800;
  border-color: #ff9800;
}
</style>
