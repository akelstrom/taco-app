mapsApiKey = "AIzaSyDZf8YFMxQn0Vz68m7s7x9eWssFYa9GeIQ";

submitButtonEl = document.querySelector("#submit");

//button for get users geolocation and show map
var actionBtn = document.getElementById("showMe");

mapArea = document.getElementById("map");

//declare  map and markervariables that will hold the Map and Marker Objects later on
let map;
let marker;

//use geolocation to get user location and display that location on the map

//Now we listen for a click event on our button
actionBtn.addEventListener("click", (e) => {
  // hide the button
  actionBtn.style.display = "none";
  // call Materialize toast to update user
  M.toast({ html: "fetching your current location", classes: "rounded" });
  // get the user's position
  getLocation();
});

function getLocation()  {
  // check if user's browser supports Navigator.geolocation
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      displayLocation,
      showError,
      options
    );
  } else {
    M.toast({
      html:
        "Sorry, your browser does not support this feature... Please Update your Browser to enjoy it",
      classes: "rounded",
    });
  }
};

// Displays the different error messages
function showError(error) {
  mapArea.style.display = "block";
  switch (error.code) {
    case error.PERMISSION_DENIED:
      mapArea.innerHTML = "You denied the request for your location.";
      break;
    case error.POSITION_UNAVAILABLE:
      mapArea.innerHTML = "Your Location information is unavailable.";
      break;
    case error.TIMEOUT:
      mapArea.innerHTML = "Your request timed out. Please try again";
      break;
    case error.UNKNOWN_ERROR:
      mapArea.innerHTML =
        "An unknown error occurred please try again after some time.";
      break;
  }
};
//Makes sure location accuracy is high
const options = {
  enableHighAccuracy: true,
};

function displayLocation(position) {
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;
  //deconstruction of object
  const latlng = { lat, lng };
  //call map function
  initMap(latlng);
  createMarker(latlng);
  mapArea.style.display = "block";
};

function initMap(latlng) {
  //map options
  var options = {
    zoom: 14,
    center: latlng,
  };

  // map
  var mapArea = new google.maps.Map(document.getElementById("map"), options);

  var request = {
    location: latlng,
    radius: "500",
    type: ["Mexican Restaurant"],
  };

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
}

function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
    }
}
  

createMarker = (latlng) => {
  let markerOptions = {
    position: latlng,
    map: map,
    icon: "https://img.icons8.com/color/48/000000/taco.png",
    animation: google.maps.Animation.BOUNCE,
    clickable: true,
  };
  marker = new google.maps.Marker(markerOptions);
};

//add event handler for location search
submitButtonEl.addEventListener("click", function (event) {
  event.preventDefault();

  //get cityname from search input value
  var cityName = document.querySelector("#location-address").value.trim();
  console.log(cityName);

  //figure out how to connect cityName to the map- we might need a function to find the lat/
  //long of each location...?
});
