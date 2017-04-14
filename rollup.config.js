import buble from 'rollup-plugin-buble'

export default {
  entry: 'src/image-compress.js',
  plugins: [
    buble()
  ],
  format: 'umd',
  moduleName: 'imageCompress',
  dest: 'dist/image-compress.umd.js'
}
