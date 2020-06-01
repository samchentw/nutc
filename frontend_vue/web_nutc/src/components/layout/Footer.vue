<template>
  <div>
     <footer class="footer">
        <div class="container">
            <!-- <div class="footer-logo">
				<a href="#"><img src="images/footer-logo.png" alt="" /></a>
			</div> -->
            <!--foote_bottom_ul_amrc ends here-->
            <p class="copyright text-center">All Rights Reserved. &copy; 2018 <a href="#">N & LW Lawn Care</a> Design By : 
				<a href="https://html.design/">html design</a>
            </p>
            <ul class="social_footer_ul">
				<li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
				<li><a href="#"><i class="fab fa-twitter"></i></a></li>
				<li><a href="#"><i class="fab fa-linkedin"></i></a></li>
				<li><a href="#"><i class="fab fa-instagram"></i></a></li>
            </ul>
            <!--social_footer_ul ends here-->
        </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  props: {
    // msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.footer {
    width: 100%;
	background-color: #795548;
	opacity:0.9;
    min-height: 0px;
    padding: 10px 0px 25px 0px;
}

.copyright a{
	color: white;
}
</style>
