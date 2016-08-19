'use strict';
(function(exports){

  function createCanvas(dimension) {
    var canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.left = '-99999px';
    canvas.width = dimension.width;
    canvas.height = dimension.height;

    return canvas;
  };

  exports.FORMATS = 'jpg, png, jpeg, JPG, PNG';

  exports.resize = function(src, dimension, compress, callback, error) {
    var image

    image = new Image();
    image.onerror = function() {
      error && error();
    };
    image.onload = function() {
      var canvas,
          ctx,
          reader,
          ratio,
          realWidth = this.width,
          realHeight = this.height;

      dimension = dimension || {};
      if (dimension.width > dimension.height) {
        image.width = dimension.width || 800;
        ratio = (image.width * 100) / realWidth;
        image.height = realHeight * (ratio / 100);
      } else {
        image.height = dimension.height || 600;
        ratio = (image.height * 100) / realHeight;
        image.width = realWidth * (ratio / 100);
      }
      canvas = createCanvas({ width: this.width, height: this.height });
      document.body.appendChild(canvas);
      ctx = canvas.getContext('2d');
      ctx.drawImage(this, 0, 0, this.width, this.height);
      callback && callback(canvas.toDataURL('image/jpeg', compress || '0.5'));
      document.body.removeChild(canvas);
    };

    image.src = src;
  };

}(window.$image = {}));
