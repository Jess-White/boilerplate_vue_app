<template>
  <div class="grants-edit">

    <div class="pt100 pb50 bg-dark">
        <div class="container">
            <div class="row align-items-center">
            <div class="col-lg-8 mr-auto pb50 ml-auto">
                <h2 class="h1 font300 text-white">
                    Use This Page to <span class="text-primary">Edit</span>Saved Grants.
                </h2>
                <p class="lead text-white-gray">
                    View saved grants including all sections. Edit grant metadata. 
                </p>
                <div class="experience-card clearfix">
                    <div class="experience-inner">
                        <h3 class="experience-text">01e</h3>
                    </div> 
                    <h4>Edit Saved Grant</h4>
                </div>
            </div>
        </div>
        </div>
    </div>
    
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
          <input class="form-control" type="text" v-model="grant.funding_org">
        </div>

        <div class="form-group">
          <label>Funding Organization Website: </label>
          <input class="form-control" type="text" v-model="grant.funding_org_website">
        </div>

        <div class="form-group">
          <label>Funding Organization RFP Webpage: </label>
          <input class="form-control" type="text" v-model="grant.funding_org_rfp_webpage">
        </div>

        <div class="form-group">
          <label>Deadline: </label>
          <input class="form-control" type="text" v-model="grant.deadline">
        </div>

        <div class="form-group">
          <label>Date Submitted: </label>
          <input class="form-control" type="text" v-model="grant.date_submitted">
        </div>
        
        <div class="form-group">
          <label>Organization Id: </label>
          <input class="form-control" type="text" v-model="grant.organization_id">
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
        section: {
            category: "",
            content: ""
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

    const jwt = localStorage.getItem("jwt")
    axios
    .patch("/api/grants/" + this.$route.params.id, clientParams, {
      headers: {
        "Authorization": `Bearer ${jwt}`
      }
    })
    .then(response => {
      this.$router.push("/grants/");
    }).catch(error => {
      if (error.response.status === 401) {
        this.$router.push("/login/");
      }
      this.errors = error.response.data.errors;
    });
    }
  }
};
</script>