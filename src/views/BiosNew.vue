<template>
  <div class="bios-new">
    <div class="row"></div>
    <form class="col-sm-6"
    v-on:submit.prevent="createBio()">
    <h1 class="text-center mb-5">New Bio</h1>

    <ul>
      <li class="text-danger" v-for="error in errors">{{ error }}</li>
    </ul>

    <div class="form-group">
      <label>First Name: </label>
      <input class="form-control" type="text" v-model="firstName">
    </div>

    <div class="form-group">
      <label>Last Name: </label>
      <input class="form-control" type="text" v-model="lastName">
    </div>

    <div class="form-group">
      <label>Title: </label>
      <input class="form-control" type="text" v-model="title">
    </div>

     <div class="form-group">
      <label>Bio Text: </label>
      <input class="form-control" type="text" v-model="bio">
    </div>
    </form>

    <div class="form-group">
      <label>Organization: </label>
      <input class="form-control" type="text" v-model="organizationId">
    </div>
    </form>

    <button v-on:click="createBio()">Add New Bio</button>

  </div>
</template>

<style></style>

<script>
  var axios = require("axios");

  export default {
    data: function() {
      return {
        id: "",
        firstName: "",
        lastName: "",
        title: "",
        bio: "",
        organizationId: "",
        errors: []
      };
    },
    created: function() {},
    methods: {
      createBio: function() {
        var clientParams = {
        first_name: this.firstName,
        last_name: this.lastName,
        title: this.title,
        bio: this.bio,
        organization_id: this.organizationId
      };

      axios
        .post("/api/bios/", clientParams)
        .then(response => {
          this.$router.push("/bios");
        }).catch(error => {
          this.errors = error.response.data.
            errors;
          // this.status = error.response.status;
        });
    }
  }
};


</script>