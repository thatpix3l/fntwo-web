import nodeResolve from '@rollup/plugin-node-resolve'
import html from '@rollup/plugin-html'
import { terser } from 'rollup-plugin-terser'
import livereload from 'rollup-plugin-livereload'
import serve from 'rollup-plugin-serve'
import typescript from '@rollup/plugin-typescript'

const production = !process.env.ROLLUP_WATCH

export default {
  input: 'src/main.ts',
  output: {
    dir: 'build',
    format: 'es',
    assetFileNames: "[name]-[hash][extname]",
    sourcemap: !production // Generate sourcemaps when not in production
  },
  plugins: [
    nodeResolve(),
    html({
      title: 'vanezo',
    }),
    serve("build/"),
    typescript(),
    !production && livereload("src/"), // Live reload when not in production
    production && terser() // Minify in production
  ]

}