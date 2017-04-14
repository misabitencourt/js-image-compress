function createCanvas(dimension) {
  const canvas = document.createElement('canvas')
  canvas.style.position = 'fixed'
  canvas.style.left = '-99999px'
  canvas.width = dimension.width
  canvas.height = dimension.height

  return canvas
}

/**
 * Compress images on browser with javascript
 * @param {string} src - base64 image or url to the image.
 * @param {Object} dimension - Dimension expected for the image.
 * @param {number} dimension.width - Width expected for the image.
 * @param {number} dimension.height - Height expected for the image.
 * @param {number} compress - Between 0 and 1 indicating the expected image quality.
 * @param {callback} callback - Callback that handles the result.
 * @param {function} error - Callback executed if the function fails.
 */
export default function imageCompress(src, dimension, compress, callback, error) {
  const image = new Image()
  image.onerror = function () {
    error && error()
  }
  image.onload = function () {
    let ratio
    const realWidth = this.width
    const realHeight = this.height
    const canvas = createCanvas({width: this.width, height: this.height})
    document.body.appendChild(canvas)

    const ctx = canvas.getContext('2d')
    ctx.drawImage(this, 0, 0, this.width, this.height)

    dimension = dimension || {}
    if (dimension.width > dimension.height) {
      image.width = dimension.width || 800
      ratio = (image.width * 100) / realWidth
      image.height = realHeight * (ratio / 100)
    } else {
      image.height = dimension.height || 600
      ratio = (image.height * 100) / realHeight
      image.width = realWidth * (ratio / 100)
    }
    callback && callback(canvas.toDataURL('image/jpeg', compress || '0.5'))
    document.body.removeChild(canvas)
  }

  image.src = src
}

/**
 * @callback callback
 * @param {string} file - Compressed image in base64.
 */
