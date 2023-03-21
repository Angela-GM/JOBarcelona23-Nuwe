// Datos de API
const API_KEY = "eb5b6d995bec41aabcdb4fc246a6209f";

// DOM selector
const searchForm = document.querySelector("form");
const searchResultDiv = document.querySelector(".search-result");
const container = document.querySelector(".container");

let searchQuery = "";

// Submit event
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector("input").value;
  fetchAPI();
});

//   Fectch API
async function fetchAPI() {
  const BASE_URL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query="${searchQuery}"`;
  const response = await fetch(BASE_URL);
  const data = await response.json(); // convertir el resultado en un json
  //   console.log(response);
  //   generateHTML(data);
  console.log(data.results);
  generateHTML(data.results);
}

function generateHTML(results) {
  container.classList.remove("initial");
  let generatedHTML = "";
  results.map((result) => {
    generatedHTML += `
      <div class="item">
            <img src=${result.image} alt=${result.title} />
            <div class="flex-container">
              <h2 class="title">${result.title}</h2>
            </div>
          </div>`;
  });
  searchResultDiv.innerHTML = generatedHTML;
}
