var faveSpot = document.getElementById("getFaveSpot");

//load saved food places from local storage
var foodPlaces = JSON.parse(localStorage.getItem("faveLocation"));

function formatPlace(data) {
  // displays restaurants
  return `<div class="row card-row">
  <div class="col s12 m6">
    <div class="card">
      <div class="card-image">
      <img src="${data.photo}">
        <h6 class="bg-light">${data.name}</h6>
      </div>
      <div class="card-content">
        <p>Address: ${data.address}</p>
        <p>Phone Number: ${data.phoneNumber}</p>
        <p>Website: <a href="${data.website}">Click Here</a></p>
        <p>Rating: ${data.rating}</p>
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
