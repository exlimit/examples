
var map = new maptalks.Map('map', {
  center: [-0.113049,51.498568],
  zoom: 14,
  attribution: {
    content: '$(attribution)'
  },
  baseLayer: new maptalks.TileLayer('base', {
    urlTemplate: '$(urlTemplate)',
    subdomains: $(subdomains)
  }),
  layers : [
    new maptalks.VectorLayer('v')
  ]
});
//<<<<<<<< prepare data
var rect3 = new maptalks.Rectangle(
  map.getCenter().sub(0.025, 0.0035),
  1200,
  1000,
  {
    'symbol': [
      {
        'lineColor': '#34495e',
        'lineWidth': 3,
        'polygonFill': '#1bbc9b',
        'polygonOpacity' : 1
      },
      {
        'textName' : '3',
        'textWeight' : 'bold',
        'textSize' : 30,
        'textFill' : '#fff'
      }
    ]
  }
);

var rect2 = rect3.copy()
  .translate([0.006, 0.006])
  .updateSymbol([{ 'polygonFill' : 'rgb(216,115,149)' }, { 'textName' : '2' }]);

var rect1 = rect2.copy()
  .translate([0.006, 0.006])
  .updateSymbol([{ 'polygonFill' : 'rgb(135,196,240)' }, { 'textName' : '1' }]);

map.getLayer('v').addGeometry(rect3, rect2, rect1);
//>>>>>>>>
new maptalks.control.Toolbar({
  items: [
    {
      item: 'Sort to 3, 2, 1',
      click: function () {
        rect3.bringToFront();
        rect1.bringToBack();
      }
    },
    {
      item: 'Sort to 1, 2, 3',
      click: function () {
        rect1.setZIndex(3);
        rect2.setZIndex(2);
        rect3.setZIndex(1);
      }
    }
  ]
}).addTo(map);
