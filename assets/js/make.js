var recipeContainer = document.getElementById("recipe-container")
var getRecipeButton = document.getElementById("get-recipe-button")

var randomRecipe = function() {
    fetch(
        'http://taco-randomizer.herokuapp.com/random/?full-taco=true'
    )
    .then(function(response) {
        return response.json();
        
    })
    .then(function(response) {
        // var lastRecipe = JSON.parse(response)
        // var recipe = document.createElement("p");
        // recipe.textContent = response
        console.log(response)
    recipeContainer.innerHTML = `<h1>${response.name}</h1> <p>${response.recipe}</p>`
    })
}

getRecipeButton.addEventListener('click', randomRecipe);
