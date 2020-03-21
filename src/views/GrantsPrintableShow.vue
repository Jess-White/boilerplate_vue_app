<template>
  <div class="grants-show">
    <button class="btn" @click="createPDF">Create PDF</button>

     <div class="row">
      <div id="printable">
       <div class="col-md-6">
        <h4 class="text-center">Grant Name: {{grant.name}}</h4>
        <h4 class="text-center">Purpose: {{grant.purpose}}</h4>
        <h4 class="text-center">Funding Organization: {{grant.funding_org}}</h4>
        <h4 class="text-center">Funding Organization RFP Webpage: {{grant.funding_org_rfp_webpage}}</h4>        
        <h4 class="text-center">Deadline: {{grant.deadline}}</h4>
        <h4 class="text-center">Date Submitted: {{grant.date_submitted}}</h4>
        <h4 class="text-center">Organization: {{grant.organization_id}}</h4>

        <div>
          <h4></h4>

        </div>
       </div>

       <div>
        <div class="card text-center">
          <div class="card-header">
            <ul class="nav nav-tabs card-header-tabs">
              <li class="nav-item" v-for="section in grant.sections" >{{section.category}}
                  <div class="card-body">
                      <textarea 
                        class="card-text" 
                        v-model="section.content" 
                        col="40" 
                        row="7"
                      >
                      </textarea>
                  </div>
              </li>
            </ul>
          </div>
        </div>

       </div>
     </div>

       <div>
          <router-link class="btn btn-info m-2" v-bind:to="'/grants/' + grant.id + '/edit'">Edit</router-link>
          <button class="btn btn-info m-2" v-on:click="destroyGrant()">Delete</button>
          <router-link class="btn btn-danger" :to="'/grants/' + (1 + grant.id)" >Next</router-link>  

          <button class="btn btn-info m-2" v-on:click="finalizeGrant">Finalize Grant</button>

          <button class="btn btn-info m-2" v-on:click="printableGrant">Printable Grant</button>

          <button class="btn btn-info m-2" v-on:click="createPdf">Create PDF</button>
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
  import jsPDF from 'jspdf'
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
  createPDF() {
    var pdf = new jsPDF();
      pdf.text('Hi!', 20, 20, {'width': 500});
      // pdf.fromHTML(document.getElementById("printable"), 20, 20,{'width':500});
      pdf.save('grant.pdf')
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

