var recipeContainer = document.getElementById("recipe-container");
var baseContainer = document.getElementById("base-container");
var mixinContainer = document.getElementById("mixin-container");
var shellContainer = document.getElementById("shell-container");
var condimentContainer = document.getElementById("condiments-container");
var nameContainer = document.getElementById("name-container");
var getRecipeButton = document.getElementById("get-recipe-button");
var saveRecipeButton = document.getElementById("save-recipe-button");

//load saved recipes from local storage
var savedRecipes = JSON.parse(localStorage.getItem("recipes"));

//if there are none, initiate with empty array
if (!savedRecipes) {
  savedRecipes = [];
}

//generate random recipe
var randomRecipe = function () {
  fetch("https://taco-randomizer.herokuapp.com/random/?full-taco=true")
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      nameContainer.innerHTML = response.name;

      //parse recipe to json/html
      var md = window.markdownit();
      var result = md.render(response.recipe);
      //add to page
      recipeContainer.innerHTML = `<p>${result}</p>`;

      //add additional recipe details if provided
      if (response.base_layer) {
        var md = window.markdownit();
        var base_layer = md.render(response.base_layer.recipe);
        baseContainer.innerHTML = `<p>${base_layer}</p>`;
      }

      if (response.mixin) {
        var md = window.markdownit();
        var mixin = md.render(response.mixin.recipe);
        mixinContainer.innerHTML = `<p>${mixin}</p>`;
      }

      if (response.shell) {
        var md = window.markdownit();
        var shell = md.render(response.shell.recipe);
        shellContainer.innerHTML = `<p>${shell}</p>`;
      }

      if (response.condiment) {
        var condiment = md.render(response.condiment.recipe);
        condimentContainer.innerHTML = `<p>${condiment}</p>`;
      }
    });
};

//load a recipe when page loads
randomRecipe();

//save a recipe to local storage
var saveRecipe = function () {
  var lastRecipeName = nameContainer.innerHTML;
  var lastRecipe = recipeContainer.innerHTML;
  var lastBase = baseContainer.innerHTML;
  var lastMixin = mixinContainer.innerHTML;
  var lastShell = shellContainer.innerHTML;
  var lastCondiment = condimentContainer.innerHTML;
  var recipeObject = {
    name: lastRecipeName,
    recipe: lastRecipe,
    base_layer: lastBase,
    mixin: lastMixin,
    shell: lastShell,
    condiment: lastCondiment,
  };

  savedRecipes.push(recipeObject);
  localStorage.setItem("recipes", JSON.stringify(savedRecipes));
  M.toast({
    html: "This recipe has been saved!",
    classes: "rounded red lighten-1",
  });
};

getRecipeButton.addEventListener("click", randomRecipe);
saveRecipeButton.addEventListener("click", saveRecipe);
