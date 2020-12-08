var faveSpot = document.getElementById("getFaveSpot");

var foodPlaces = JSON.parse(localStorage.getItem("faveLocation"));

function formatPlace(data) {
  return `<h6>${data.name}</h6><p>${data.address} </br> ${data.phoneNumber} </br> ${data.website}</p>`;
}
var loadFoodPlaces = function () {
  for (let i = 0; i < foodPlaces.length; i++) {
    var restaurantList = document.createElement("li");
    restaurantList.innerHTML = formatPlace(foodPlaces[i]);
    faveSpot.appendChild(restaurantList);
    restaurantList.classList.add("restaurant-list");
  }
};
console.log(foodPlaces);
loadFoodPlaces();
