<template>
  <section>
    <form action="submit">
      <input v-model="searchQuery" type="text" />
      <button @click.prevent="fetchAPI">Submit</button>
    </form>

    <div class="results">
      <div class="recipe" v-for="recipe in data" :key="recipe.id">
        <img :src="recipe.image" :alt="recipe.title" />
        <h2>{{ recipe.title }}</h2>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
// Variables api
const apiUrl = import.meta.env.VITE_API_URL;
const apiKey = import.meta.env.VITE_API_KEY;
const searchQuery = ref("");
const data = ref([]);

//   Fectch API
async function fetchAPI() {
  const BASE_URL = `${apiUrl}complexSearch?apiKey=${apiKey}&query='${searchQuery.value}'`;
  console.log("Ha entrado en all fetch");

  const response = await fetch(BASE_URL);
  const responseData = await response.json(); // convertir el resultado en un json
  console.log(responseData.results);
  data.value = responseData.results;
}
</script>

<style></style>
