<template>
  <section>
    <form action="submit">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search Your Recipe..."
      />
      <i class="fa-solid fa-magnifying-glass"></i>
      <!-- Filters -->
      <select id="select-diet" v-model="selectedDiet" @change="fetchAPI">
        <option selected disabled>Select a type of diet...</option>
        <option class="diet" value="All">All</option>
        <option class="diet" value="Gluten Free">Gluten Free</option>
        <option class="diet" value="Ketogenic">Ketogenic</option>
        <option class="diet" value="Vegetarian">Vegetarian</option>
        <option class="diet" value="Lacto-Vegetarian">Lacto-Vegetarian</option>
        <option class="diet" value="Ovo-Vegetarian">Ovo-Vegetarian</option>
        <option class="diet" value="Vegan">Vegan</option>
        <option class="diet" value="Pescetarian">Pescetarian</option>
        <option class="diet" value="Primal">Primal</option>
        <option class="diet" value="Low FODMAP">Low FODMAP</option>
        <option class="diet" value="Whole30">Whole30</option>
      </select>

      <button @click.prevent="fetchAPI">Submit</button>
    </form>

    <div class="results">
      <div
        class="recipe"
        v-for="recipe in data"
        :key="recipe.id"
        @click="showRecipeDetails(recipe)"
      >
        <img :src="recipe.image" :alt="recipe.title" />
        <h2>{{ recipe.title }}</h2>
      </div>
    </div>

    <!-- Recipe details -->
    <div class="modal" v-if="selectedRecipe">
      <h2>{{ selectedRecipe.title }}</h2>
      <img :src="selectedRecipe.image" :alt="selectedRecipe.title" />
      <div class="ingredients">
        <h3>Ingredients</h3>
        <ul>
          <li
            v-for="ingredient in selectedRecipe.extendedIngredients"
            :key="selectedRecipe.extendedIngredients.id"
          >
            {{ ingredient.original }}
          </li>
        </ul>
      </div>

      <h3>Instructions</h3>

      <p>{{ selectedRecipe.instructions }}</p>

      <button @click="selectedRecipe = null">Back</button>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
// Variables api
const apiUrl = import.meta.env.VITE_API_URL;
const apiKey = import.meta.env.VITE_API_KEY;
// Variable para guardar el valor del input
const searchQuery = ref("");
// Variable para guardar un array con el resultado de la busqueda
const data = ref([]);
// Variable filtros dieta
const selectedDiet = ref("All");
// Variable id Recipe
const selectedRecipe = ref(null);

onMounted(fetchAPI);

//   Fectch API
async function fetchAPI() {
  // Ternario para elegir una url de la API
  const BASE_URL = searchQuery.value
    ? `${apiUrl}complexSearch?apiKey=${apiKey}&query=${searchQuery.value}&diet=${selectedDiet.value}&number=2`
    : `${apiUrl}complexSearch?apiKey=${apiKey}&random&number=2&tags=${selectedDiet.value}`;

  console.log("Ha entrado en all fetch");
  const response = await fetch(BASE_URL);
  const responseData = await response.json(); // convertir el resultado en un json
  console.log(responseData.results);
  data.value = responseData.results;
}

// Function show recipe
function showRecipeDetails(recipe) {
  fetch(`${apiUrl}/${recipe.id}/information?apiKey=${apiKey}`)
    .then((response) => response.json())
    .then((responseData) => {
      selectedRecipe.value = responseData;
      console.log(selectedRecipe.value);
    });
}
</script>

<style scoped></style>
