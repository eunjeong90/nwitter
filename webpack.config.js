module.exports = {
  experiments: {
    asyncWebAssembly: true,
    buildHttp: true,
    layers: true,
    lazyCompilation: true,
    outputModule: true,
    syncWebAssembly: true,
    topLevelAwait: true,
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: ["@babel/plugin-syntax-top-level-await"],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
};
