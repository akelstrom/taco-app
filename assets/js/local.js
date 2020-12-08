var faveSpot = document.getElementById("getFaveSpot");

var foodPlaces = JSON.parse(localStorage.getItem("faveLocation"));

function formatPlace(data) {
  return `<h5>${data.name}</h5><p>${data.address}</p>`;
}
var loadFoodPlaces = function () {
  let i = 0;
  while (i < foodPlaces.length) {
    var restaurantList = document.createElement("li");
    restaurantList.innerHTML = formatPlace(foodPlaces[i]);
    faveSpot.appendChild(restaurantList);
    restaurantList.classList.add("collection-item");
    i++;
  }
};
console.log(foodPlaces);
loadFoodPlaces();
