<template>
  
 <div>   
   <myheader />
    
    <div class="site-section">
      <div class="container">
        <div class="row">
          <div class="col-12 text-center">
            <span class="sub-title">團隊</span>
            <h2 class="font-weight-bold text-black mb-5">我們的團隊</h2>
          </div>
        </div>
        <div class="row">

          <div class="col-lg-4 col-md-6 mb-4">
            <!-- <div class="person"> -->
              <div class="bio-img">
                <figure>
                  <img src="images/team/kevin.png" alt="Image" class="img-fluid">
                </figure>
                <div class="social">
                  <a href="#"><span class="icon-facebook"></span></a>
                  <a href="#"><span class="icon-twitter"></span></a>
                  <a href="#"><span class="icon-instagram"></span></a>
                </div>
              </div>
              <h2>Kevin</h2>
              <!-- <span class="sub-title">系統分析師</span> -->
            <!-- </div> -->
          </div>

          <div class="col-lg-4 col-md-6 mb-4">
            <!-- <div class="person"> -->
              <div class="bio-img">
                <figure>
                  <img src="images/team/sam.png" alt="Image" class="img-fluid">
                </figure>
                <div class="social">
                  <a href="#"><span class="icon-facebook"></span></a>
                  <a href="#"><span class="icon-twitter"></span></a>
                  <a href="#"><span class="icon-instagram"></span></a>
                </div>
              </div>
              <h2>sam</h2>
              <!-- <span class="sub-title">全端工程師</span> -->
            <!-- </div> -->
          </div>
          
          <div class="col-lg-4 col-md-6 mb-4">
            <!-- <div class="person"> -->
              <div class="bio-img">
                <figure>
                  <img src="images/team/vivian.png" alt="Image" class="img-fluid">
                </figure>
                <div class="social">
                  <a href="#"><span class="icon-facebook"></span></a>
                  <a href="#"><span class="icon-twitter"></span></a>
                  <a href="#"><span class="icon-instagram"></span></a>
                </div>
              </div>
              <h2>Vivian</h2>
              <!-- <span class="sub-title">美編設計師</span> -->
            <!-- </div> -->
          </div>

          <!-- <div class="col-lg-3 col-md-6 mb-4">
            <div class="person">
              <div class="bio-img">
                <figure>
                  <img src="images/person_4.jpg" alt="Image" class="img-fluid">
                </figure>
                <div class="social">
                  <a href="#"><span class="icon-facebook"></span></a>
                  <a href="#"><span class="icon-twitter"></span></a>
                  <a href="#"><span class="icon-instagram"></span></a>
                </div>
              </div>
              <h2>Nicolas Stainer</h2>
              <span class="sub-title">Engineer</span>
            </div>
          </div> -->

        </div>
      </div>
    </div>


    <!-- <div class="site-half">
      <div class="img-bg-1" style="background-image: url('images/hero_bg_1.jpg');"></div>
      <div class="container">
        <div class="row no-gutters align-items-stretch">
          <div class="col-md-12 col-lg-7 ml-lg-auto py-5">
            <span class="sub-title">Architectural Design</span>
            <h2 class="font-weight-bold text-black font-secondary mb-4">Why Choose Us</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus aliquid eius facilis voluptatem eligendi magnam accusamus vel commodi asperiores sint rem reprehenderit nobis nesciunt veniam qui fugit doloremque numquam quod.</p>
            <p class="mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur tempora distinctio ipsam nesciunt recusandae repellendus asperiores amet.</p>  

            <ul class="list-unstyled ul-check primary">
              <li>Lorem ipsum dolor sit amet consectetur</li>
              <li>Consectetur tempora distinctio ipsam</li>
              <li>Recusandae repellendus asperiores amet</li>
              <li>Lorem ipsum dolor sit amet consectetur</li>
              <li>Consectetur tempora distinctio ipsam</li>
            </ul>
          </div>
        </div>
      </div>
    </div> -->
   
    <myfooter/>
 </div>
</template>

<script>
import myheader from './layout/header.vue';
import myfooter from './layout/footer.vue';
export default {
  name: 'about',
  props: {
    // msg: String
  },
   components: {
     myheader,
     myfooter
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.img-fluid{
  width:250px;
  height: 250px;
}
</style>
