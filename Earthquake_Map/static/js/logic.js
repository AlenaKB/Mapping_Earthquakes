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
let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
  });
let baseMaps = {
	"Streets": streets,
  "Satellite": satelliteStreets,
  "Light": light
  };
  let tectonicLayers = new L.LayerGroup();
  let earthquakes = new L.LayerGroup();
  let overlays = {
    Earthquakes: earthquakes, 
    "Tectonic Layers": tectonicLayers
  };
  let map = L.map("mapid", {
	center: [39.5, -98.5],
	zoom: 3,
	layers:[streets]
});
  L.control.layers(baseMaps, overlays).addTo(map);
  let myStyle = {
    color: "#ff0087",
    weight: 2
  }
//let eq = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson';
d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json").then(function(data) {
  L.geoJson(data, {
    style: myStyle
  }).addTo(tectonicLayers);
});

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

  var legend = L.control({position: 'bottomright'});
  legend.onAdd = function() {
    let div = L.DomUtil.create("div", "info legend");
    const magnitudes = [0, 1, 2, 3, 4, 5];
    const colors = [
      "#98ee00",
      "#d4ee00",
      "#eecc00",
      "#ee9c00",
      "#ea822c",
      "#ea2c2c"
    ];
 
    for (var i = 0; i < magnitudes.length; i++) {
      console.log(colors[i]);
      div.innerHTML +=
        '<i style="background:' + colors[i] + '"></i> ' +
        magnitudes[i] + (magnitudes[i + 1] ? '&ndash;' + magnitudes[i + 1] + '<br>' : '+');

    };

  return div;
};

legend.addTo(map);

// for (var i = 0; i < gmagnitudes.length; i++) {
//     div.innerHTML +=
//         '<i style="background:' + getColor(magnitudes[i] + 1) + '"></i> ' +
//         gmagnitudes[i] + (gmagnitudes[i + 1] ? '&ndash;' + gmagnitudes[i + 1] + '<br>' : '+');
// }

// return div;
// };
// legend.addTo(map);

// 	L.geoJson(data, {
// 		onEachFeature: function(feature, layer) {
//         layer.bindPopup("<h3>" + "Neighborhood: " + feature.properties.AREA_NAME + "</h3>")
// }}).addTo(map);
// });