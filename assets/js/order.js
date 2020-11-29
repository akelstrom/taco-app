mapsApiKey = "AIzaSyDZf8YFMxQn0Vz68m7s7x9eWssFYa9GeIQ"

function initMap() {
    //map options
var options = {
    zoom: 10,
    center: {lat: 39.9526 ,lng: -75.1652 }
}

//new map
var map = new google.maps.Map(document.getElementById('map'),options);

//add marker
var marker = new google.maps.Marker({
    position: {lat: 39.9526 ,lng: -75.1652},
    map: map,
    icon: 'https://img.icons8.com/color/48/000000/taco.png'
});
}

