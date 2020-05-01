<template>
  <div>
        <div class="card shadow mb-4">
            <div class="card-header py-3">
              <h6 class="m-0 font-weight-bold text-primary">商家資料</h6>
            </div>
                <div class="card-body">
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">商家名稱</th>
                        <th scope="col">電話</th>
                        <th scope="col">地址</th>
                        <th scope="col">設定</th>
                        
                      </tr>
                    </thead>
                    <tbody v-if="shop.length>0">
                      <tr v-for="(item,index) in shop" :key="item.id">
                        <th scope="row">{{(index+1)+(pageIndex*10)}}</th>
                        <td>{{item.name}}</td>
                        <td>{{item.phone}}</td>
                        <td>{{item.address}}</td>
                        <td>
                          <a href="javascript:void(0)"
                          @click="open(modalShow,item)"
                          >編輯</a>
                          &nbsp;
                          <a href="javascript:void(0)">刪除</a>
                        </td>
                      </tr>
                    </tbody>
                   </table>

                      <nav aria-label="Page navigation example">
                        <ul class="pagination justify-content-center">
                         
                          <li class="page-item" v-for="page in pages" :key="page"><a class="page-link"
                          href="javascript:void(0)" v-on:click="next(page-1)">{{page}}</a></li>
                    
                         
                        </ul>
                      </nav>

            </div>
          </div>



    <b-modal v-model="modalShow" @ok="handleOk">
        <form>
          <div class="form-group">
            <label for="exampleInputEmail1">店家名稱</label>
            <input type="email" class="form-control"  v-model="select.name" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
           <div class="form-group">
            <label for="exampleInputEmail1">電話</label>
            <input type="email" class="form-control"  v-model="select.phone" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
           <div class="form-group">
            <label for="exampleInputEmail1">地址</label>
            <input type="email" class="form-control"  v-model="select.address" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">敘述</label>
            <input type="email" class="form-control"  v-model="select.description" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
           <div class="form-group">
            <label for="exampleInputEmail1">備註</label>
            <textarea class="form-control" v-model="select.remark" id="exampleFormControlTextarea1" rows="3"></textarea>
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
        
         
        </form>
        
    </b-modal>

  </div>
</template>

<script>

import axios from 'axios';
import Swal from 'sweetalert2'
import apiService from '../apiService'
export default {
  name: 'Shop',
   props: {
    msg: String
  },
  data(){
    return {
      shop:[],
      pages:0,
      pageIndex:0,
      modalShow:false,
      select:{}
    }
  },
  created(){
   this.change();
  },
  methods:{
    handleOk(){
      console.log("test")
    },
    open(show,data){
      this.modalShow = !show;
      this.select=data;
      console.log(data);
    },
    next(x){
      this.pageIndex = x;
      this.change();
    },
    change(){
       axios
      .get('../api/shop/page?take=10&skip='+10*this.pageIndex)
      .then((x) => {
        this.pages = Math.round(x.data.count/10);
        this.shop = x.data.items ;
      }) 
      .catch(() => {});
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
