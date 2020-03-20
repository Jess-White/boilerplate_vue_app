<template>
  <div class="boilerplates-index">
    <h1 class="text-center mb-5">Boilerplates</h1>
    
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

</template>

<style>
</style>

<script>
  var axios = require("axios");

  export default {
    data: function() {
      return {
        currentBoilerplate: {},
        boilerplates: []
      };
    },
  created: function() {
    axios
    .get("/api/boilerplates")
    .then(response => {
      this.boilerplates = response.data;
    });
  },
  methods: {}
};


</script>