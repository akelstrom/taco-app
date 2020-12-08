var recipeContainer = document.getElementById("recipe-container");
var baseContainer = document.getElementById("base-container")
var mixinContainer = document.getElementById("mixin-container");
var shellContainer = document.getElementById("shell-container");
var condimentContainer = document.getElementById("condiments-container");
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
      //add to page
      recipeContainer.innerHTML = `<p>${result}</p>`;

      //add additional recipe details if provided
      if (response.base_layer) {
        console.log("yes base");
        console.log(response.base_layer.recipe);
        var md = window.markdownit();
        var base_layer = md.render(response.base_layer.recipe);
        baseContainer.innerHTML = `<p>${base_layer}</p>`;
      }
      else if(!response.base_layer) {
        console.log("no base");
      }

      if(response.mixin) {
          console.log("yes mixin");
          var md = window.markdownit();
          var mixin = md.render(response.mixin.recipe);
          mixinContainer.innerHTML = `<p>${mixin}</p>`
      }
      
      if (response.shell) {
          console.log("yes shell");
          var md = window.markdownit();
          var shell = md.render(response.shell.recipe);
          shellContainer.innerHTML = `<p>${shell}</p>`
      }

      if (response.condiment) {
          console.log("yes condiments");
          console.log(response.condiment);
          var condiment = md.render(response.condiment.recipe);
          condimentContainer.innerHTML = `<p>${condiment}</p>`
      } 
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