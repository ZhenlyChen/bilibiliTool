const {
  webpackMerge,
  htmlOverlay,
  webpackServeConfig,
} = require("just-scripts");
module.exports = webpackMerge(
  webpackServeConfig,
  htmlOverlay({
    template: "public/index.html",
  }),
  {
    devServer: {
      proxy: {
        "/api": "http://localhost:8081",
        "/data": "http://localhost:8081",
      },
    },
  },
  {
    // Here you can custom webpack configurations
    output: {
      publicPath: "/",
    },
  }
);
