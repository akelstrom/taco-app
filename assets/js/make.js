var recipeContainer = document.getElementById("recipe-container");
var getRecipeButton = document.getElementById("get-recipe-button");
var saveRecipeButton = document.getElementById("save-recipe-button");
//load saved recipes from local storage
var savedRecipes = JSON.parse(localStorage.getItem('recipes'))

//if there are none, initiate with empty array
if (!savedRecipes) {
    savedRecipes = [];
}

//generate random recipe
var randomRecipe = function() {
    fetch(
        'http://taco-randomizer.herokuapp.com/random/?full-taco=true'
    )
    .then(function(response) {
        return response.json();
        
    })
    .then(function (response) {
      console.log(response);

      var index = response.recipe.split("\n").indexOf("-------------");

      //parse recipe to json/html
      var md = window.markdownit();
      var result = md.render(response.recipe);

    //   if (response.mixin) {
    //     var mixin = md.render(response.mixin);
    //     recipeContainer.innerHTML = `<p>${mixin}</p>`
    //   }
    //   else {
    //       console.log("no mixin")
    //   }
    //   console.log(result);

      //add to page
      recipeContainer.innerHTML = `<p>${result}</p>`;
    });
};

//load a recipe when page loads
randomRecipe();

//save a recipe to local storage
var saveRecipe = function() {
    savedRecipes.push(recipeContainer.innerHTML);
    localStorage.setItem('recipes', JSON.stringify(savedRecipes));
}

getRecipeButton.addEventListener("click", randomRecipe);
saveRecipeButton.addEventListener("click", saveRecipe);