var loadPreviousLocation = function () {
  //any scores? get from localStorage
  var faveLocation = localStorage.getItem("faveLocation");
  if (!faveLocation) {
    // no scores in localStorage? reset to an empty string
    faveLocation = [];
  } else {
    faveLocation = JSON.parse(faveLocation);
  }
  return faveLocation;
};

var saveLocation = function () {
  faveLocation = loadPreviousLocation();

  // get the user's initials and package it into an object with their remaining time
  var restaurant = document.getElementById("location-address").value;

  // push it onto the array of high scores
  faveLocation.push(restaurant);

  // sort the scores, largest first
  location.sort(function (a, b) {
    return b.score - a.score;
  });
};
