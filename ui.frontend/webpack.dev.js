const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const SOURCE_ROOT = __dirname + "/src/main/webpack";

module.exports = (env) => {
  const writeToDisk = env && Boolean(env.writeToDisk);

  return merge(common, {
    mode: "development",
    performance: {
      hints: "warning",
      maxAssetSize: 1048576,
      maxEntrypointSize: 1048576,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, SOURCE_ROOT + "/static/index.html"),
      }),
    ],
    devServer: {
      proxy: [
        {
          context: ["/content", "/etc.clientlibs", "/libs"],
          target: "http://localhost:4502",
        },
      ],
      client: {
        overlay: {
          errors: true,
          warnings: false,
        },
        progress: true, // Show compilation progress in the browser console
        reconnect: true, // Reconnects to dev server when the server is restarted
      },
      watchFiles: ["src/**/*"],
      hot: true,
      devMiddleware: {
        writeToDisk: writeToDisk,
      },
    },
  });
};
