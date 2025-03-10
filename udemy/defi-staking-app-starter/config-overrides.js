const webpack = require("webpack");

module.exports = function override(config) {
  config.module.rules.push({
    test: /\.js$/,
    use: ["source-map-loader"],
    enforce: "pre",
    exclude: [
      /node_modules\/(ethereumjs-common|ethereumjs-tx|ethereumjs-util|xhr2-cookies)/,
    ],
  });
  config.resolve.fallback = {
    ...config.resolve.fallback,
    stream: require.resolve("stream-browserify"),
    crypto: require.resolve("crypto-browserify"),
    assert: require.resolve("assert"),
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
    os: require.resolve("os-browserify/browser"),
    url: require.resolve("url/"),
    buffer: require.resolve("buffer/"),
    vm: require.resolve("vm-browserify"),
    process: require.resolve("process/browser"),
  };
  config.plugins = [
    ...config.plugins,
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
      process: "process/browser", // added process
    }),
  ];
  return config;
};
