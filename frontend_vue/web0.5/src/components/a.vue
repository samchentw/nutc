<template>
  
 <div>   
   <!-- <myheader /> -->
    test
    <router-link to="/">Go to home</router-link>
   
    <myfooter/>
 </div>
</template>

<script>
// import myheader from './layout/header.vue';
import myfooter from './layout/footer.vue';
export default {
  name: 'ahome',
  props: {
    msg: String
  },
   components: {
    //  myheader,
     myfooter
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
