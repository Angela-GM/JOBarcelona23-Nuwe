<template>
  <!-- Component Header -->
  <Header />
  <section class="section-search">
    <!-- Form search recipe -->

    <form action="submit" class="form-search">
      <div class="container-search">
        <!-- Input search recipe -->

        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search Your Recipe..."
        />

        <!-- Filters -->
        <select id="select-diet" v-model="selectedDiet" @change="fetchAPI">
          <option selected disabled>Select a type of diet...</option>
          <option class="diet" value="All">All</option>
          <option class="diet" value="Gluten Free">Gluten Free</option>
          <option class="diet" value="Ketogenic">Ketogenic</option>
          <option class="diet" value="Vegetarian">Vegetarian</option>
          <option class="diet" value="Lacto-Vegetarian">
            Lacto-Vegetarian
          </option>
          <option class="diet" value="Ovo-Vegetarian">Ovo-Vegetarian</option>
          <option class="diet" value="Vegan">Vegan</option>
          <option class="diet" value="Pescetarian">Pescetarian</option>
          <option class="diet" value="Primal">Primal</option>
          <option class="diet" value="Low FODMAP">Low FODMAP</option>
          <option class="diet" value="Whole30">Whole30</option>
        </select>
      </div>

      <div class="btn-search">
        <button @click.prevent="fetchAPI" class="btn">
          <i class="fa-solid fa-magnifying-glass"></i>Search Recipes
        </button>
      </div>
    </form>
  </section>

  <section class="section-results">
    <div
      class="recipe"
      v-for="recipe in data"
      :key="recipe.id"
      @click="showRecipeDetails(recipe)"
    >
      <div>
        <img :src="recipe.image" :alt="recipe.title" />
      </div>

      <div>
        <h4>{{ recipe.title }}</h4>
      </div>
    </div>
  </section>

  <!-- Modal recipe details -->

  <!-- Overlay -->
  <transition name="fade">
    <div
      @click="selectedRecipe = null"
      class="modal-overlay"
      v-if="selectedRecipe"
    ></div>
  </transition>

  <transition name="fade">
    <section class="section-details">
      <!-- Recipe details -->
      <div class="modal-container" v-if="selectedRecipe">
        <div class="image-details">
          <img :src="selectedRecipe.image" :alt="selectedRecipe.title" />
          <div class="title-details">
            <h2>{{ selectedRecipe.title }}</h2>
          </div>
        </div>

        <div class="ingredients-details">
          <!-- card extra -->
          <div class="extra-info">
            <h5>Info</h5>
            <div class="header-extra">
              <div class="list-info">
                <ol>
                  <li>
                    <i class="fa-regular fa-clock"></i>
                    {{ selectedRecipe.readyInMinutes }} minutes
                  </li>
                  <li>
                    <i class="fa-solid fa-utensils"></i>
                    {{ selectedRecipe.servings }} servings
                  </li>
                </ol>
              </div>
            </div>

            <!-- diet info -->
            <div
              v-if="
                selectedRecipe.glutenFree ||
                selectedRecipe.vegetarian ||
                selectedRecipe.vegan ||
                selectedRecipe.lowFodmap
              "
            >
              <h5>Diet</h5>
              <div class="header-extra">
                <div class="list-info">
                  <ol>
                    <li v-show="selectedRecipe.glutenFree">
                      <i class="fa-solid fa-wheat-awn-circle-exclamation"></i>
                      Gluten Free
                    </li>
                    <li v-show="selectedRecipe.vegetarian">
                      <i class="fa-solid fa-seedling"></i>
                      Vegetarian
                    </li>
                    <li v-show="selectedRecipe.vegan">
                      <i class="fa-solid fa-leaf"></i>
                      Vegan
                    </li>
                    <li v-show="selectedRecipe.lowFodmap">
                      <i class="fa-solid fa-apple-whole"></i>
                      Low FODMAP
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <div class="ingredients">
            <h3>Ingredients</h3>

            <div class="icons-ingredients">
              <ul>
                <li
                  v-for="ingredient in selectedRecipe.extendedIngredients"
                  :key="selectedRecipe.extendedIngredients.id"
                >
                  <div class="icon">
                    <i class="fa-regular fa-square-check"></i>
                  </div>

                  <div class="item.ingredients">
                    {{ ingredient.original }}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="instructions">
          <h3>Instructions</h3>

          <ol>
            <li v-for="steps in selectedRecipe.analyzedInstructions[0].steps">
              <div class="number">
                <span
                  class="number-list"
                  v-bind:style="{ counterIncrement: 'step-counter' }"
                ></span>
              </div>

              <div class="border">
                {{ steps.step }}
              </div>
            </li>
          </ol>
        </div>

        <div class="center-btn">
          <button @click="selectedRecipe = null" class="btn">
            Back to Results
          </button>
        </div>
      </div>
    </section>
  </transition>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Header from "./components/Header.vue";
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
    ? `${apiUrl}complexSearch?apiKey=${apiKey}&query=${searchQuery.value}&diet=${selectedDiet.value}&number=9`
    : `${apiUrl}complexSearch?apiKey=${apiKey}&random&number=9&tags=${selectedDiet.value}`;

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
