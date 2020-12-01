mapsApiKey = "AIzaSyDZf8YFMxQn0Vz68m7s7x9eWssFYa9GeIQ";
submitButtonEl = document.querySelector("#submit");

function initMap() {
  //map options
  var options = {
    zoom: 10,
    center: { lat: 39.9526, lng: -75.1652 },
  };

  //new map
  var map = new google.maps.Map(document.getElementById("map"), options);

  //add marker
  var marker = new google.maps.Marker({
    position: { lat: 39.9526, lng: -75.1652 },
    map: map,
    icon: "https://img.icons8.com/color/48/000000/taco.png",
  });
}

//add event handler for location search
submitButtonEl.addEventListener("click", function (event) {
  event.preventDefault();

  //get cityname from search input value
  var cityName = document.querySelector("#location-address").value.trim();
  console.log(cityName);

  //figure out how to connect cityName to the map- we might need a function to find the lat/
  //long of each location...?

  //use geolocation, so put a button in order.html that says "click here for to use current location"
});
