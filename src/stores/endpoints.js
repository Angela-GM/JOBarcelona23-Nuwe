import { ref } from "vue";
import { defineStore } from "pinia";
import { apiKey } from "../api.js";

export const useApiStore = defineStore("counter", () => {
  const searchQuery = ref("");
  const urlSearch = ref(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query='${searchQuery}'`
  );

  //   Fetch API
  async function fetchAPI() {
    let BASE_URL = ref("");
    BASE_URL = urlSearch.value;
    console.log("Ha entrado en all fetch");

    const response = await fetch(BASE_URL);
    const data = await response.json(); // convertir el resultado en un json
    //   console.log(data.results);
    // generateHTML(data.results);
  }

  return { urlSearch, searchQuery, fetchAPI };
});
