const searchButton = document.getElementById("search-btn");
let selectTag = document.getElementById("nation");
let mealCategory = document.getElementById("mealcat");
let letterCategory = document.getElementById("letter-category");
let selectTagzz = document.getElementsByTagName("select");
let ingredientCategory = document.getElementById("ingredient-category");
let RandomMealz = document.getElementById('random');

let displayResult = document.getElementById("display-result");
displayResult.style.display = "none";

let nationalityArr = [];
let mealCategoryArray = [];
let alphabet = [];
let ingredientsArray = [];


let iloading  = document.querySelector('.iloading');
let nloading  = document.querySelector('.nloading');
let mloading  = document.querySelector('.mloading');
let cloading  = document.querySelector('.cloading');
// for(i=0; i<loading.length; i++){
//   loading[i].innerText = "Loading..."
// }

let randomFood = document.getElementById("random");

randomMeal();
async function randomMeal() {
  let randomMeal = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  );
  let ranMealData = await randomMeal.json();
  var maxL = 425;
  let foodElement = `
      <h4 class="text-center">Random Meal for you</h4>
      <div class="jumbotron " id="jumbo">
                <div class="row">
                    <div class="col-md-12 col-lg-12 col-xl-8">
                        <div class = food-img>
                        <img src="${ranMealData.meals[0].strMealThumb}" class="img-fluid" alt="news-img">
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-12 col-xl-4">
                    <div class="content">
                        <h4 class="random-meal-text">${ranMealData.meals[0].strMeal}</h4>
                        <p>${ranMealData.meals[0].strInstructions.length > maxL ? ranMealData.meals[0].strInstructions.substr(0, maxL) + `...<a class="random-link" data-toggle="modal" data-target=".bd-example-modal-lg" onclick="getInstructions('${ranMealData.meals[0].idMeal}');">Read More</a>`: ranMealData.meals[0].strInstructions + `...<a class="random-link" data-toggle="modal" data-target=".bd-example-modal-lg" onclick="getInstructions('${ranMealData.meals[0].idMeal}');">View Video</a>`}</p>
                            
                </div>
               
            </div>         
        </div>  
            
      </div>
        `;

  randomFood.innerHTML = foodElement;
}

searchButton.addEventListener("click", searchFood);

async function searchFood() {
  RandomMealz.style.display ="none";
  for (i = 0; i < selectTagzz.length; i++) {
    selectTagzz[i].value = "";
  }
  let row = document.getElementById("cards");
  row.innerHTML = "";
  const searchBox = document.getElementById("search-box").value.trim();
  displayResult.style.display = "block";
  displayResult.setAttribute('class', 'display-res');
      displayResult.innerHTML = `<h4 class="text-center p-2 m-1">Display result for: ${searchBox}</h4>`;
  const searchData = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchBox}`
  );
  const searchFoodData = await searchData.json();

  displayFood(searchFoodData.meals);
}

filterByIngredient();

async function filterByIngredient() {
  const ingredients = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  const filterIngredients = await ingredients.json();

  filterIngredients.meals.forEach((meal) => {
    ingredientsArray.push(meal.strIngredient);
  });
  displayOption(ingredientsArray);
}




filterByNationality();
async function filterByNationality() {
  const nationality = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  const filterNationality = await nationality.json();

  filterNationality.meals.forEach((meal) => {
    nationalityArr.push(meal.strArea);
  });

  displayOption(nationalityArr);
}


filterByMealCategory();
async function filterByMealCategory() {
  const nationality = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?c=list`
  );
  const filterNationality = await nationality.json();

  filterNationality.meals.forEach((meal) => {
    mealCategoryArray.push(meal.strCategory);
  });
  

  displayOption(mealCategoryArray);
}






filterByLetter();
function filterByLetter() {
  const alpha = Array.from(Array(26)).map((e, i) => i + 65);
  alphabet = alpha.map((x) => String.fromCharCode(x));

  displayOption(alphabet);
}



function displayOption(filter) {
  if (ingredientsArray.includes(filter[1])) {
    filter.forEach((element) => {
      let option = document.createElement("option");
      option.innerText = element;
      ingredientCategory.appendChild(option);
    });
  }else if(nationalityArr.includes(filter[0])) {
    filter.forEach((element) => {
      let option = document.createElement("option");
      option.innerText = element;
      selectTag.appendChild(option);
    });
  } else if (mealCategoryArray.includes(filter[0])) {
    filter.forEach((element) => {
      let option = document.createElement("option");
      option.innerText = element;
      mealCategory.appendChild(option);
    });
  } else if (alphabet.includes(filter[0])) {
    filter.forEach((element) => {
      let option = document.createElement("option");
      option.innerText = element;
      letterCategory.appendChild(option);
    });
  }
}

