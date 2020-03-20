<template>
  <div class="boilerplates-edit">
    <div class="row">
      <form class="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-10 offset-sm-1" v-on:submit.prevent="updateBoilerplate()">
        <h1 class="text-center mb-5">Edit Boilerplate</h1>
        <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul>

        <div class="form-group">
          <label>Name: </label>
          <input class="form-control" type="text" v-model="boilerplate.name">
        </div>

        <div class="form-group">
          <label>Boilerplate Text: </label>
          <input class="form-control" type="text" v-model="boilerplate.boilerplateText">
        </div>

<!--         need method for user id and category id -->

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
      boilerplate: {
        id: "",
        name: "",
        boilerplate_text: "",
        user_id: "",
        category_id: ""
      },
      errors: []
    };
  },
  created: function() {
    axios
      .get("/api/boilerplates/" + this.$route.params.id)
      .then(response => {
        this.boilerplate = response.data;
      });
  },
  methods: {
    updateBoilerplate: function() {
      var clientParams = {
        name: this.boilerplate.name,
        boilerplate_text: this.boilerplate.boilerplateText,
        user_id: this.boilerplate.userId,
        boilerplate: this.boilerplate.categoryId
      };

    axios
    .patch("/api/boilerplates/" + this.$route.params.id, clientParams)
    .then(response => {
      this.$router.push("/boilerplates/" + this.$route.params.id);
    }).catch(error => {
      this.errors = error.response.data.errors;
    });
    }
  }
};
</script>