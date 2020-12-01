mapsApiKey = "AIzaSyDZf8YFMxQn0Vz68m7s7x9eWssFYa9GeIQ";

submitButtonEl = document.querySelector("#submit");

//button for get users geolocation and show map
var actionBtn = document.getElementById("my-location");

mapArea = document.getElementById("map");

//declare  map and markervariables that will hold the Map and Marker Objects later on (per google maps doc instructions)
let map;
let marker;

//use geolocation to get user location and display that location on the map

//Now we listen for a click event on our button
actionBtn.addEventListener("click", function() {
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

// function that handles errors, so correct alerts pop up for each error
function showError(error) {
  mapArea.style.display = "block";
  switch (error.code) {
      //permission denied error
    case error.PERMISSION_DENIED:
      alert("You denied the request for your location.");
      break;
      //position unavaliable error
    case error.POSITION_UNAVAILABLE:
      alert("Your Location information is unavailable.");
      break;
      //timeout error
    case error.TIMEOUT:
      alert("Your request timed out. Please try again");
      break;
      //unknown error
    case error.UNKNOWN_ERROR:
        alert("An unknown error occurred, please try again later.");
      break;
  }
};
//Makes sure location accuracy is high
var options = {
  enableHighAccuracy: true,
};

//get users current position and translate that into lat and lon variables
function displayLocation(position) {
  var lat = position.coords.latitude;
  var lng = position.coords.longitude;
  console.log(lat, lng)
  
  //deconstruction of object
  var latlng = { lat, lng };
  console.log(latlng)
  //call map function
  initMap(latlng);
  createMarker(latlng);
  mapArea.style.display = "block";
};

//function that calls the google maps API, and handles search "request"
function initMap(latlng) {
  //map options
  var options = {
    zoom: 14,
    center: latlng,
  };

  // map
  var map = new google.maps.Map(document.getElementById("map"), options);

  //request that handles where the search nearby range is, and the search keywork and type
  var request = {
    location: latlng,
    radius: "500",
    type: ["restaurant"],
    keyword: "mexican restaurant"
  };

  //code from instructions of google maps api methods to handle the "request"
  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
  console.log("request results", request)
};

function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
    }
    console.log(results)
};

function createMarker(latlng) {
  let markerOptions = {
    position: latlng,
    map: mapArea,
    icon: "https://img.icons8.com/color/48/000000/taco.png",
    clickable: true,
  };
  marker = new google.maps.Marker(markerOptions);
  console.log("marker",marker)
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
