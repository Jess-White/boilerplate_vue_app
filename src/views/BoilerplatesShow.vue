<template>
  <div class="boilerplates-show">
     <div class="row">
       <div class="col-md-6">
        <h4 class="text-center">Name: {{boilerplate.name}}</h4>
        <h4 class="text-center">Boilerplate Text: {{boilerplate.boilerplate_text}}</h4>
<!--         need method for user id, category -->
       </div>
       <div>
          <router-link class="btn btn-info m-2" v-bind:to="'/boilerplates/' + boilerplate.id + '/edit'">Edit</router-link>
          <button class="btn btn-info m-2" v-on:click="destroyBoilerplate()">Delete</button>
          <router-link class="btn btn-danger" :to="'/boilerplates/' + (1 + boilerplate.id)" >Next</router-link>  
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
        boilerplate: {
          id: "",
          name: "",
          boilerplate_text: "",
          user_id: "",
          category_id: ""
    }
  };
},
created: function() {
  axios 
    .get("/api/boilerplates/" + this.$route.params.id)
    .then(response => {
      this.boilerplate = response.data
    });
},
methods: {
  destroyBoilerplate: function() {
    axios
      .delete("/api/boilerplates/" + this.$route.params.id)
      .then(response => {
        this.$router.push("/");
      });
  }
},
watch: {
  $route: function() {
    axios
    .get("/api/boilerplates/" + this.$route.params.id)
    .then(response => {
      this.boilerplate = response.data;
    });
  }
}  
};

</script>