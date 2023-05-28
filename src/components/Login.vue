<script setup lang="ts">
import { ref } from "vue";
import {userStore} from "../stores/counter"
import router from "@/router";

const DefaultUserEmail = userStore().email;
const DefaultUserPassword = userStore().password;

const email = ref("");
const password = ref("");

function checkLogin () {
    if ((DefaultUserEmail === email.value) && (DefaultUserPassword === password.value))
        return true;
    return false;
}

async function getSessionToken () {

  const url = "https://opentdb.com/api_token.php?command=request";

  try {
      const result = await fetch(url, { 
          method: "GET"
      });

      const apiData = await result.json();
      localStorage.setItem("token",apiData.token);

      return result.ok;
  } catch (error) {
      console.log(error);
      return false;
      }

}


async function onSubmit () {
    if (checkLogin()) {
        
        getSessionToken();
        alert("Correct Login");
        router.push('/home');
        return
    }
    alert("Wrong Login");
}

</script>

<template>
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Login to start Quiz</h2>
        
      </div>
  
      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <!-- <form class="space-y-6" @submit="onSubmit" action="/easy" method="POST"> -->
        <form class="space-y-6" @submit="onSubmit">
          <div>
            <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
            <div class="mt-2">
              <input v-model="email" id="email" name="email" type="email" autocomplete="email" required="true" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>
  
          <div>
            <div class="flex items-center justify-between">
              <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
            </div>
            <div class="mt-2">
              <input v-model="password" id="password" name="password" type="password" autocomplete="current-password" required="true" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>
  
          <div>
            <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
          </div>
        </form>
  
      </div>
    </div>
  </template>