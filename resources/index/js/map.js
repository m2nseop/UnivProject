
//window.onload();

var map = new ol.Map({
  target: 'mapp',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.XYZ({
            //Vworld Tile 변경
            url: 'http://xdworld.vworld.kr:8080/2d/Base/service/{z}/{x}/{y}.png',
        })
    })
  ],
  view: new ol.View({
          //center: [37.281950, 127.90023], //4326 좌표계
  center: [14238066.18945068, 4478027.472230042], //4326 좌표계
        zoom: 16,
        minZoom: 8,
        maxZoom: 19
    })
  });

  map.on('click', function(evt) {
    //var lonlat = ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
    let coordinate = evt.coordinate;
    console.log(coordinate);
})