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
	"Satellite": satelliteStreets
  };
  let earthquakes = new L.LayerGroup();
  let overlays = {
    Earthquakes: earthquakes
  };
  let map = L.map("mapid", {
	center: [39.5, -98.5],
	zoom: 3,
	layers:[streets]
});
  L.control.layers(baseMaps, overlays).addTo(map);
//let eq = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson';
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
	function styleInfo(feature) {
		return {
		  opacity: 1,
		  fillOpacity: 1,
		  fillColor: getColor(feature.properties.mag),
		  color: "#000000",
		  radius: getRadius(feature.properties.mag),
		  stroke: true,
		  weight: 0.5
        };
        function getColor(magnitude) {
            if (magnitude > 5) {
                return "#ea2c2c"
            }
            if (magnitude > 4) {
                return "#ea822c";
            }
            if (magnitude > 3) {
              return "#ee9c00";
            }
            if (magnitude > 2) {
              return "#eecc00";
            }
            if (magnitude > 1) {
              return "#d4ee00";
            }
            return "#98ee00";
          }
        }
		function getRadius(magnitude) {
			if (magnitude === 0) {
			  return 1;
			}
			return magnitude * 4;
	  };
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data, {
	  pointToLayer: function(feature, latlng) {
		  return L.circleMarker(latlng);
		},
		// We set the style for each circleMarker using our styleInfo function.
      style: styleInfo,
      onEachFeature: function(feature, layer) {
          layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>" + "Location: " + feature.properties.place);
      }
      }).addTo(earthquakes);
      earthquakes.addTo(map);
  });
// 	L.geoJson(data, {
// 		onEachFeature: function(feature, layer) {
//         layer.bindPopup("<h3>" + "Neighborhood: " + feature.properties.AREA_NAME + "</h3>")
// }}).addTo(map);
// });