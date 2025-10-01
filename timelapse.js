//Jennifer Ovist
//Final Project
//Time Lapse 

//filtering the image collection to only feature images from the region in 2020
var collection = L8
  .filterBounds(scuLightningComplex)
  .filterDate('2020-01-01','2020-12-31')
  .filter(ee.Filter.lte('CLOUD_COVER_LAND',5));
  
  
//Map.addLayer(collection,{},'Landsat 8');
//creating GIF parameters
var gifParams = {
  bands: ['B4','B3','B2'],
  min:5600,
  max:19400,
  region: scuLightningComplex,
  framesPerSecond: 5,
  format: 'gif'
};

// Render the GIF animation in the console.
print(ui.Thumbnail(collection, gifParams));
