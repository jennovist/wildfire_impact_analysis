//Jennifer Ovist
//Final NBR (Normalized Burn Rate) of region after the fires

//filtering the Landsat data by date, region, and cloud cover
//I am using dates from before and after the fire to show the difference
var l8PreFire = L8.filterBounds(scuLightningComplex).filterDate('2020-01-01','2020-08-01').filter(ee.Filter.lte('CLOUD_COVER_LAND',3));
var l8PostFire = L8.filterBounds(scuLightningComplex).filterDate('2020-10-01','2020-12-01').filter(ee.Filter.lte('CLOUD_COVER_LAND',3));

//creating a simple composite of both images
var imagePreFire = ee.Algorithms.Landsat.simpleComposite({
  collection: l8PreFire,
  asFloat: true
});
var imagePostFire = ee.Algorithms.Landsat.simpleComposite({
  collection: l8PostFire,
  asFloat: true
});
  
//inserting a custom palette 
var nbr_palette = {min:-1, max:1, palette: ['ca0020','f4a582','ffffff','bababa','404040']};
var palette2 = {min: -1, max: 1, palette: ['fee5d9','fcae91','fb6a4a','de2d26','a50f15']};
  
//calculating NBR (Normalized Burn Ratio) for both images and adding to map
var preNBR = imagePreFire.normalizedDifference(['B5','B7']);
Map.addLayer(preNBR,nbr_palette,"NBR Before Fire");

var postNBR = imagePostFire.normalizedDifference(['B5','B7']);
Map.addLayer(postNBR,nbr_palette,"NBR After Fire");

//calculating the change in NBR by subtracting both NBR images
var dNBR = preNBR.subtract(postNBR);
Map.addLayer(dNBR,palette2,"NBR Difference")
