<template>
  <div class="grants-edit">
    <div class="row">
      <form class="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-10 offset-sm-1" v-on:submit.prevent="updateGrant()">
        <h1 class="text-center mb-5">Edit Grant</h1>
        <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul>

        <div class="form-group">
          <label>Name: </label>
          <input class="form-control" type="text" v-model="grant.name">
        </div>

        <div class="form-group">
          <label>Purpose: </label>
          <input class="form-control" type="text" v-model="grant.purpose">
        </div>

        <div class="form-group">
          <label>Funding Organization: </label>
          <input class="form-control" type="text" v-model="grant.fundingOrg">
        </div>

        <div class="form-group">
          <label>Funding Organization Website: </label>
          <input class="form-control" type="text" v-model="grant.fundingOrgWebsite">
        </div>

        <div class="form-group">
          <label>Funding Organization RFP Webpage: </label>
          <input class="form-control" type="text" v-model="grant.fundingOrgRfpWebpage">
        </div>

        <div class="form-group">
          <label>Deadline: </label>
          <input class="form-control" type="text" v-model="grant.deadline">
        </div>

        <div class="form-group">
          <label>Date Submitted: </label>
          <input class="form-control" type="text" v-model="grant.dateSubmitted">
        </div>
        
        <div class="form-group">
          <label>Organization Id: </label>
          <input class="form-control" type="text" v-model="grant.organizationId">
        </div>

        <div class="form-group">
          <label>Sections:</label>
          <input class=form-control" type="text" v-model="section in grant.sections">
                     <h2>
                       {{grant.section.category}}
                     </h2>
                     <p>
                       {{grant.section.content}}
                     </p>
        </div>

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
      grant: {
        id: "",
        name: "",
        purpose: "",
        fundingOrg: "",
        fundingOrgWebsite: "",
        fundingOrgRfpWebpage: "",
        deadline: "",
        dateSubmitted: "",
        createdAt: "",
        updatedAt: "",
        organizationId: "",
        sections: []
      },
      errors: []
    };
  },
  created: function() {
    axios
      .get("/api/grants/" + this.$route.params.id)
      .then(response => {
        this.grant = response.data;
      });
  },
  methods: {
    updateGrant: function() {
      var clientParams = {
        name: this.grant.name,
        purpose: this.grant.purpose,
        funding_org: this.grant.fundingOrg,
        funding_org_website: this.grant.fundingOrgWebsite,
        funding_org_rfp_webpage: this.grant.fundingOrgRfpWebpage,
        deadline: this.grant.deadline,
        date_submitted: this.grant.dateSubmitted,
        organization_id: this.grant.organizationId
      };

    axios
    .patch("/api/grants/" + this.$route.params.id, clientParams)
    .then(response => {
      this.$router.push("/grants/" + this.$route.params.id);
    }).catch(error => {
      this.errors = error.response.data.errors;
    });
    }
  }
};
</script>