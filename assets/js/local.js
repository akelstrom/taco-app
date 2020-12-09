var faveSpot = document.getElementById("getFaveSpot");

var foodPlaces = JSON.parse(localStorage.getItem("faveLocation"));

function formatPlace(data) {
  return `<div class="row card-row">
  <div class="col s12 m6">
    <div class="card">
      <div class="card-image">
      <img src="${data.photo}">
        <h6 class="card-title red lighten-1">${data.name}</h6>
      </div>
      <div class="card-content">
        <p>Address: ${data.address}</p>
        <p>Phone Number:<a href="tel:${data.phoneNumber}"><i class="material-icons tiny">call</i>
        </a> ${data.phoneNumber}</p>
        <p>Rating: ${data.rating}</p>
        <p><a href="${data.website}">Link to Website</a></p>
      </div>
    </div>
  </div>
</div>`;
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
