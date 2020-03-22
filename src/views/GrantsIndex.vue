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
              <p class="card-text">{{grant.title}}</p>
              <p class="card-text">{{grant.purpose}}</p>
              <p class="card-text">{{grant.funding_org}}</p>
              <p class="card-text">{{grant.funding_org_rfp_webpage}}</p>
              <p class="card-text">{{grant.deadline}}</p>
              <p class="card-text">{{grant.date_submitted}}</p>
              <p class="card-text">{{grant.organization_id}}</p>

            </div>
          </div>
          </router-link>
        </div>
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
      createPDF: function() {
        var doc = new jsPDF();
          doc.fromHTML($('#content').html(), 20, 20, {'width': 500});
          // "elementHandlers": specialElementHandlers
          doc.save('grant.pdf');
      }
    },
    watch:  {
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