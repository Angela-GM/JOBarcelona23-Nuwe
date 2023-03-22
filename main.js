// Datos de API
const API_KEY = "eb5b6d995bec41aabcdb4fc246a6209f";

// DOM selector
const searchForm = document.querySelector("form");
const searchResultDiv = document.querySelector(".search-result");
const container = document.querySelector(".container");
const filterDiet = document.querySelector("#select-diet");
let filterDietSelect = "All";
let searchQuery = "";

// Submit event
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector("input").value;
  fetchAPI();
});

// select filter diet
filterDiet.addEventListener("change", () => {
  filterDietSelect = filterDiet.value;
  console.log("Este es el filtro que se aplicará " + filterDietSelect);
});

//   Fectch API
async function fetchAPI() {
  let BASE_URL = "";
  if (filterDietSelect === "All") {
    BASE_URL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query='${searchQuery}'`;
    console.log("Ha entrado en all fetch");
  } else {
    BASE_URL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query='${searchQuery}&diet='${filterDietSelect}'`;
    console.log("Ha seleccionado un filtro de dieta");
  }

  const response = await fetch(BASE_URL);
  const data = await response.json(); // convertir el resultado en un json
  //   console.log(data.results);
  generateHTML(data.results);
}

// Show Results
function generateHTML(results) {
  container.classList.remove("initial");
  let generatedHTML = "";
  if (filterDietSelect === "All") {
    results.map((result) => {
      generatedHTML += `
              <div class="item">
                    <img src=${result.image} alt=${result.title} />
                    <div class="flex-container">
                      <h2 class="title">${result.title}</h2>
                    </div>
                  </div>`;
    });
  } else {
    results.map((result) => {
      generatedHTML += `
              <div class="item">
                    <img src=${result.image} alt=${result.title} />
                    <div class="flex-container">
                      <h2 class="title">${result.title}</h2>
                    </div>
                  </div>`;
    });
  }

  searchResultDiv.innerHTML = generatedHTML;
}

console.log(
  `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query='${searchQuery}'`
);
