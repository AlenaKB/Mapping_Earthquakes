console.log("working");
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});
let baseMaps = {
	"Streets": streets,
	"Satellite Streets": satelliteStreets
  };
  let map = L.map("mapid", {
	center: [43.7, -79.3],
	color:'yellow',
	zoom: 11,
	weight: 1

  });
  L.control.layers(baseMaps).addTo(map);
let torontoHoods = 'https://raw.githubusercontent.com/AlenaKB/Mapping_Earthquakes/Mapping_GeoJSON_Polygons/Mapping_GeoJSON_Polygons/torontoNeighborhoods.json';
d3.json(torontoHoods).then(function(data) {
	console.log(data);
	L.geoJson(data, {
		onEachFeature: function(feature, layer) {
        layer.bindPopup("<h3>" + "Neighborhood: " + feature.properties.AREA_NAME + "</h3>")
}}).addTo(map);
});