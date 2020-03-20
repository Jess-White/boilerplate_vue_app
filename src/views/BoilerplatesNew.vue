<template>
  <div class="boilerplates-new">
    <div class="row"></div>
    <form class="col-sm-6"
    v-on:submit.prevent="createBoilerplate()">
    <h1 class="text-center mb-5">New Boilerplate</h1>

    <ul>
      <li class="text-danger" v-for="error in errors">{{ error }}</li>
    </ul>

    <div class="form-group">
      <label>Name </label>
      <input class="form-control" type="text" v-model="name">
    </div>

    <div class="form-group">
      <label>Boilerplate Text: </label>
      <input class="form-control" type="text" v-model="boilerplateText">
    </div>
    </form>

    <input class="btn btn-info" type="submit" value="Add New Boilerplate">
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
        boilerplate_text: "",
        user_id: "",
        category_id: "",
        errors: []
      };
    },
    created: function() {},
    methods: {
      createBoilerplate: function() {
        var clientParams = {
        name: this.name,
        boilerplate_text: this.boilerplateText,
        user_id: this.userId,
        category_id: this.categoryId, 
        organization_id: this.organizationId
      };

      axios
        .post("/api/boilerplates/", clientParams)
        .then(response => {
          this.$router.push("/boilerplates/");
        }).catch(error => {
          this.errors = error.response.data.
            errors;
          this.status = error.response.status;
        });
    }
  }
};


</script>