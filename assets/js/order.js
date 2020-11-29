mapsApiKey = "AIzaSyDZf8YFMxQn0Vz68m7s7x9eWssFYa9GeIQ"

let map;

function initMap() {
var options = {
    zoom: 8,
    center: {lat: 39.9526 ,lng: 75.1652 }
}
var map = new google.maps.Map(document.getElementById('map'),options);
}