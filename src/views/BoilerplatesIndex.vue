<template>

  <div class="boilerplates-index">

    <div class="pt100 pb50 bg-dark">
        <div class="container">
            <div class="row align-items-center">
            <div class="col-lg-8 mr-auto pb50 ml-auto">
                <h2 class="h1 font300 text-white">
                    Use This Library to <span class="text-primary">View and Edit </span>Saved Boilerplates.
                </h2>
                <p class="lead text-white-gray">
                    Click on any tile to open a saved boilerplate, view, and edit.
                </p>
                <div class="experience-card clearfix">
                    <div class="experience-inner">
                        <h3 class="experience-text">04</h3>
                    </div> 
                    <h4>Boilerplates Library</h4>
                </div>
            </div>
        </div>
        </div>
    </div>

    <div class="container">
      <h1 class="text-center my-5">Boilerplates</h1>
      <div class="row">
        <div class="col-sm-4 mb-2" v-for="boilerplate in boilerplates">
          <router-link v-bind:to="'/boilerplates/' + boilerplate.id">
            <div class="card">
              <div class="card-body text-info">
                <h5 class="card-name">{{boilerplate.name}}</h5>
                <p class="card-text">Category: {{boilerplate.category.name}}</p>
                <p class="card-text">User: {{boilerplate.user.first_name}} {{boilerplate.user.last_name}}</p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>

</template>

<style>
</style>

<script>
  var axios = require("axios");

  export default {
    data: function() {
      return {
        currentBoilerplate: {},
        boilerplates: []
      };
    },
  created: function() {
    axios
    .get("/api/boilerplates")
    .then(response => {
      this.boilerplates = response.data;
    });
  },
  methods: {}
};


</script>