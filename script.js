var map;
var marker;
var infoWindow;

//when the user clicks the submit button, the change location function is called
$('#submitButton').on('click', changeLocation);
//when user selects a location from dropdown, the handleSelect function is called
$('#selectLocation').on('change', handleSelect);

//this function sets the initial state of the map
function initMap() {
  //sets the initial position of the map to be in australia
  var position = {lat: -25.363, lng: 131.044};
  //creates a new google map with the initial position and zoom
  //not sure why we need the [0]
  map = new google.maps.Map($('#map')[0], {
    center: position,
    zoom: 4  
  });
  //creates a marker to go with the location
  marker = new google.maps.Marker({
    position: position,
    map: map
  });
  //adds an info window for the marker
  infoWindow = new google.maps.InfoWindow({
    content: 'Australia'
  });
  marker.addListener('click', function() {
    infoWindow.open(map, marker);
  });
}

/*this function handles the case where the user enters a longitude, latitude and zoom of their choice*/
function changeLocation() {
  //gets the latitude that the user enters
  var latitude = parseFloat($('#lat').val());
  //gets the longitude that the user enters
  var longitude = parseFloat($('#long').val());
  //gets the zoom value the user enters
  var zoom = parseFloat($('#zoom').val());
  //error handling
  if (latitude < -90 || latitude > 90 || longitude > 180 || longitude < -180) {
    alert("Please enter a valid number within the given range");
  } else if (zoom < 0) {
    alert("Please enter a positive number for zoom");
  } else {
    //creates a new position for the map
    var position = {lat: latitude, lng: longitude};
    //updates the map with the new coordinates and zoom
    map = new google.maps.Map($('#map')[0], {
      center: position,
      zoom: zoom  
    });
    //updates the marker with new position
    marker = new google.maps.Marker({
      position: position,
      map: map
    });
    //adds an info window for the marker that shows the coords
    infoWindow = new google.maps.InfoWindow({
      content: "coordinates: " + "(" + $('#lat').val() + ", " + $('#long').val() + ")"
    });
    marker.addListener('click', function() {
      infoWindow.open(map, marker);
    });
    //prevents submission of values to server
    event.preventDefault();
  }
}


//this function handles the situation when user selects location from drop down menu
function handleSelect() {
  var location = $('#selectLocation').val();
  console.log(location);
  var latt;
  var long;
  //handle the cases
  switch (location) {
    case "australia":
      latt = -25.363;
      long = 131.044;
      zoom = 4;
      break;
    case "kyoto":
      latt = 35.0060799;
      long = 135.6909094;
      zoom = 10;
      break;
    case "dalian":
      latt = 38.929772;
      long = 121.4706699;
      zoom = 10;
      break;
    case "berlin":
      latt = 52.5072111;
      long = 13.1459624;
      zoom = 8;
      break;
    case "uw":
      latt = 47.6553351;
      long = -122.3057086;
      zoom = 12;
      break;
  }
  console.log(latt);
  var position = {lat: latt, lng: long};
  //updates the map with the new coordinates and zoom
  map = new google.maps.Map($('#map')[0], {
    center: position,
    zoom: zoom  
  });
  //updates the marker with new position
  marker = new google.maps.Marker({
    position: position,
    map: map
  });
  //adds an info window for the marker that shows the coords
  infoWindow = new google.maps.InfoWindow({
    content: "coordinates: " + "(" + latt + ", " + long + ")"
  });
  marker.addListener('click', function() {
    infoWindow.open(map, marker);
  });
  //prevents submission of values to server
  event.preventDefault();
}