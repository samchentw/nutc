<template>
  <div>
    <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-light top-nav fixed-top">
        <div class="container">
            <a class="navbar-brand" href="index.html">
            <img src="images/logo.png" alt="logo" />
            </a>
            <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
				<span class="fas fa-bars"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarResponsive">
               <ul class="navbar-nav ml-auto">
                  <li class="nav-item">
                     <a class="nav-link active" href="index.html">首頁</a>
                  </li>
                  <li class="nav-item">
                     <a class="nav-link" href="about.html">美食</a>
                  </li>
                  
                  <li class="nav-item dropdown">
                     <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownPortfolio" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                     特色
                     </a>
                     <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownPortfolio">
                        <a class="dropdown-item" href="portfolio-1-col.html">免費型活力</a>
                        <a class="dropdown-item" href="portfolio-2-col.html">基本商圈消費</a>
                        <a class="dropdown-item" href="portfolio-3-col.html">3 Column Portfolio</a>
                        <a class="dropdown-item" href="portfolio-4-col.html">4 Column Portfolio</a>
                        <a class="dropdown-item" href="portfolio-item.html">Single Portfolio Item</a>
                     </div>
                  </li>
                <!--  <li class="nav-item dropdown">
                     <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownBlog" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                     Blog
                     </a>
                     <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownBlog">
                        <a class="dropdown-item" href="blog-home-1.html">Blog Home 1</a>
                        <a class="dropdown-item" href="blog-home-2.html">Blog Home 2</a>
                        <a class="dropdown-item" href="blog-post.html">Blog Post</a>
                     </div>
                  </li> -->
                  <li class="nav-item dropdown">
                     <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownBlog" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                     會員中心
                     </a>
                     <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownBlog">
                        <a class="dropdown-item" href="faq.html">個人資料</a>
                        <a class="dropdown-item" href="404.html">購物車</a>
                        <a class="dropdown-item" href="pricing.html">我的記錄</a>
                     </div>
                  </li>
                  <li class="nav-item">
                     <a class="nav-link" href="contact.html">登入</a>
                  </li>
                  <li class="nav-item">
                     <a class="nav-link" href="contact.html">登出</a>
                  </li>
               </ul>
            </div>
        </div>
    </nav>
<div class="full-title"  style="margin-bottom:20px">
		<div class="container">
			<!-- Page Heading/Breadcrumbs -->
			<h1 class="mt-4 mb-3">About
				<small>Subheading</small>
			</h1>
		</div>
	</div>
    
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    // msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
