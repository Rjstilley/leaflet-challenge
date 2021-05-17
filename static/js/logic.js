eQuake = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_hour.geojson"
API_KEY = "pk.eyJ1IjoiYmVuamFtZW5hbGZvcmQiLCJhIjoiY2p2NWg5enJkMHVyMzQ0bWtmY2FtNmM5bCJ9.mFsGlikCvtB_-6xIFCVPiQ"

d3.json(eQuake).then(function (data) {
    createFeatures(data.features);
});
function size(Strength) {
    return Strength * 30000
}

function color(how_deep) {
    if (Depth > 90) return "red"
    else if (how_deep > 70) return "dark orange"
    else if (how_deep > 50) return "orange"
    else if (how_deep > 30) return "yellow"
    else if (how_deep > 10) return "lime green"
    else return "green"
}

