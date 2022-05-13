import nodeResolve from '@rollup/plugin-node-resolve'
import html from '@rollup/plugin-html'
import { terser } from 'rollup-plugin-terser'
import livereload from 'rollup-plugin-livereload'
import serve from 'rollup-plugin-serve'

const production = !process.env.ROLLUP_WATCH

export default {
  input: 'src/main.js',
  output: {
    dir: 'build',
    format: 'es',
    assetFileNames: "[name]-[hash][extname]",
    sourcemap: !production
  },
  plugins: [
    nodeResolve(),
    html({
      title: 'vanezo',
    }),
    serve("build/"),
    !production && livereload("src/"),
    production && terser() // minify, but only in production
  ]

}