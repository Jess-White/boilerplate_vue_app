<template>
  <div class="grants-finalize-show">
    

    <div class="pt100 pb50 bg-dark">
        <div class="container">
            <div class="row align-items-center">
            <div class="col-lg-8 mr-auto pb50 ml-auto">
                <h2 class="h1 font300 text-white">
                    Use This Section to Create a <span class="text-primary">Printable</span> Grant.
                </h2>
                <p class="lead text-white-gray">
                    Review your saved grant or generate a pdf. 
                </p>
                <div class="experience-card clearfix">
                    <div class="experience-inner">
                        <h3 class="experience-text">01d</h3>
                    </div> 
                    <h4>Grant Builder: Print to PDF</h4>
                </div>
            </div>
        </div>
        </div>
    </div>

    <div >

     <div class="row" id="pdfMaterials">
       <div class="col-md-6">
        <h4 class="text-center">Grant Name: {{grant.name}}</h4>
        <h4 class="text-center">Purpose: {{grant.purpose}}</h4>
        <h4 class="text-center">Funding Organization: {{grant.funding_org}}</h4>
        <h4 class="text-center">Funding Organization RFP Webpage: {{grant.funding_org_rfp_webpage}}</h4>        
        <h4 class="text-center">Deadline: {{grant.deadline}}</h4>
        <h4 class="text-center">Date Submitted: {{grant.date_submitted}}</h4>
        <h4 class="text-center">Organization: {{grant.organization_id}}</h4>
       </div>
     </div>
     <div>
       <div>
        <div class="card text-center">
          <div class="card-header">
              <div class="nav-item" v-for="section in grant.sections" >
                  <div class="card-body">
                    <h5 class="card-title">{{ section.display_category }}</h5>
                      <h4>{{ section.content }}</h4>
                  </div>
              </div>
          </div>
        </div>

       </div>

       <div>

          <button class="btn btn-info m-2" v-on:click="createPDF()">Create PDF</button>
        </div>

        <div>

          <button class="btn btn-info m-2" v-on:click="createPDFTwo()">Create Demo PDF</button>
        </div>

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
  import jsPDF from 'jspdf'

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
    });
  },

  updateAllSections: function() {
    this.grant.sections.forEach(section => {
      this.updateSection(section);
    });

    this.$router.push("/grants"); 
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
  reuseGrant: function() {
      axios 
        .get("/api/grants/" + this.$route.params.id + "/copy")
        .then(response => {
          this.$router.push("/grants/" + response.data.id + "/finalize");

        })
        .catch(error => {
                  console.log(error.response.data.
                    errors);
                  console.log(this.status = error.response.status);});
    },
    createPDF: function() {
      var doc = new jsPDF();
      doc.fromHTML(document.getElementById('pdfMaterials'), 20, 20);
      doc.setFontSize(40);
      doc.save('grant.pdf');
    },

    createPDFTwo: function() {
      var doc = new jsPDF();
      doc.text("Hi Laura, I made you a pdf", 20, 20);
      doc.setFontSize(50);
      doc.save('grant.pdf');
    },

    // createPDF: function() {
    //   var doc = new jsPDF();
    //   doc.setFontSize(40);
    //   doc.setFont("courier");
    //   doc.setFontStyle("bold");
    //   doc.text("test text", 20, 20);
    //   doc.save('grant.pdf');
    // },
    
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