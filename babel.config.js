module.exports = function (api) {
  api.cache(true);
  return {
    plugins: [
      "macros",
      // "@babel/preset-env",
      // "@babel/preset-react",
      // "@babel/plugin-syntax-top-level-await",
      [
        "babel-plugin-root-import",
        {
          rootPathPrefix: "~",
          rootPathSuffix: "src",
        },
      ],
    ],
  };
};
