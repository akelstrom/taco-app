var faveSpot = document.getElementById("getFaveSpot");

//load saved food places from local storage
var foodPlaces = JSON.parse(localStorage.getItem("faveLocation"));

var loadFoodPlaces = function () {
  for (let i = 0; i < foodPlaces.length; i++) {
    var restaurantList = document.createElement("li");
    restaurantList.innerHTML = formatPlace(foodPlaces[i]);
    function formatPlace(data) {
      // displays restaurants
      // return `<h6>${data.name}</h6><p>${data.address} </br> ${data.phoneNumber} </br> ${data.website}</p>`;
      faveSpot.innerHTML = `<div class="row card-row">
      <div class="col s12 m6">
        <div class="card">
          <div class="card-image">
          <img src="${data.photo}">
            <h6 class="bg-light">${data.name}</h6>
          </div>
          <div class="card-content">
            <p>Address: ${data.address}</p>
            <p>Phone Number: ${data.phoneNumber}</p>
            <p>Website: <a href="${data.website}">Website Link</a></p>
            <p>Rating: ${data.rating}</p>
          </div>
        </div>
      </div>
    </div>`;
    }
    faveSpot.appendChild(restaurantList);
    restaurantList.classList.add("restaurant-list");
  }
};
console.log(foodPlaces);
loadFoodPlaces();
