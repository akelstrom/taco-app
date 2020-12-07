var savedList = document.getElementById("saved-recipes");

//load saved recipes from local storage
var savedRecipes = JSON.parse(localStorage.getItem('recipes'))

function loadMyRecipes() {
    for (let i = 0; i < savedRecipes.length; i++) {
        var recipeListItem = document.createElement('li');
        recipeListItem.innerHTML = savedRecipes[i];
        savedList.appendChild(recipeListItem);
        recipeListItem.classList.add('collection-item')
    }
}

loadMyRecipes();