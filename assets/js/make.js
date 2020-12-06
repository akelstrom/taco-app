var recipeContainer = document.getElementById("recipe-container")
var getRecipeButton = document.getElementById("get-recipe-button")
var saveRecipeButton = document.getElementById("save-recipe-button")

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
    .then(function(response) {
        console.log(response)

        var index = response.recipe.split('\n').indexOf("-------------")
        console.log(index);
        console.log(response.recipe.split('.'));

        //parse recipe to json/html
        var md = window.markdownit();
        var result = md.render(response.recipe);
        console.log(result);

        //add to page
        recipeContainer.innerHTML = `<p>${result}</p>`
    })
}

//save a recipe to local storage
var saveRecipe = function() {
    savedRecipes.push(recipeContainer.innerHTML);
    localStorage.setItem('recipes', JSON.stringify(savedRecipes));

}

saveRecipeButton.addEventListener('click', saveRecipe);
getRecipeButton.addEventListener('click', randomRecipe);
