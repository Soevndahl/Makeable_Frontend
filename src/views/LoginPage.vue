<script setup lang="ts">
import Login from "../components/Login.vue";
const token = localStorage.getItem("token");
</script>


<template>
  <div id="LoginPage">
    <Login/>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .LoginPage {
    display: flex;
    align-items: center;
  }
}
</style>