<template>
  <div class="organizations-new">
    <div class="row"></div>
    <form class="col-sm-6"
    v-on:submit.prevent="createOrganization()">
    <h1 class="text-center mb-5">New Organization</h1>

    <ul>
      <li class="text-danger" v-for="error in errors">{{ error }}</li>
    </ul>

    <div class="form-group">
      <label>Name </label>
      <input class="form-control" type="text" v-model="name">
    </div>
    </form>

    <input class="btn btn-info" type="submit" value="Add New Organization">
<!--     need method for user id, category id -->
  </div>
</template>

<style></style>

<script>
  var axios = require("axios");

  export default {
    data: function() {
      return {
        id: "",
        name: "",
        errors: []
      };
    },
    created: function() {},
    methods: {
      createOrganization: function() {
        var clientParams = {
        name: this.name
      };

      axios
        .post("/api/organizations/", clientParams)
        .then(response => {
          this.$router.push("/organizations/");
        }).catch(error => {
          this.errors = error.response.data.
            errors;
          this.status = error.response.status;
        });
    }
  }
};


</script>