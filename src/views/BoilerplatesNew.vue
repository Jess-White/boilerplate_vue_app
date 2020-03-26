<template>
  <div class="boilerplates-new">

    <div class="pt100 pb50 bg-dark">
        <div class="container">
            <div class="row align-items-center">
            <div class="col-lg-8 mr-auto pb50 ml-auto">
                <h2 class="h1 font300 text-white">
                    Use This Form to Create <span class="text-primary">Boilerplates</span> to Add Into New Grants.
                </h2>
                <p class="lead text-white-gray">
                    Create boilerplate text to add to grant templates. Organize by category or wordcount. Save text from successful grant applications, donor materials, shareholder reports, and your website. 
                </p>
                <div class="experience-card clearfix">
                    <div class="experience-inner">
                        <h3 class="experience-text">03a</h3>
                    </div> 
                    <h4>Boilerplate Builder</h4>
                </div>
            </div>
        </div>
        </div>
    </div>

    <div class="row my-4"></div>
    <form class="col-6 offset-3"
    v-on:submit.prevent="createBoilerplate()">
    <h1 class="text-center mb-5">New Boilerplate</h1>

    <ul>
      <li class="text-danger" v-for="error in errors">{{ error }}</li>
    </ul>

    <div class="form-group">
      <label>Name: </label>
      <input class="form-control" type="text" v-model="name">
    </div>

    <div class="form-group">
      <label>Boilerplate Text: </label>
      <input class="form-control" type="text" v-model="boilerplateText">
    </div>

    <div class="form-group">
      <label>Category: </label>
      <select class="form-control" v-model="categoryId">
        <option v-for="category in categories" :value="category.id">{{ category.name }}</option>
      </select>
    </div>

    <div class="form-group">
      <label>User: </label>
      <select class="form-control" v-model="userId">
        <option v-for="user in users" :value="user.id">{{ user.first_name }} {{ user.last_name }}</option>
      </select>
    </div>

      <input class="btn btn-info m-4" type="submit" value="Add New Boilerplate">

    </form>
    
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
        boilerplateText: "",
        categoryId: "",
        userId: "",
        errors: [],
        users: [],
        categories: []
      };
    },
    created: function() {
      axios
        .get("/api/categories")
        .then(response => {
          this.categories = response.data;
        });

      axios
        .get("/api/users")
        .then(response => {
          this.users = response.data;
        });
    },
    methods: {
      createBoilerplate: function() {
        var clientParams = {
        name: this.name,
        boilerplate_text: this.boilerplateText,
        category_id: this.categoryId, 
        organization_id: this.organizationId,
        user_id: this.userId
      };

      axios
        .post("/api/boilerplates/", clientParams)
        .then(response => {
          this.$router.push("/boilerplates/" + response.data.id);
        }).catch(error => {
          this.errors = error.response.data.
            errors;
          this.status = error.response.status;
        });
    }
  }
};


</script>