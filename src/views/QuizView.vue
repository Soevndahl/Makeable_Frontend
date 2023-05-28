<script setup lang="ts">
import Quiz from '../components/Quiz.vue'
import Navbar from "../components/Navbar.vue"
import {userStore} from "../stores/counter"

const finalResult = userStore().result;

const props = defineProps({
  niveau: { type: String, required: true }
})

const token = localStorage.getItem("token");

</script>


<template>
    <header>
        <Navbar/>
    </header>
    <div v-if="token===null">
      <h1>Remember to Login</h1>
    </div>
<div v-else>
  <div v-if="finalResult.onGoing.valueOf()">
    <Quiz :difficulty="niveau"  />
  </div>
  <div id="elseDiv" v-else>
    <h2>You scored {{ finalResult.score }} out of 10 points</h2>
  </div>

</div>
</template>


<style scoped>

#elseDiv {
  display: flex;
  justify-content: center;
  margin: 10%;
}

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