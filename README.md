# js-image-compress
Compres images on browser with javascript

## Example (es5):
```
var imageSource = 'http://www.mysite.com/my-image.jpg'; // base64 or link
$image.resize(imageSource, {width: 340, height: 340}, 0.4, function(file) { // source, dimension, compression, success, error
  console.log('Image base64:');
  console.log(file);
}, function() {
  console.error('Error!!');
});
```

## Example (es2015):
```
let imageSource = 'http://www.mysite.com/my-image.jpg'; // base64 or link
$image.resize(imageSource, {width: 340, height: 340}, 0.4, (file) => {
  console.log(`Image base64: ${file}`);
}, () => {
  console.error('Error!!');
});
```
