// console.log("working", API_KEY);
// // Create the map object with a center and zoom level.
// let map = L.map('mapid').setView([40.7, -94.5], 4);
// // L.circleMarker([34.0522, -118.2437], {
// // 	radius: 100,
// // 	color: 'black',
// // 	fillColor: '#ffffa1'
// //  }).addTo(map);
// let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
// attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
// 	maxZoom: 18,
// 	id: 'mapbox.streets',
// 	accessToken: API_KEY
// });
// // Then we add our 'graymap' tile layer to the map.
// streets.addTo(map);

// let cities = [{
// 	coord: [40.7128, -74.0059],
// 	city: "New York City",
// 	population: 8398748
//   },
//   {
// 	coord: [41.8781, -87.6298],
// 	city: "Chicago",
// 	population: 2705994
//   },
//   {
// 	coord: [29.7604, -95.3698],
// 	city: "Houston",
// 	population: 2325502
//   },
//   {
// 	coord: [34.0522, -118.2437],
// 	city: "Los Angeles",
// 	population: 3990456
//   },
//   {
// 	coord: [41.2562, -95.9404],
// 	city: "Omaha",
// 	population: 466893
//   }
//   ];
//   cities.forEach(function(city) {
// 	console.log(city)
// 	L.circle(city.location).addTo(map);
// });


// Create our initial map object
// Set the longitude, latitude, and the starting zoom level
let map = L.map('mapid').setView([40.7, -94.5], 4);
L.circleMarker([34.0522, -118.2437], {
	radius: 100,
	color: 'black',
	fillColor: '#ffffa1'
 }).addTo(map);
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	id: 'mapbox.streets',
	accessToken: API_KEY
});



// Connect a black line from NYC to Toronto


// Create a purple polygon that covers the area in Atlanta, Savannah, Jacksonville and Montgomery


