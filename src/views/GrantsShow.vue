<template>
  <div class="grants-show">

     <div class="row">
       <div class="col-md-6">
        <h4 class="text-center">Grant Name: {{grant.name}}</h4>
        <h4 class="text-center">Purpose: {{grant.purpose}}</h4>
        <h4 class="text-center">Funding Organization: {{grant.funding_org}}</h4>
        <h4 class="text-center">Funding Organization RFP Webpage: {{grant.funding_org_rfp_webpage}}</h4>        
        <h4 class="text-center">Deadline: {{grant.deadline}}</h4>
        <h4 class="text-center">Date Submitted: {{grant.date_submitted}}</h4>
        <h4 class="text-center">Organization: {{grant.organization_id}}</h4>
       </div>

       <div>
        <div class="card text-center">
          <div class="card-header">
            <ul class="nav nav-tabs card-header-tabs">
              <li class="nav-item" v-for="section in grant.sections" >
                <span class="nav-link" :class="{active: section == currentSection}" @click="currentSection = section">{{ section.category }}</span>
              </li>
            </ul>
          </div>
          <div class="card-body">
            <h5 class="card-title">{{ currentSection.category }}</h5>
            <textarea 
              class="card-text" 
              v-on:input="currentSection.changed = true"  
              v-model="currentSection.content" 
              col="40" 
              row="7"
            >
            </textarea>

            <button class="btn" :class="{'btn-danger': currentSection.changed, 'btn-primary': !currentSection.changed}" @click="updateSection(currentSection)">
              Update
            </button>

          </div>
        </div>

          <div>
            <h1 class="text-center mb-5">Choose a Boilerplate</h1>
            
            <div>
              <select v-model="currentBoilerplate">
                <option v-for="boilerplate in boilerplates" :value="boilerplate"> {{ boilerplate.name}} </option>
                
              </select>

            </div>

            <div class="row">
              <div class="col-sm-4 mb-2">
                {{ currentBoilerplate.boilerplate_text }}
              </div>
            </div>
          </div>
        </div>

        <button class="btn btn-info m-2" v-on:click="addBoilerplate(currentSection)">Add Boilerplate</button>

       </div>

       <div>
          <router-link class="btn btn-info m-2" v-bind:to="'/grants/' + grant.id + '/edit'">Edit</router-link>
          <button class="btn btn-info m-2" v-on:click="destroyGrant()">Delete</button>
          <router-link class="btn btn-danger" :to="'/grants/' + (1 + grant.id)" >Next</router-link>  

        </div>

        <div>
          <button class="btn btn-info m-2" v-on:click="finalizeGrant">Finalize Grant</button>

          <button class="btn btn-info m-2" v-on:click="printableGrant">Printable Grant</button>

          <button class="btn btn-info m-2" v-on:click="reuseGrant">Reuse Grant</button>
          
        </div>
     </div> 
  </div>

</template>

<style>
.changed-red {
  border: solid red 1px;
}
</style>

<script>
  var axios = require('axios');

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
          errors: [],
          sections: []
        },
        sections: [],
        currentSection: {text: ""},
        currentBoilerplate: {},
        boilerplates: []
  };
},
created: function() {
  axios 
    .get("/api/grants/" + this.$route.params.id)
    .then(response => {
      this.grant = response.data
    });
  axios
    .get("/api/boilerplates")
    .then(response => {
      this.boilerplates = response.data;
    });
},
methods: {
  destroyGrant: function() {
    axios
      .delete("/api/grants/" + this.$route.params.id)
      .then(response => {
        this.$router.push("/");
      });
  },
  updateSection: function(inputSection) {
    var clientParams = { 
      content: inputSection.content
    };

    axios
      .patch("/api/sections/" + inputSection.id, clientParams)
      .then(response => {
        console.log(response.data);
        this.currentSection.changed = false;
      });
  },
  addBoilerplate: function(inputSection) {
    var clientParams = {
      content: inputSection.content
    };

    axios
      .patch("/api/sections/" + inputSection.id, clientParams)
      .then(response => {
        console.log(response.data);
        this.currentSection.content = this.currentSection.content + this.currentBoilerplate.boilerplate_text;
      });
  },
  finalizeGrant: function() {
    axios 
      .get("/api/grants/" + this.$route.params.id)
      .then(response => {
        this.$router.push("/grants/" + this.$route.params.id + "/finalize");
      });
  },
  printableGrant: function() {
    axios 
      .get("/api/grants/" + this.$route.params.id)
      .then(response => {
        this.$router.push("/grants/" + this.$route.params.id + "/printable");
      });
  },
  reuseGrant: function() {
    axios 
      .get("/api/grants/" + this.$route.params.id)
      .then(response => {
        this.$router.push("/grants/" + this.$route.params.id + "/reuse");
      });
  }
},
watch: {
  $route: function() {
    axios
    .get("/api/grants/" + this.$route.params.id)
    .then(response => {
      this.grant = response.data;
    });
  }
}  
};
</script>