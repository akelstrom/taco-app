var restaurant = localStorage.getItem("favelocation");
var faveSpot = document.getElementById("getFaveSpot");
faveSpot.innerHTML = `<header> Hello </header>`;

var foodPlaces = localStorage.getItem("faveLocation");
console.log("foodPlaces: ", JSON.parse(foodPlaces));

// document.getElementById("getFaveSpot").addEventListener("click", function() {

// });
