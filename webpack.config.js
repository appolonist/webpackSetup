require('dotenv').config();
const merge = require("webpack-merge");
const parts = require("./webpack.parts");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const path = require("path");
const glob = require("glob");

const PATHS = {
    app: path.join(__dirname, "src"),
};

const commonConfig = merge([
    {
        plugins: [
            new HtmlWebpackPlugin({ title: "//Project name" }),
            new ErrorOverlayPlugin()
        ],
        devtool: 'cheap-module-source-map' // 'eval' is not supported by error-overlay-webpack-plugin
    },
]);

const productionConfig = merge([
    parts.extractCSS({
        use: "css-loader",
    }),
    parts.purifyCSS({
        paths: glob.sync(`${PATHS.app}/**/*.js`, { nodir: true }),
    }),
]);

const developmentConfig = merge([
    parts.devServer({
        host: process.env.HOST,
        port: process.env.PORT,
    }),
    parts.loadCSS(),
]);

module.exports = mode => {
    if (mode === "production") {
        return merge(commonConfig, productionConfig, { mode });
    }
    return merge(commonConfig, developmentConfig, { mode });
};