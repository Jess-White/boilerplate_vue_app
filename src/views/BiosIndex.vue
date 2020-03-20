<template>
  <div class="bios-index">
    <h1 class="text-center mb-5">Bios</h1>
    <div class="row">
      <div class="col-sm-4 mb-2" v-for="bio in bios">
      <router-link v-bind:to="'/bios/' + bio.id">
        <div class="card">
          <div class="card-body text-info">
            <h5 class="card-name">{{bio.first_name}} {{bio.last_name}}</h5>
                        <!-- need to add organization -->
            <p class="card-text">{{bio.title}}</p>
            <p class="card-text">{{bio.bio}}</p>
            <p class="card-text">{{bio.organization_id}}</p>
          </div>
        </div>
        </router-link>
      </div>
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
        bios: []
      };
    },
  created: function() {
    axios
    .get("/api/bios")
    .then(response => {
      this.bios = response.data;
    });
  },
  methods: {}
};


</script>