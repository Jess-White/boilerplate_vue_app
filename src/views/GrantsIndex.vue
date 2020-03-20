<template>
  <div class="grants-index">
    <h1 class="text-center mb-5">Grants</h1>
    <div class="row">
      <div class="col-sm-4 mb-2" v-for="grant in grants">
      <router-link v-bind:to="'/grants/' + grant.id">
        <div class="card">
          <div class="card-body text-info">
            <h5 class="card-name">{{grant.name}}</h5>
                        <!-- need to add organization -->
            <p class="card-text">{{grant.purpose}}</p>
            <p class="card-text">{{grant.funding_org}}</p>
            <p class="card-text">{{grant.funding_org_website}}</p>
            <p class="card-text">{{grant.funding_org_rfp_webpage}}</p>
            <p class="card-text">{{grant.deadline}}</p>
            <p class="card-text">{{grant.date_submitted}}</p>
            <p class="card-text">{{grant.organization_id}}</p>
            <p class="card-text" v-for="section in sections">{{grant.section}}</p>

<!--             need method for org id -->
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
        grants: []
      };
    },
  created: function() {
    axios
    .get("/api/grants")
    .then(response => {
      this.grants = response.data;
    });
  },
  methods: {}
};


</script>