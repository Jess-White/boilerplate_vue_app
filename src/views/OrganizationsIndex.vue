<template>
  <div class="organizations-index">
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