var loadPreviousLocation = function () {
  //if any saved location, get from localStorage
  var faveLocation = localStorage.getItem("faveLocation");
  if (!faveLocation) {
    // if no saved location,  reset to an empty string
    faveLocation = [];
  } else {
    faveLocation = JSON.parse(faveLocation);
  }
  return faveLocation;
};

var saveLocation = function () {
  faveLocation = loadPreviousLocation();

  // get the user's restaurant and package it into an object with their location
  var restaurant = document.getElementById("location-address").value;

  var location = {
    restaurant: restaurant,
  };

  faveLocation.push(restaurant);

  
//   location.sort(function
//   });
// };
