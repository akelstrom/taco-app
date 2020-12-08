mapsApiKey = "AIzaSyDZf8YFMxQn0Vz68m7s7x9eWssFYa9GeIQ";

var actionBtn = document.getElementById("my-location");

mapArea = document.getElementById("map");

var options = {
  opacity: 0.2,
  inDuration: 200,
  startingTop: "100%",
};
var elems = document.querySelectorAll(".modal");
var instances = M.Modal.init(elems, options);
var instance = M.Modal.getInstance(document.getElementById("modal1"));
document
  .getElementById("modal1")
  .querySelector(".modal-footer")
  .querySelector("a")
  .addEventListener("click", function () {
    instance.close();
  });

let map;
let marker;
let service;

//event listener for user location button
actionBtn.addEventListener("click", getLocation);

//function that get users approval to get user current location
function getLocation() {
  if (navigator.geolocation) {
    // // call Materialize toast to update user *!!why does this appear before geolocation is confirmed??
    // M.toast({ html: 'fetching your current location', classes: 'rounded red lighten-1' });
    navigator.geolocation.getCurrentPosition(displayLocation, showError);
  }
}

// Displays the different error messages- change alerts to modals
showError = (error) => {
  console.log(instance, "apples");
  mapArea.style.display = "block";
  switch (error.code) {
    case error.PERMISSION_DENIED:
      document
        .getElementById("modal1")
        .querySelector(".modal-content")
        .querySelector("h4").textContent = "Anything for now";
      instance.open();
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Your Location information is unavailable.");
      break;
    case error.TIMEOUT:
      alert("Your request timed out. Please try again");
      break;
    case error.UNKNOWN_ERROR:
      alert("An unknown error occurred please try again after some time.");
      break;
  }
};

//function that gets the users location and put's their lat and long into a variable we can pass into map
function displayLocation(position) {
  var latlng = new google.maps.LatLng(
    position.coords.latitude,
    position.coords.longitude
  );

  initMap(latlng);
  mapArea.style.display = "block";
}

//function that handles what the map does
function initMap(latlng) {
  var options = {
    zoom: 13,
    center: latlng,
  };

  map = new google.maps.Map(document.getElementById("map"), options);

  var request = {
    location: latlng,
    radius: "5000",
    type: ["restaurant"],
    keyword: "mexican",
  };

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
}
function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarkers(results[i], status);
    }
  }
}
//function that handles how the markers work-- need to fix this- why aren't the markers clickable
function createMarkers(place, status) {
  var request = { reference: place.reference };
  service.getDetails(request, function (details, status) {
    console.log(details);
    var placeLoc = place.geometry.location;

    let markerOptions = {
      position: placeLoc,
      clickable: true,
      title: place.name,
      // animation: google.maps.Animation.BOUNCE,
      icon: "https://img.icons8.com/color/48/000000/taco.png",
      data: {
        name: details.name,
        address: details.formatted_address,
        website: details.website,
        rating: details.rating,
        phoneNumber: details.formatted_phone_number,
        photo: details.photos[0].getUrl(),
      },
    };

    marker = new google.maps.Marker(markerOptions);
    //event listener that displays the card on the bottom of page
    marker.addListener("click", function () {
      listData(this.data);
      console.log(this);
      var infowindow = new google.maps.InfoWindow();

      console.log("hello");
      infowindow.setContent(`<b>${this.data.name}</b>
      <br />
      ${this.data.address}`
      );
      infowindow.open(map, this);
    });

    console.log(marker);
    console.log(details, "deets");
    marker.setMap(map);
  });
}

var loadPreviousLocation = function () {
  //if any saved location, get from localStorage
  var faveLocation = localStorage.getItem("faveLocation");
  if (!faveLocation) {
    // if no saved location,  reset to an empty array
    faveLocation = [];
  } else {
    faveLocation = JSON.parse(faveLocation);
  }
  return faveLocation;
};
function listData(data) {
  var dataListEl = document.getElementById("data-list");
  dataListEl.innerHTML = `<div class="row card-row">
  <div class="col s12 m6">
    <div class="card">
      <div class="card-image">
      <img src="${data.photo}">
        <h6 class="card-title red lighten-1">${data.name}</h6>
        <a class="btn-floating halfway-fab waves-effect waves-light red" id="save-btn"><i class="material-icons">add</i></a>
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
</div>
  `;
  document.getElementById("save-btn").addEventListener("click", function () {
    var food = loadPreviousLocation();
    food.push(data);
    localStorage.setItem("faveLocation", JSON.stringify(food));
  });
}
