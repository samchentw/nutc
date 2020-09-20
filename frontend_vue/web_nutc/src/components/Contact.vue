<template>
  <div>
    <div class="container">
      <!-- Content Row -->
      <div class="row">
        <!-- Map Column -->
        <div class="col-lg-6 mb-6">
          <h3>聯絡我們</h3>
          <form name="sentMessage" id="contactForm" novalidate>
            <div class="control-group form-group">
              <div class="controls">
                <label>姓名:</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="input.name"
                  id="name"
                  required
                  data-validation-required-message="Please enter your name."
                />
                <p class="help-block"></p>
              </div>
            </div>
            <div class="control-group form-group">
              <div class="controls">
                <label>電話:</label>
                <input
                  type="tel"
                  class="form-control"
                  v-model="input.phone"
                  id="phone"
                  required
                  data-validation-required-message="Please enter your phone number."
                />
              </div>
            </div>
            <div class="control-group form-group">
              <div class="controls">
                <label>電子信箱:</label>
                <input
                  type="email"
                  class="form-control"
                  v-model="input.mail"
                  id="email"
                  required
                  data-validation-required-message="Please enter your email address."
                />
              </div>
            </div>
            <div class="control-group form-group">
              <div class="controls">
                <label>訊息:</label>
                <textarea
                  rows="5"
                  cols="100"
                  class="form-control"
                  v-model="input.message"
                  id="message"
                  required
                  data-validation-required-message="Please enter your message"
                  maxlength="999"
                  style="resize:none"
                ></textarea>
              </div>
            </div>
            <div id="success"></div>
            <!-- For success/fail messages -->
            <button
              type="button"
              class="btn btn-primary"
              v-on:click="send()"
              id="sendMessageButton"
            >送出</button>
          </form>
        </div>

        <div class="col-lg-6 mb-6">
          <!-- Embedded Google Map -->
          <iframe
            width="100%"
            height="300px"
            frameborder="0"
            scrolling="no"
            marginheight="0"
            marginwidth="0"
            src="http://maps.google.com/maps?hl=zh-TW&amp;ie=UTF8&amp;ll=24.1523384,120.6831253&amp;spn=56.506174,79.013672&amp;t=m&amp;z=17&amp;output=embed"
          ></iframe>

          <a class="navbar-brand" href="index.html" style="margin-top:20px;">
            <img src="images/logo.png" alt="logo" />
          </a>
        </div>
      </div>
      <!-- /.row -->

      <!-- Contact Form -->
      <!-- In order to set the email address and subject line for the contact form go to the bin/contact_me.php file. -->
      <div class="row" style="margin-top:50px">
        
        
        <div class="col-lg-8 mb-4 contact-left">
          
        </div>

        <div class="col-lg-4 mb-8 contact-left">
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import apiService from '../apiService';
export default {
  name: 'Contact',
  props: {},
  data() {
    return {
      input: {
        name: '',
        phone: '',
        mail: '',
        message: '',
      },
    };
  },
  created() {},
  methods: {
    init() {
      this.input = {
        name: '',
        phone: '',
        mail: '',
        message: '',
      };
    },
    send() {
      apiService
        .createContact(this.input)
        .then(x => {
          Swal.fire('送出成功！');
          this.init();
        })
        .catch(x => {
          alert('不能有空值！');
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn {
  background-color: #ffad60;
  border-color: #ffad60;
}
</style>
