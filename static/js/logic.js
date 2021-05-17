eQuake = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_hour.geojson"
API_KEY = "pk.eyJ1IjoiYmVuamFtZW5hbGZvcmQiLCJhIjoiY2p2NWg5enJkMHVyMzQ0bWtmY2FtNmM5bCJ9.mFsGlikCvtB_-6xIFCVPiQ"

d3.json(eQuake).then(function (data) {
    createFeatures(data.features);
});
function size(Strength) {
    return Strength * 30000
}