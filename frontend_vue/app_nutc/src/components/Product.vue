<template>
  <div>
    
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-4">
           <div class="card shadow">
                <div class="card-header py-3">
                  <h6 class="m-0 font-weight-bold text-primary">產品分類</h6>
                </div>
                <div class="card-body">
                  <div class="list-group">
                    <a href="#" class="list-group-item list-group-item-action active">
                      全部
                    </a>
                    <a href="javascript:void(0)" v-for="(item) in productTypes" class="list-group-item list-group-item-action" :key="item.id">{{item.name}}</a>
                  </div>
                
                </div>
          </div>
        </div>
        <div class="col-sm-8">
         <div class="card shadow">
                <div class="card-header py-3">
                  <h6 class="m-0 font-weight-bold text-primary">產品</h6>
                </div>
                <div class="card-body">
               
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Handle</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                      </tr>
                      <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                      </tr>
                      <tr>
                        <th scope="row">3</th>
                        <td>Larry</td>
                        <td>the Bird</td>
                        <td>@twitter</td>
                      </tr>
                    </tbody>
                  </table>

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
  name: 'Product',
  props: {
    msg: String
  },
  data(){
    return {
      productTypes:[]
    }
  },
  created(){
      this.getTypes();
  },
  methods:{
    getTypes(){
       axios
      .get('../api/productType/getAll')
      .then((x) => {
        console.log(x.data)
        this.productTypes = x.data;
      }) 
      .catch(() => {});
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
