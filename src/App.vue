<template>
  <div id="app">
    
<aside class="left-nav visible-desktop left-darknav">
                    <div class="nav-container">
                        <div class="nav-parent">
                            <div class="row-brand text-center">
                                <a href="index.html">
                                    <i class="icon-angle fa-2x text-primary"></i><br>
                                    <img src="images/logo-light.png" alt="">
                                </a>
                            </div>
                            <div class="row-navbar">
                                <ul class="list-unstyled verticle-nav">
                                    <li><a class="active" href="index.html">Home</a></li>
                                    <li><a href="about.html">About</a></li>
                                    <li><a href="portfolio.html">Portfolio</a></li>
                                    <li><a href="contact.html">Contact</a></li>
                                </ul>
                            </div>
                            <div class="row-social text-center">
                                <ul class="list-inline">
                                    <li><router-link to="/">Home</router-link></li>
                                    <li><router-link to="/about">About</router-link></li>

                                    <li><router-link to="/bios/new">New Bio</router-link></li>
                                    <li><router-link to="/bios">Bios Index</router-link></li>

                                    <li><router-link to="/boilerplates/new">New Boilerplate</router-link></li>
                                    <li><router-link to="/boilerplates">Boilerplates Index</router-link></li>

                                    <li><router-link to="/grants/new">New Grant</router-link></li>
                                    <li><router-link to="/grants">Grants Index</router-link></li>


                                    <li><router-link to="/organizations/new">New Organization</router-link></li>
                                    <li><router-link to="/organizations">Organizations Index</router-link></li>

                                    <li><router-link to="/login">Logout</router-link></li>
                                    <li><router-link to="/logout">Login</router-link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </aside>

    <router-view/>

    <footer class="footer bg-dark">
        <div class="container"> 
            <div class="row">
                <div class="col-lg-4">
                    <h5>Call us today - +01 574-5832-583</h5>
                    <span>
                        <a href="#" class="social-icon si-dark si-facebook si-dark-round">
                            <i class="fa fa-facebook"></i>
                            <i class="fa fa-facebook"></i>
                        </a>
                        <a href="#" class="social-icon si-dark si-twitter si-dark-round">
                            <i class="fa fa-twitter"></i>
                            <i class="fa fa-twitter"></i>
                        </a>
                        <a href="#" class="social-icon si-dark si-g-plus si-dark-round">
                            <i class="fa fa-google-plus"></i>
                            <i class="fa fa-google-plus"></i>
                        </a>
                        <a href="#" class="social-icon si-dark si-skype si-dark-round">
                            <i class="fa fa-skype"></i>
                            <i class="fa fa-skype"></i>
                        </a>
                    </span>
                </div>
                <div class="col-lg-8 text-right">
                    <ul class="list-inline">
                        <li class="list-inline-item">
                            <a href="#">About us</a>
                        </li>
                        <li class="list-inline-item">
                            <a href="#">News</a>
                        </li>
                        <li class="list-inline-item">
                            <a href="#">Terms & conditions</a>
                        </li>
                        <li class="list-inline-item">
                            <a href="#">Privacy & policy</a> 
                        </li>
                    </ul>
                    <span class="text-white-gray font300">&copy; Copyright 2014-2017. All Right Reserved</span>
                </div>
            </div>
        </div>
    </footer>
    <!--footer-->
  </div>
</template>

<style>

</style>


<script>
var axios = require('axios')

  export default {
    data: function() {
      return {
        userEmail: "",
        // titleFilter: "",
        // bios: []
      };
    },
    created: function() {
      var email = localStorage.getItem("userEmail");
      if (email) {
        this.userEmail = email;
      }

      // axios
      // .get("/api/bios")
      // .then(response => {
      //   this.bios = response.data;
      // });
    }
  }

</script>