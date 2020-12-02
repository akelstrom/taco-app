var randomRecipe = function() {
    fetch(
        'http://taco-randomizer.herokuapp.com/random/?full-taco=true'
    )
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        console.log(response.data[0]);
    })
}

randomRecipe();