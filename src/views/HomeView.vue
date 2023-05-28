<script setup lang="ts">

import Navbar from "../components/Navbar.vue"

const token = localStorage.getItem("token");

</script>

<template>
  <header>
    <Navbar/>
  </header>
  <main v-if="token">
    <h1>
      Choose difficulty in the menu.
    </h1>
  </main>
  <main v-else>
    <h1>Remember to Login</h1>
  </main>
</template>

<style scoped>

h1 {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: x-large;
  /* display: flex; */
  margin-top: 40px;
  text-align: center;
  font-weight: 1000;
  text-transform: uppercase;
  letter-spacing: 1px;
  word-spacing: 2px;
}

</style>