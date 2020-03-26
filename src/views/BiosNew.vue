<template>
  <div class="bios-new">

    <div class="pt100 pb50 bg-dark">
        <div class="container">
            <div class="row align-items-center">
            <div class="col-lg-8 mr-auto pb50 ml-auto">
                <h2 class="h1 font300 text-white">
                    Use This Form to Create <span class="text-primary">Staff Bios</span> For Your Organization.
                </h2>
                <p class="lead text-white-gray">
                    These capsule bios can be added to grant templates to underline organization strengths or provide additional information about project management, leadership, or specialized capability. 
                </p>
                <div class="experience-card clearfix">
                    <div class="experience-inner">
                        <h3 class="experience-text">05a</h3>
                    </div> 
                    <h4>Bio Builder</h4>
                </div>
            </div>
        </div>
        </div>
    </div>
    
    <div class="row my-4">
      <form class="col-6 offset-3"
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

        <div class="form-group">
          <label>Organization: </label>
          <input class="form-control" type="text" v-model="organizationId">
        </div>
        
        <input class="btn btn-info" type="submit" value="Add New Bio">
      </form>
    </div>


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
        });
    }
  }
};


</script>