<template>
  <div class="bios-edit">

    <div class="pt100 pb50 bg-dark">
        <div class="container">
            <div class="row align-items-center">
            <div class="col-lg-8 mr-auto pb50 ml-auto">
                <h2 class="h1 font300 text-white">
                    Use This Page to Edit Saved <span class="text-primary">Staff Bios</span> for Your Organization.
                </h2>
                <p class="lead text-white-gray">
                    Edit and update saved staff bios. 
                </p>
                <div class="experience-card clearfix">
                    <div class="experience-inner">
                        <h3 class="experience-text">05b</h3>
                    </div> 
                    <h4>Edit Staff Bios</h4>
                </div>
            </div>
        </div>
        </div>
    </div>

    <div class="row">
      <form class="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-10 offset-sm-1" v-on:submit.prevent="updateBio()">
        <h1 class="text-center mb-5">Edit Bio</h1>
        <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul>

        <div class="form-group">
          <label>First Name: </label>
          <input class="form-control" type="text" v-model="bio.first_name">
        </div>

        <div class="form-group">
          <label>Last Name: </label>
          <input class="form-control" type="text" v-model="bio.last_name">
        </div>

        <div class="form-group">
          <label>Title: </label>
          <input class="form-control" type="text" v-model="bio.title">
        </div>

        <div class="form-group">
          <label>Bio Text: </label>
          <input class="form-control" type="text" v-model="bio.bio">
        </div>

      </form>

      <button v-on:click="updateBio()">Edit Bio</button>
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
      bio: {
        id: "",
        first_name: "",
        last_name: "",
        title: "",
        bio: "",
        organization_id: ""
      },
      errors: []
    };
  },
  created: function() {
    axios
      .get("/api/bios/" + this.$route.params.id)
      .then(response => {
        this.bio = response.data;
      });
  },
  methods: {
    updateBio: function() {
      var clientParams = {
        first_name: this.bio.first_name,
        last_name: this.bio.last_name,
        title: this.bio.title,
        bio: this.bio.bio,
        organization_id: this.organization_id
        
      };

    axios
    .patch("/api/bios/" + this.$route.params.id, clientParams)
    .then(response => {
      this.$router.push("/bios/" + this.$route.params.id);
    }).catch(error => {
      this.errors = error.response.data.errors;
    });
    }
  }
};
</script>