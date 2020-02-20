console.log("working", API_KEY);
// Create the map object with a center and zoom level.
let map = L.map('mapid').setView([39.5, -90.35], 5);
let line = [
	[40.6413, -73.7781],
	[43.6777, -79.6248],
	[30.1975, -97.6664],
	[37.6213, -122.3790]
  ];

L.polyline(line, {
	weight:4,
	dashArray: '8, 6',
	color:"skyblue",
	fillOpacity:"0.5"
  }).addTo(map);


let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	id: 'mapbox.streets',
	accessToken: API_KEY
});
// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);

