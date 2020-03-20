<template>
  <div class="bios-edit">
    <div class="row">
      <form class="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-10 offset-sm-1" v-on:submit.prevent="updateGrant()">
        <h1 class="text-center mb-5">Edit Bio</h1>
        <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul>

        <div class="form-group">
          <label>First Name: </label>
          <input class="form-control" type="text" v-model="bio.firstName">
        </div>

        <div class="form-group">
          <label>Last Name: </label>
          <input class="form-control" type="text" v-model="bio.lastName">
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
        organizationId: ""
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
        first_name: this.bio.firstName,
        last_name: this.bio.lastName,
        title: this.bio.title,
        bio: this.bio.bio,
        organization_id: this.organizationId
        
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