// fix fs not found error for ANTLR4. See https://stackoverflow.com/questions/67478532/module-not-found-cant-resolve-fs-nextjs
module.exports = {
  output: 'export', // Outputs a Single-Page Application (SPA).
  distDir: './build', // Changes the build output directory to `./dist`.
  basePath: '/project/diet-diary/v2',
  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback, // if you miss it, all the other options in fallback, specified
        // by next.js will be dropped. Doesn't make much sense, but how it is
      fs: false, // the solution
    };

    return config;
  },
};