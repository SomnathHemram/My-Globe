Cesium.Ion.defaultAccessToken = 'YOUR_ION_TOKEN';

const terrainProvider = new Cesium.CesiumTerrainProvider({
  url: './terrain/',
  requestVertexNormals: true,
  requestWaterMask: true
});

const imageryProvider = new Cesium.UrlTemplateImageryProvider({
  url: './offline/{z}/{x}/{y}.png',
  tilingScheme: new Cesium.WebMercatorTilingScheme(),
  maximumLevel: 18
});

const viewer = new Cesium.Viewer('cesiumContainer', {
  terrainProvider,
  imageryProvider,
  baseLayerPicker: true,
  sceneModePicker: true,
  timeline: false,
  animation: false
});

viewer.scene.globe.depthTestAgainstTerrain = true;
viewer.scene.globe.enableLighting = true;
viewer.scene.primitives.add(Cesium.createOsmBuildings());

const popup = document.getElementById('popup');
new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
  .setInputAction((click) => {
    const carto = viewer.camera.pickEllipsoid(click.position, viewer.scene.globe.ellipsoid);
    if (!carto) return popup.classList.add('hidden');

    const lon = Cesium.Math.toDegrees(carto.longitude).toFixed(4);
    const lat = Cesium.Math.toDegrees(carto.latitude).toFixed(4);

    popup.style.left = click.position.x + 10 + 'px';
    popup.style.top = click.position.y + 10 + 'px';
    popup.textContent = `Lon: ${lon}, Lat: ${lat}`;
    popup.classList.remove('hidden');
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

viewer.camera.flyTo({
  destination: Cesium.Cartesian3.fromDegrees(-122.22, 37.77, 20000)
});
