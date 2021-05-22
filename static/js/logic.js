
eQuake = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson"
// API_KEY = "pk.eyJ1IjoiYnJvb2thbm4iLCJhIjoiY2tvcDI5ZzQ4MDF6eTJxbGM0YzJ6d3N3YiJ9.UPSAHkGUAQB4nJo0NnXv9g"
d3.json(eQuake).then(function (data) {
    createFeatures(data.features);
});
function size(Strength) {
    return Strength * 10000
}
function color(Deep) {
    if (Deep > 90) return "rebeccapurple"
    else if (Deep > 70) return "red"
    else if (Deep > 50) return "orange"
    else if (Deep > 30) return "yellow"
    else if (Deep > 10) return "lime green"
    else return "green"
}
function createFeatures(earthquakeData) {
    function onEachFeature(feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.place +
            "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
    }
    var EQ = L.geoJSON(earthquakeData, {
        pointToLayer: function (feature, location) {
            return new L.circle(location,
                {
                    radius: size(feature.properties.mag)
                    , fillColor: color(feature.geometry.coordinates[2])
                    , fillOpacity: .1
                    , color: "black"
                    , stroke: true
                    , weight: 1
                })
        }
        , onEachFeature: onEachFeature
    });
    createMap(EQ);
}
function createMap(EQ) {
    var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: API_KEY
    });
    var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "dark-v10",
        accessToken: API_KEY
    });
    var baseMaps = {
        "Street Map": streetmap,
        "Dark Map": darkmap
    };
    var overlayMaps = {
        EQ: EQ
    };
    var myMap = L.map("BeccaMap", {
        center: [
            37.09, -95.71
        ],
        zoom: 5,
        layers: [streetmap, EQ]
    });
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);
}