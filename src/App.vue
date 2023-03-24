<template>
  <section>
    <input v-model="searchQuery" type="text" />
    <button @click.prevent="fetchAPI">Submit</button>
  </section>
</template>

<script setup>
import { ref } from "vue";
// Variables api
const apiUrl = import.meta.env.VITE_API_URL;
const apiKey = import.meta.env.VITE_API_KEY;
const searchQuery = ref("");

//   Fectch API
async function fetchAPI() {
  const BASE_URL = `${apiUrl}?apiKey=${apiKey}&query='${searchQuery.value}'`;
  console.log("Ha entrado en all fetch");

  const response = await fetch(BASE_URL);
  const data = await response.json(); // convertir el resultado en un json
  console.log(data.results);
  generateHTML(data.results);
}
</script>

<style></style>
