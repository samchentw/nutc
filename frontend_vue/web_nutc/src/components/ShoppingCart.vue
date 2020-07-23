<template>
  <div>
 

<div class="container mb-4">
    <div class="row">
        <div class="col-12">
            <div class="table-responsive">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col"> </th>
                            <th scope="col">產品名稱</th>
                            <th scope="col" class="text-center">數量</th>
                            <th scope="col" class="text-right">價格</th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item) in selectItems" :key="item.id">
                            <td><img src="https://dummyimage.com/50x50/55595c/fff" /> </td>
                            <td>{{item.product.name}}</td>
                            <td class="text-center">{{item.count}}</td>
                            <td class="text-right">{{item.product.price}}</td>
                            <td class="text-right"><button class="btn btn-sm btn-danger" v-on:click="remove(item.product.id)"><i class="fa fa-trash"></i> </button> </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>小計</td>
                            <td class="text-right">255</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>運費</td>
                            <td class="text-right">100</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td><strong>總額</strong></td>
                            <td class="text-right"><strong>3455</strong></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="col mb-2">
            <div class="row">
                <div class="col-sm-12  col-md-6">
                    <a href="./#/product" class="btn btn-block btn-light">繼續購買</a>
                </div>
                <div class="col-sm-12 col-md-6 text-right">
                    <button class="btn btn-lg btn-block btn-success text-uppercase">結帳</button>
                </div>
            </div>
        </div>
    </div>
</div>
 
  </div>
</template>

<script>

import axios from 'axios';
import Swal from 'sweetalert2'
import apiService from '../apiService'
export default {
  name: 'ShoppingCart',
  props: {
   
  },
  data(){
    return {
        selectItems:[],
    }
  },
  created(){
      // this.change();
      this.init();
  },
  methods:{
      init(){
         this.selectItems = apiService.getUserProduct();
         console.log(this.selectItems)
      },
      remove(id){
          this.selectItems = this.selectItems.filter(x=>x.product.id !=id);
          apiService.saveUserProduct(this.selectItems);
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
