<template>
 
 <div>
    <div class="site-mobile-menu">
      <div class="site-mobile-menu-header">
        <div class="site-mobile-menu-close mt-3">
          <span class="icon-close2 js-menu-toggle"></span>
        </div>
      </div>
      <!-- <div class="site-mobile-menu-body"></div> -->
      <div>
            <ul style="list-style-type:none;">                  
                <li><a style="color:black;font-size:30px" href="./#/">首頁</a></li>
                <li><a style="color:black;font-size:30px" href="./#/about">關於我們</a></li>                    
                <li><a style="color:black;font-size:30px" href="./#/portfolio">作品集</a></li>
                <li><a style="color:black;font-size:30px" href="./#/contact">聯絡我們</a></li>
            </ul>
      </div>
         
    </div> <!-- .site-mobile-menu -->
  
    
    <div class="site-navbar-wrap">
      <div class="site-navbar-top">
        <div class="container py-3">
          <div class="row align-items-center">
            <div class="col-6">
              <a href="#" class="p-2 pl-0"><span class="icon-twitter"></span></a>
              <a href="#" class="p-2 pl-0"><span class="icon-facebook"></span></a>
              <a href="#" class="p-2 pl-0"><span class="icon-linkedin"></span></a>
              <a href="#" class="p-2 pl-0"><span class="icon-instagram"></span></a>
            </div>
            <div class="col-6">
              <div class="d-flex ml-auto">
                <a href="#" class="d-flex align-items-center ml-auto mr-4">
                  <span class="icon-phone mr-2"></span>
                  <span class="d-none d-md-inline-block">無</span>
                </a>
                <a href="#" class="d-flex align-items-center">
                  <span class="icon-envelope mr-2"></span>
                  <span class="d-none d-md-inline-block">rgivvn@gmail.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="site-navbar">
        <div class="container py-1">
          <div class="row align-items-center">
            <div class="col-2">
              <h1 class="mb-0 site-logo"><a href="/">0.5</a></h1>
            </div>
            <div class="col-10">
              <nav class="site-navigation text-right" role="navigation">
                <div class="container">
                  <div class="d-inline-block d-lg-none ml-md-0 mr-auto py-3"><a href="#" class="site-menu-toggle js-menu-toggle text-white"><span class="icon-menu h3"></span></a></div>

                  <ul class="site-menu js-clone-nav d-none d-lg-block">                  
                    <li><a href="./#/">首頁</a></li>
                    <li><a href="./#/about">關於我們</a></li>                    
                    <li><a href="./#/portfolio">作品集</a></li>
                    <li><a href="./#/contact">聯絡我們</a></li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>

     <div class="site-blocks-cover overlay" style="background-image: url(images/hero_bg_1.jpg);" data-aos="fade" data-stellar-background-ratio="0.5">
      <div class="container">
        <div class="row align-items-center text-center justify-content-center">
          <div class="col-md-8">
            <span class="sub-text">Information Studio</span>
            <h1>0.5資訊工作室</h1>
          </div>
        </div>
      </div>
    </div>  

 </div>
</template>

<script>
export default {
  name: 'myheader',
  props: {
    
  },
  mounthed:{
  }
}
</script>

<style scoped>

</style>
