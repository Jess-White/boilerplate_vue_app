<template>
  <div class="organizations-index">

    <div class="pt100 pb50 bg-dark">
        <div class="container">
            <div class="row align-items-center">
            <div class="col-lg-8 mr-auto pb50 ml-auto">
                <h2 class="h1 font300 text-white">
                    Use This Library to View and Edit <span class="text-primary">Saved</span> Organizations.
                </h2>
                <p class="lead text-white-gray">
                    Click on any tile to open a saved organizaton, view, and edit.
                </p>
                <div class="experience-card clearfix">
                    <div class="experience-inner">
                        <h3 class="experience-text">08</h3>
                    </div> 
                    <h4>Organizations Library</h4>
                </div>
            </div>
        </div>
        </div>
    </div>
    <div class="container my-4">
      <h1 class="text-center mb-5">Organizations</h1>
      <div class="row">
        <div class="col-sm-4 mb-2" v-for="organization in organizations">
          <router-link v-bind:to="'/organizations/' + organization.id">
            <div class="card">
              <div class="card-body text-info">
                <h5 class="card-name">{{organization.name}}</h5>
              </div>
            </div>
          </router-link>
        </div>
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
        organizations: []
      };
    },
  created: function() {
    axios
    .get("/api/organizations/")
    .then(response => {
      this.organizations = response.data;
    });
  },
  methods: {}
};


</script>

<!--   create_table "organizations", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end -->