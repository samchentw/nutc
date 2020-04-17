<template>
 <div>   
   <myheader />
    <div class="site-section bg-light">
      <div class="container">
        <div class="row">
          
          <div class="col-md-12 col-lg-12">
          
            <h2 class="site-heading text-black mb-5"><strong>聯絡我們</strong></h2>
          
            <form action="#" class="p-5 bg-white">

              <div class="row form-group">
                <div class="col-md-12 mb-3 mb-md-0">
                  <label class="font-weight-bold" for="fullname">你的名字</label>
                  <input type="text" id="fullname" v-model="name" class="form-control" placeholder="名字">
                </div>
              </div>
              <div class="row form-group">
                <div class="col-md-12">
                  <label class="font-weight-bold" for="email">電子信箱</label>
                  <input type="email" id="email" v-model="email" class="form-control" placeholder="電子信箱">
                </div>
              </div>

              

              <div class="row form-group">
                <div class="col-md-12">
                  <label class="font-weight-bold" for="message">你的問題</label> 
                  <textarea name="message" id="message" v-model="message" cols="30" rows="5" class="form-control" placeholder="你的問題"></textarea>
                </div>
              </div>

              <div class="row form-group">
                <div class="col-md-12">
                  <input type="button" value="送出" v-on:click="callApi()" class="btn btn-primary rounded-0 btn-lg">
                </div>
              </div>

  
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="container site-section block-13 testimonial-wrap">
      <div class="row">
        <div class="col-12 text-center">
          <span class="sub-title">Happy Clients</span>
          <h2 class="font-weight-bold text-black mb-5">Testimonials</h2>
        </div>
      </div>
    </div> -->
    
   
    <myfooter/>
 </div>
</template>

<script>
import myheader from './layout/header';
import myfooter from './layout/footer.vue';
import axios from 'axios';
import Swal from 'sweetalert2'

export default {
  name: 'contact',
  props: {

  },
   data() {
     return {
      name: "",
      email:"",
      message:""
     }
  
  },
   created() {
    // this.callApi();
  },
   components: {
     myheader,
     myfooter
  },
  methods: {
    callApi() {      
      if(this.name == "" || this.email == "" || this.message == ""){        
        Swal.fire("不能有空值")
        return;
      }
      axios
      .post('./api/vsk',{
        name:this.name,
        email:this.email,
        message:this.message
      })
      .then(() => {
        this.name = "";
        this.email = "";
        this.message = "";
        Swal.fire("送出成功！");
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
