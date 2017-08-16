const options = {
  'content'  : '',
  //override parent's animationOnHide option
  'animationOnHide' : false
};

class MyUI extends maptalks.ui.UIComponent {

  constructor(coordinate, options) {
    super(options);
    this._coordinate = coordinate;
  }

  buildOn(map) {
    var dom = document.createElement('div');
    dom.className = 'my-ui';
    dom.innerText = this.options['content'];
    return dom;
  }

  getOffset() {
    var size = this.getSize();
    //move anchor to center of UI
    return new maptalks.Point(-size.width / 2, -size.height / 2);
  }

  getEvents() {
    return {
      'zoomend' : this._flash
    };
  }

  onRemove() {
    if (this._flashTimeout) {
      clearTimeout(this._flashTimeout);
    }
  }

  _flash() {
    //flash after zooming.
    this.hide();
    this._flashTimeout = setTimeout(() => {
      this.show(this._coordinate);
    }, 200);
  }
}

MyUI.mergeOptions(options);


var map = new maptalks.Map('map', {
  center: [-0.113049,51.49856],
  zoom: 14,
  attribution: {
    content: '$(attribution)'
  },
  baseLayer: new maptalks.TileLayer('base', {
    urlTemplate: '$(urlTemplate)',
    subdomains: $(subdomains)
  })
});

var ui = new MyUI(map.getCenter(), {
            'content'   : 'Hello, MyUI'
          });
ui.addTo(map).show();
