<template>
  <div class="container-fluid">
    <h2 style="text-align: center;">商家介紹</h2>

    <div class="row">
      <div class="col-lg-3 col-md-4 col-sm-6 portfolio-item">
        <div class="card h-100">
          <a href="#">
            <img class="card-img-top" src="images/portfolio-big-02.jpg" alt />
          </a>
          <div class="card-body">
            <h4 class="card-title">
              <a href="#">Project Two</a>
            </h4>
            <p
              class="card-text"
            >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.</p>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-4 col-sm-6 portfolio-item">
        <div class="card h-100">
          <a href="#">
            <img class="card-img-top" src="images/portfolio-big-02.jpg" alt />
          </a>
          <div class="card-body">
            <h4 class="card-title">
              <a href="#">Project Two</a>
            </h4>
            <p
              class="card-text"
            >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.</p>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-4 col-sm-6 portfolio-item">
        <div class="card h-100">
          <a href="#">
            <img class="card-img-top" src="images/portfolio-big-03.jpg" alt />
          </a>
          <div class="card-body">
            <h4 class="card-title">
              <a href="#">Project Three</a>
            </h4>
            <p
              class="card-text"
            >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos quisquam, error quod sed cumque, odio distinctio velit nostrum temporibus necessitatibus et facere atque iure perspiciatis mollitia recusandae vero vel quam!</p>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-4 col-sm-6 portfolio-item">
        <div class="card h-100">
          <a href="#">
            <img class="card-img-top" src="images/portfolio-big-04.jpg" alt />
          </a>
          <div class="card-body">
            <h4 class="card-title">
              <a href="#">Project Four</a>
            </h4>
            <p
              class="card-text"
            >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.</p>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-4 col-sm-6 portfolio-item">
        <div class="card h-100">
          <a href="#">
            <img class="card-img-top" src="images/portfolio-big-04.jpg" alt />
          </a>
          <div class="card-body">
            <h4 class="card-title">
              <a href="#">Project Five</a>
            </h4>
            <p
              class="card-text"
            >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.</p>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-4 col-sm-6 portfolio-item">
        <div class="card h-100">
          <a href="#">
            <img class="card-img-top" src="images/portfolio-big-01.jpg" alt />
          </a>
          <div class="card-body">
            <h4 class="card-title">
              <a href="#">Project Six</a>
            </h4>
            <p
              class="card-text"
            >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque earum nostrum suscipit ducimus nihil provident, perferendis rem illo, voluptate atque, sit eius in voluptates, nemo repellat fugiat excepturi! Nemo, esse.</p>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-4 col-sm-6 portfolio-item">
        <div class="card h-100">
          <a href="#">
            <img class="card-img-top" src="images/portfolio-big-02.jpg" alt />
          </a>
          <div class="card-body">
            <h4 class="card-title">
              <a href="#">Project Seven</a>
            </h4>
            <p
              class="card-text"
            >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.</p>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-4 col-sm-6 portfolio-item">
        <div class="card h-100">
          <a href="#">
            <img class="card-img-top" src="images/portfolio-big-03.jpg" alt />
          </a>
          <div class="card-body">
            <h4 class="card-title">
              <a href="#">Project Eight</a>
            </h4>
            <p
              class="card-text"
            >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius adipisci dicta dignissimos neque animi ea, veritatis, provident hic consequatur ut esse! Commodi ea consequatur accusantium, beatae qui deserunt tenetur ipsa.</p>
          </div>
        </div>
      </div>
    </div>

        <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
         align="center"
        prev-text="上一頁"
        next-text="下一頁"
      ></b-pagination>
      

  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import apiService from '../apiService';
export default {
  name: 'Shop',
  props: {},
  data() {
    return {
      rows: 100,
      perPage: 1,
      currentPage: 5,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
