module.exports = function (api) {
  api.cache(true);
  return {
    plugins: [
      "macros",
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
