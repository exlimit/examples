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

var layer = map.getLayer('v');

// select features and update symbol
function filter() {
  layer.filter(['>=', 'count', 200])
    .forEach(function (feature) {
      feature.updateSymbol([
        {
          'polygonFill': 'rgb(216,115,149)'
        }
      ]);
    });
}

//prepare data
for (var i = 0; i < 3; i++) {
  new maptalks.Polygon([
    [-0.123049 + 0.02 * i, 51.503568],
    [-0.136049 + 0.02 * i, 51.503568],
    [-0.136049 + 0.02 * i, 51.488568],
    [-0.123049 + 0.02 * i, 51.488568]
  ], {
    'properties': {
      'count': (i + 1) * 100
    },
    'symbol': [
      {
        'polygonFill': '#747474',
        'polygonOpacity': 0.5,
        'lineColor': '#000',
        'lineWidth': 2
      },
      {
        'textName' : '{count}',
        'textSize' : 40,
        'textFill' : '#fff'
      }
    ]
  }).addTo(layer);
}

new maptalks.control.Toolbar({
  items: [
    {
      item: 'Select those >= 200',
      click: filter
    }
  ]
}).addTo(map);
