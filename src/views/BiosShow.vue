<template>
  <div class="bios-show">
     <div class="row">
       <div class="col-md-6">
        <h4 class="text-center">Name: {{bio.first_name}} {{bio.last_name}}</h4>
        <h4 class="text-center">Title: {{bio.title}}</h4>
        <h4 class="text-center">Bio: {{bio.bio}}</h4>
        <h4 class="text-center">Organization: {{bio.organization_id}}</h4>
       </div>
       <div>
          <router-link class="btn btn-info m-2" v-bind:to="'/bios/' + bio.id + '/edit'">Edit</router-link>
          <button class="btn btn-info m-2" v-on:click="destroyBio()">Delete</button>
          <router-link class="btn btn-danger" :to="'/bios/' + (1 + bio.id)" >Next</router-link>  
        </div>
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
        bio: {
          id: "",
          first_name: "",
          last_name: "",
          title: "",
          bio: "",
          organizationId: "",
          errors: []
        }
      };
    },
    created: function() {
      axios 
        .get("/api/bios/" + this.$route.params.id)
        .then(response => {
          this.bio = response.data
        });
    },
    methods: {
      destroyBio: function() {
        axios
          .delete("/api/bios/" + this.$route.params.id)
          .then(response => {
            this.$router.push("/");
          });
      }
    },
    watch: {
      $route: function() {
        axios
        .get("/api/bios/" + this.$route.params.id)
        .then(response => {
          this.bios = response.data;
        });
      }  
    }
};
</script>