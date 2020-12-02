mapsApiKey = "AIzaSyDZf8YFMxQn0Vz68m7s7x9eWssFYa9GeIQ";

var actionBtn = document.getElementById("my-location");

mapArea = document.getElementById("map");

let map;
let marker;

actionBtn.addEventListener("click", getLocation);

function getLocation() {
  if (navigator.geolocation) {

    // call Materialize toast to update user 
    M.toast({ html: 'fetching your current location', classes: 'rounded red lighten-1' });
    
    navigator.geolocation.getCurrentPosition(displayLocation);
  }
}

function displayLocation(position) {
  var latlng = new google.maps.LatLng(
    position.coords.latitude,
    position.coords.longitude
  );

  initMap(latlng);
  mapArea.style.display = "block";
}

function initMap(latlng) {
  var options = {
    zoom: 14,
    center: latlng
  };

  map = new google.maps.Map(document.getElementById("map"), options);

  var request = {
    location: latlng,
    radius: "500",
    type: ["restaurant"],
    keyword: "taco"
  };

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, createMarkers);
}

function createMarkers(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      let markerOptions = {
        position: results[i].geometry.location,
        title: "hello",
        clickable: true,
        animation: google.maps.Animation.BOUNCE, 
        icon:"https://img.icons8.com/color/48/000000/taco.png"
      };
      marker = new google.maps.Marker(markerOptions);
      marker.setMap(map);
    }
  }
}

//event listener for dropdown nav bar
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, options);
  });