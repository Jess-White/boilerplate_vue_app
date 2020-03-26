<template>
  <div class="grants-new">

    <div class="pt100 pb50 bg-dark">
        <div class="container">
            <div class="row align-items-center">
            <div class="col-lg-8 mr-auto pb50 ml-auto">
                <h2 class="h1 font300 text-white">
                    Use This Form to Enter<span class="text-primary"> Basic Info</span> About Your Grant Application.
                </h2>
                <p class="lead text-white-gray">
                    As soon as you've completed the fields, hit "Add New Grant" to start building the body of your grant. 
                </p>
                <div class="experience-card clearfix">
                    <div class="experience-inner">
                        <h3 class="experience-text">01a</h3>
                    </div> 
                    <h4>Grant Builder: Start</h4>
                </div>
            </div>
        </div>
        </div>
    </div>

    <div class="row my-4"></div>
    <form class="col-6 offset-3"
    v-on:submit.prevent="createGrant()">
    <h1 class="text-center mb-5">New Grant</h1>

    <ul>
      <li class="text-danger" v-for="error in errors">{{ error }}</li>
    </ul>

    <div class="form-group">
      <label>Grant Name: </label>
      <input class="form-control" type="text" v-model="name">
    </div>

    <div class="form-group">
      <label>Purpose: </label>
      <input class="form-control" type="text" v-model="purpose">
    </div>

    <div>
      <label>Funding Organization: </label>
      <input class="form-control" type="text" v-model="fundingOrg">
    </div>

    <div class="form-group">
      <label>Funding Organization Website: </label>
      <input class="form-control" type="text" v-model="fundingOrgWebsite">
    </div>

     <div class="form-group">
      <label>Funding Organization RFP Webpage: </label>
      <input class="form-control" type="text" v-model="fundingOrgRfpWebpage">
    </div>

    <div class="form-group">
      <label>Deadline: </label>
      <input class="form-control" type="text" v-model="deadline">
    </div>

    <div class="form-group">
      <label>Date Submitted: </label>
      <input class="form-control" type="text" v-model="dateSubmitted">
    </div>
    
    <div class="form-group">
      <label>Organization Id: </label>
      <input class="form-control" type="text" v-model="organizationId">
<!--       <select v-model="currentGrant">
        <option v-for="organization in organizations" :value="organizationId"> 
          {{ grant.organization_id }}
        </option>
      </select> -->
    </div>



    <input class="btn btn-info" type="submit" value="Add New Grant">
    </form>
<!--     Need method for organization id -->
  </div>
</template>

<style></style>

<script>
  var axios = require("axios");

  export default {
    data: function() {
      return {
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
        currentGrant: {},
        errors: []

      };
    },
    created: function() {},
    methods: {
      createGrant: function() {
        var clientParams = {
          name: this.name,
          purpose: this.purpose,
          funding_org: this.fundingOrg,
          funding_org_website: this.fundingOrgWebsite,
          funding_org_rfp_webpage: this.fundingOrgRfpWebpage,
          deadline: this.deadline,
          date_submitted: this.dateSubmitted,
          organization_id: this.organizationId
      };

      axios
        .post("/api/grants/", clientParams)
        .then(response => {
          this.$router.push("/grants/" + response.data.id);
        }).catch(error => {
          this.errors = error.response.data.
            errors;
          this.status = error.response.status;
        });
    }
  }
};


</script>