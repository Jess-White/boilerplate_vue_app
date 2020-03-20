<template>
  <div class="organizations-show">
     <div class="row">
       <div class="col-md-6">
        <h4 class="text-center">Organization Name: {{organization.name}}</h4>
<!--         need method for user id, category -->
       </div>
       <div>
          <router-link class="btn btn-info m-2" v-bind:to="'/organizations/' + organization.id + '/edit'">Edit</router-link>
          <button class="btn btn-info m-2" v-on:click="destroyOrganization()">Delete</button>
          <router-link class="btn btn-danger" :to="'/organizations/' + (1 + organization.id)" >Next</router-link>  
        </div>
     </div> 


  </div>

</template>

<style></style>

<script>
  var axios = require('axios');

  export default {
    data: function() {
      return {
        organization: {
          id: "",
          name: ""
    }
  };
},
created: function() {
  axios 
    .get("/api/organizations/" + this.$route.params.id)
    .then(response => {
      this.organization = response.data
    });
},
methods: {
  destroyOrganization: function() {
    axios
      .delete("/api/organizations/" + this.$route.params.id)
      .then(response => {
        this.$router.push("/");
      });
  }
},
watch: {
  $route: function() {
    axios
    .get("/api/organizations/" + this.$route.params.id)
    .then(response => {
      this.organization = response.data;
    });
  }
}  
};

</script>