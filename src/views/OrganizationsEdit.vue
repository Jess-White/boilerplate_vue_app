<template>
  <div class="organizations-edit">
    <div class="row">
      <form class="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-10 offset-sm-1" v-on:submit.prevent="updateOrganization()">
        <h1 class="text-center mb-5">Edit Organization</h1>
        <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul>

        <div class="form-group">
          <label>Organization Name: </label>
          <input class="form-control" type="text" v-model="organization.name">
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
      organization: {
        id: "",
        name: "",
      },
      errors: []
    };
  },
  created: function() {
    axios
      .get("/api/organizations/" + this.$route.params.id)
      .then(response => {
        this.organization = response.data;
      });
  },
  methods: {
    updateOrganization: function() {
      var clientParams = {
        name: this.organization.name
      };

    axios
    .patch("/api/organizations/" + this.$route.params.id, clientParams)
    .then(response => {
      this.$router.push("/organizations/" + this.$route.params.id);
    }).catch(error => {
      this.errors = error.response.data.errors;
    });
    }
  }
};
</script>