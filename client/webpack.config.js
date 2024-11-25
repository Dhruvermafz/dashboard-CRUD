const path = require("path");

module.exports = {
  mode: "development", // or "production" depending on your environment
  entry: "./src/index.js", // adjust to your project's entry point
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: "pre",
        use: ["source-map-loader"],
        exclude: /node_modules/,
      },
      // Other rules (e.g., Babel, CSS loaders) can go here
    ],
  },
  devtool: "source-map", // Ensure source maps are generated
};
