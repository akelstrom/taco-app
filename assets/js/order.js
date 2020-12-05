mapsApiKey = "AIzaSyDZf8YFMxQn0Vz68m7s7x9eWssFYa9GeIQ";

var actionBtn = document.getElementById("my-location");

mapArea = document.getElementById("map");

let map;
let marker;

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
  mapArea.style.display = "block";
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert("You denied the request for your location.");
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
    zoom: 14,
    center: latlng,
  };

  map = new google.maps.Map(document.getElementById("map"), options);

  var request = {
    location: latlng,
    radius: "1000",
    type: ["restaurant"],
    keyword: "mexican",
  };

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, createMarkers);
}

//function that handles how the markers work-- need to fix this- why aren't the markers clickable
function createMarkers(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      let markerOptions = {
        position: results[i].geometry.location,
        title: results.name,
        clickable: true,
        // animation: google.maps.Animation.BOUNCE,
        icon: "https://img.icons8.com/color/48/000000/taco.png",
      };
      
      marker = new google.maps.Marker(markerOptions);
      marker.setMap(map);

      //why does this change when switch between how i structure listeners
      console.log(results, "restaurant data results");

      //connect event listener to a function that displays results data
      //getting error at this point.
    //   marker.addListener("click", (results) => {
    //     var infowindow = new google.maps.InfoWindow({
    //         content: contentString
    //       });

    //       //retruns undefined
    //       console.log(results[i], "listener results at i")
    //       console.log(results, "results in event listener")

    //       var contentString = `<p> ${results[i].name}</p>`;
    //       infowindow.setContent(contentString);
          
    //       console.log(results)
    //       console.log(results[i].name);
        
    //       infowindow.open(map, marker);
    //   });

      //this is another type of event listener that displays the function, and has no problem with the results being passed through
    //   marker.addListener("click", displayData(results, i));
   
    }
    listData(results, i);
  }
}


function displayData(results, i) {
  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  //why am i getting "null" here?
  console.log(
    results[i].geometry.location,
    "console logging position of markers"
  );

  //define the content that is displayed in infowindow
  var contentString = `<p> ${results[i].name}</p>`;
  //sets the content in the infowindow
  infowindow.setContent(contentString);
  //opens the info window (supposed to happen on the click!!!!)
  infowindow.open(map, marker);

  console.log(results[i].name);
};

function listData(results, i) {
  var dataListEl = document.getElementById("data-list");
  dataListEl.innerHTML = `<h6>Restaurant: ${results[0].name}</h6>
  <p>Address: ${results[0].vicinity}<p>
  `

}

// //event listener for dropdown nav bar
// document.addEventListener("DOMContentLoaded", function () {
//   var elems = document.querySelectorAll(".sidenav");
//   var instances = M.Sidenav.init(elems, options);
// });
