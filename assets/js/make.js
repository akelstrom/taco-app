var recipeContainer = document.getElementById("recipe-container");
var getRecipeButton = document.getElementById("get-recipe-button");
var saveRecipeButton = document.getElementById("save-recipe-button");

var randomRecipe = function () {
  fetch("http://taco-randomizer.herokuapp.com/random/?full-taco=true")
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log(response);

      var index = response.recipe.split("\n").indexOf("-------------");
      console.log(index);
      console.log(response.recipe.split("."));

      //parse recipe to json/html
      var md = window.markdownit();
      var result = md.render(response.recipe);
      console.log(result);

      //add to page
      recipeContainer.innerHTML = `<p>${result}</p>`;
    });
};

saveRecipeButton.addEventListener("click", saveRecipe);
getRecipeButton.addEventListener("click", randomRecipe);
