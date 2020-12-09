var savedList = document.getElementById("saved-recipes");

//load saved recipes from local storage
var savedRecipes = JSON.parse(localStorage.getItem("recipes"));

//load recipes to page
function loadMyRecipes() {
    for (let i = 0; i < savedRecipes.length; i++) {
        var recipeListItem = document.createElement('li');
        savedList.appendChild(recipeListItem);
        //add header
        var recipeHeader = document.createElement('div');
        recipeListItem.appendChild(recipeHeader);
        recipeHeader.innerHTML = `<p>${savedRecipes[i].name}</p>`
        recipeHeader.classList.add("collapsible-header");
        //add body
        var recipeBody = document.createElement('div');
        recipeListItem.appendChild(recipeBody);
        recipeBody.innerHTML = savedRecipes[i].recipe + savedRecipes[i].shell + 
        savedRecipes[i].base_layer + savedRecipes[i].mixin + savedRecipes[i].condiment;
        recipeBody.classList.add("collapsible-body");
    }
}
loadMyRecipes();
