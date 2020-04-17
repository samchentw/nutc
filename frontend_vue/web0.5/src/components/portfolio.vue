<template>  
 <div>   
   <myheader />

 <div class="site-section">
      <div class="container">
        <div class="row mb-5">
          <div class="col-lg-4 col-md-6 mb-5 post-entry">
            <a href="javascript:void(0)" class="d-block figure">
              <img src="images/作品/作品1.png" v-on:click="show('氣象局 Open Data (學生專題)','images/作品/作品1.png','接政府氣象局開放的Api。')" alt="Image" class="img-fluid">
            </a>
            <span class="text-muted d-block mb-1">氣象局 Open Data (學生專題)</span>            
          </div>
          <div class="col-lg-4 col-md-6 mb-5 post-entry">
            <a href="javascript:void(0)" class="d-block figure">
              <img src="images/作品/作品2.png" v-on:click="show('專題整合王 (學生專題)','images/作品/作品2.png','會員功能、上傳專題資訊與圖檔、內容管理系統')" alt="Image" class="img-fluid">
            </a>
            <span class="text-muted d-block mb-1">專題整合王 (學生專題)</span> 
          </div>
          <!-- <div class="col-lg-4 col-md-6 mb-5 post-entry">
            <a href="#" class="d-block figure">
              <img src="images/img_2.jpg" alt="Image" class="img-fluid">
            </a>
            <span class="text-muted d-block mb-1">23, January 2019</span>
            <h3><a href="#">Architecture is ready to take the world to the next level </a></h3>
          </div>
          <div class="col-lg-4 col-md-6 mb-5 post-entry">
            <a href="#" class="d-block figure">
              <img src="images/img_3.jpg" alt="Image" class="img-fluid">
            </a>
            <span class="text-muted d-block mb-1">23, January 2019</span>
            <h3><a href="#">Architecture is ready to take the world to the next level </a></h3>
          </div>

          <div class="col-lg-4 col-md-6 mb-5 post-entry">
            <a href="#" class="d-block figure">
              <img src="images/img_1.jpg" alt="Image" class="img-fluid">
            </a>
            <span class="text-muted d-block mb-1">23, January 2019</span>
            <h3><a href="#">Architecture is ready to take the world to the next level </a></h3>
          </div>
          <div class="col-lg-4 col-md-6 mb-5 post-entry">
            <a href="#" class="d-block figure">
              <img src="images/img_2.jpg" alt="Image" class="img-fluid">
            </a>
            <span class="text-muted d-block mb-1">23, January 2019</span>
            <h3><a href="#">Architecture is ready to take the world to the next level </a></h3>
          </div>
          <div class="col-lg-4 col-md-6 mb-5 post-entry">
            <a href="#" class="d-block figure">
              <img src="images/img_3.jpg" alt="Image" class="img-fluid">
            </a>
            <span class="text-muted d-block mb-1">23, January 2019</span>
            <h3><a href="#">Architecture is ready to take the world to the next level </a></h3>
          </div> -->
        </div>

        <div class="row">
          <div class="col-md-12 text-center">
            <div class="site-block-27">
              <ul>
                <!-- <a><a href="#">&lt;</a></li> -->
                <li class="active"><span>1</span></li>
                <!-- <li><a href="#">2</a></li>
                <li><a href="#">3</a></li>
                <li><a href="#">4</a></li>
                <li><a href="#">5</a></li>
                <li><a href="#">&gt;</a></li> -->
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
   
    <myfooter/>
 </div>
</template>

<script>
import myheader from './layout/header.vue';
import myfooter from './layout/footer.vue';
import Swal from 'sweetalert2'
export default {
  name: 'portfolio',
  props: {
    // msg: String
  },
  data() {
     return {
       
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
    show(title,url,descript){
      Swal.fire({
        title: title,
        text: '功能介紹：'+descript,
        html:
    `<img src="${url}" style="border:2px #DDDDDD solid;" alt="Image" class="img-fluid">`+
    `${descript}` ,
        // imageUrl: url,
        // imageWidth: 500,
        // imageHeight: 300,
        // imageAlt: 'Custom image',
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.img-fluid{
  overflow: hidden;
  height: 200px;
  border:2px #DDDDDD solid;
}
.text-muted{
  color:black !important
}
span{
  font-family: vskFont !important;
}
.swal2-shown{
  font-family: vskFont !important;
}
</style>
