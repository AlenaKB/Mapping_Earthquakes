console.log("working");
// Create the map object with a center and zoom level.

let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});
let baseMaps = {
	Street: streets,
	Dark: dark
  };
  let map = L.map("mapid", {
	center: [40.7, -94.5],
	zoom: 4
  });
  L.control.layers(baseMaps).addTo(map);
let airportData = 'https://raw.githubusercontent.com/AlenaKB/Mapping_Earthquakes/master/majorAirports.json';
d3.json(airportData).then(function(data) {
	console.log(data);
	L.geoJson(data, {
		onEachFeature: function(feature, layer) {
			layer.bindPopup("<h3>" + "Airport Code: " + feature.properties.faa + "</h3>"+ "<hr>" + "<h3>" + "Airport Name: "  + feature.properties.name + "</h3>")
		}
	}).addTo(map);
});

