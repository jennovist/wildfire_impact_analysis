//Jennifer Ovist
//Final Project
//Calculating the NDMI value for the region leading up to the fire
//NDMI: Normalized Difference Moisture Index

//filtering the Landsat data by date, region, and cloud cover
var l8Filtered = L8.filterBounds(scuLightningComplex).filterDate('2020-01-01','2020-08-01').filter(ee.Filter.lte('CLOUD_COVER_LAND',3));
  
//creating a simple composite for the image  
var image = ee.Algorithms.Landsat.simpleComposite({
  collection: l8Filtered,
  asFloat: true
});

//calculating the NDMI value
//NDMI = (NIR - SWIR)/(NIR + SWIR)
//NIR = B5, SWIR = B6
var ndmi = image.normalizedDifference(['B5','B6']);
Map.addLayer(ndmi,{},"NDMI Black and White");

var ndmi_palette = {min:-1, max:1, palette: ['ca0020','f4a582','f7f7f7','92c5de','0571b0']};
Map.addLayer(ndmi,ndmi_palette,"NDMI Color");
