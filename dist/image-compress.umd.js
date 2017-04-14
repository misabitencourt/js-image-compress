(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.imageCompress = factory());
}(this, (function () { 'use strict';

function createCanvas(dimension) {
  var canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.left = '-99999px';
  canvas.width = dimension.width;
  canvas.height = dimension.height;

  return canvas
}

function imageCompress(src, dimension, compress, callback, error) {
  var image = new Image();
  image.onerror = function () {
    error && error();
  };
  image.onload = function () {
    var ratio;
    var realWidth = this.width;
    var realHeight = this.height;
    var canvas = createCanvas({width: this.width, height: this.height});
    document.body.appendChild(canvas);

    var ctx = canvas.getContext('2d');
    ctx.drawImage(this, 0, 0, this.width, this.height);

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
    callback && callback(canvas.toDataURL('image/jpeg', compress || '0.5'));
    document.body.removeChild(canvas);
  };

  image.src = src;
}

return imageCompress;

})));
