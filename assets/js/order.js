mapsApiKey = "AIzaSyDZf8YFMxQn0Vz68m7s7x9eWssFYa9GeIQ";

var actionBtn = document.getElementById("my-location");

mapArea = document.getElementById("map");

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
  service.nearbySearch(request, callback);
}
function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
          var place = results[i]
        createMarkers(place, status);
        listData(place, i);
      }
    }
  }
//function that handles how the markers work-- need to fix this- why aren't the markers clickable
function createMarkers(place, status) {
    var placeLoc = place.geometry.location;
    
      let markerOptions = {
        position: placeLoc,
        clickable: true,
        title: place.name,
        // animation: google.maps.Animation.BOUNCE,
        icon: "https://img.icons8.com/color/48/000000/taco.png",
      };
      
      marker = new google.maps.Marker(markerOptions);
      marker.setMap(map);


      var request = { reference: place.reference };

      service.getDetails(request, function(details) {
        console.log(details, "deets")
        google.maps.event.addListener(marker, "click", function() {
            console.log("hello")
        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });
        var contentString = `<p> ${details.name}</p>`;
        infowindow.setContent(details.name + "<br />" + details.formatted_address +"<br />" + details.website + "<br />" + details.rating + "<br />" + details.formatted_phone_number);
        infowindow.open(map, marker);
      });
    });

      //why does this change when switch between how i structure listeners
    //   console.log(results, "restaurant data results");

      //connect event listener to a function that displays results data
      //getting error at this point.
    //   marker.addListener("click", function(results,i) {
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

function listData(results, details) {
    for (var j=0; j < 10; j++) {
        
        var dataListEl = document.getElementById("data-list");
        dataListEl.innerHTML = `<div class="row card-row">
        <div class="col s12 m6">
          <div class="card">
            <div class="card-image">
              <img src="images/sample-1.jpg">
              <h6 class="bg-light">${results[0].name}</h6>
              <a class="btn-floating halfway-fab waves-effect waves-light red" id="save-btn"><i class="material-icons">add</i></a>
            </div>
            <div class="card-content">
              <p>Addess: ${results[0].vicinity}</p>
            </div>
          </div>
        </div>
      </div>
        `
    }
  
}