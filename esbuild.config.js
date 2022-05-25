import * as esbuild from "esbuild";
import esbuildServe from 'esbuild-serve';

const isProduction = !(process.argv.includes('-w'));

const build_options = {

  entryPoints: ["src/main.ts"],
  bundle: true,
  outfile: "build/main.js",
  logLevel: "info",
  ...(!isProduction && { sourcemap: "inline" }), // Include sourcemaps, if not in production
  minify: isProduction, // Minify in production

};

// Build when in production
isProduction && esbuild.build(build_options).catch(() => process.exit(1));

// Serve when in development
!isProduction && esbuildServe(build_options, {
  port: 10001,
  root: './build'
});