for (i = 0; i < selectTagzz.length; i++) {
  selectTagzz[i].addEventListener("change", async function (e) {
    RandomMealz.style.display ="none";
    document.getElementById("search-box").value = "";
    let row = document.getElementById("cards");
    row.innerHTML = "";
    if (nationalityArr.includes(e.target.value)) {
      displayResult.style.display = "block";
      displayResult.innerHTML = `<h4 class="text-center p-2 m-1">Display result for: ${e.target.value}</h4>`;
      mealCategory.value = "";
      letterCategory.value = "";
      ingredientCategory.value = "";
      var change = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${e.target.value}`
      );
    } else if (mealCategoryArray.includes(e.target.value)) {
      displayResult.style.display = "block";
      displayResult.innerHTML = `<h4 class="text-center p-2 m-1">Display result for: ${e.target.value}</h4>`;
      selectTag.value = "";
      letterCategory.value = "";
      ingredientCategory.value = "";
      var change = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${e.target.value}`
      );
    } else if (alphabet.includes(e.target.value)) {
      displayResult.style.display = "block";
      displayResult.innerHTML = `<h4 class="text-center p-2 m-1">Display result for: ${e.target.value}</h4>`;
      ingredientCategory.value = "";
      mealCategory.value = "";
      selectTag.value = "";
      var change = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?f=${e.target.value}`
      );
    } else if (ingredientsArray.includes(e.target.value)) {
      displayResult.style.display = "block";
      displayResult.innerHTML = `<h4 class="text-center p-2 m-1">Display result for: ${e.target.value}</h4>`;
      mealCategory.value = "";
      selectTag.value = "";
      letterCategory.value = "";
      var change = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${e.target.value}`
      );
    } else if(selectTag.value === "" ||  mealCategory.value === "" || letterCategory.value === "" || ingredientCategory.value === ""){
      displayResult.style.display = "none";
      RandomMealz.style.display ="block";
    }
    
    else {
      displayResult.style.display = "block";
      displayResult.innerHTML = `<h4 class="text-center p-2 m-1">No Results Found</h4>`;
    }

    const changedData = await change.json();
    displayFood(changedData.meals);
  });
}

// selectTag.addEventListener("change", async function (e) {
//   let row = document.getElementById("cards");
//   row.innerHTML = "";
//   let change = await fetch(
//     `https://www.themealdb.com/api/json/v1/1/filter.php?a=${e.target.value}`
//   );
//   const changedData = await change.json();
//   displayFood(changedData.meals);
// });

function displayFood(meals) {
  if (meals === null) {
    displayResult.style.display = "block";
    displayResult.innerHTML = `<h4 class="text-center p-2">No Results Found</h4>`;
  }
  meals.forEach((meal) => {
    let cardElement = `
      <div class="card my-card bg-dark mb-2 m-1 text-center" style="height:100%"  >
        <div class="overflow">
            <img src=${meal.strMealThumb} class="card-img-top" alt="food-img">
        </div>
        <div class="card-body d-flex flex-column " >
        <p class="card-title h3" >${meal.strMeal}</p>
       
        <button class="mt-auto btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-lg" onclick="getInstructions('${meal.idMeal}');">View Instructions</button
        </div>
    </div>  `;
    let row = document.getElementById("cards");
    let column = document.createElement("div");
    column.className = "col-12 col-sm-6 col-md-4 col-lg-4 p-1 ";
    column.innerHTML = cardElement;
    row.appendChild(column);
  });
}

async function getInstructions(mealData) {
  const searchMeal = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealData}`
  );
  const searchMealData = await searchMeal.json();

  const modal = document.getElementById("recipee-modal");
  modal.innerHTML = `



      <div class="card-body modal-card">
      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <h4 class="card-title">${searchMealData.meals[0].strMeal}</h4>
        
        <p class="card-text modal-text">${searchMealData.meals[0].strInstructions}</p>
        <button class="btn btn-primary" data-toggle="modal" data-target=".video" onclick="playVideo('${searchMealData.meals[0].strYoutube}');">View Video</button
        </div>
    
    
    `;
}

function playVideo(videoUrl) {
  var parts = videoUrl.split("=");
  var lastSegment = parts.pop() || parts.pop();

  const vmodal = document.getElementById("video-modal");
  vmodal.innerHTML = `
    <div class="card-body modal-card" >
    <button type="button" class="close"  onclick="closeVideo()" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
          <div class="modal-video embed-responsive embed-responsive-16by9">
            <iframe class="embed-responsive-item" id="closeVideo" src="https://www.youtube.com/embed/${lastSegment}"
              allowfullscreen></iframe>
          </div>
          </div>
    `;
}


function closeVideo(){
  let closeVid = document.getElementById('closeVideo');
 closeVid.setAttribute('src', '');
}

// let closeVideo = document.getElementById('closeVideo');
// console.log(closeVideo);

