<template>
  <div class="logout">
  </div>
</template>

<script>
import axios from "axios";

export default {
  created: function() {
    delete axios.defaults.headers.common["Authorization"];
    
    this.$parent.userEmail = '';
    localStorage.removeItem("jwt");

    this.$router.push("/");
  }
};
</script>