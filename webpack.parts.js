const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurifyCSSPlugin = require("purifycss-webpack");

exports.devServer = ({ host, port } = {}) => ({
    devServer: {
        stats: "errors-only",
        host: process.env.HOST, // set "localhost"
        port: process.env.PORT, // set 8080, for docker, vagrant change to 0.0.0.0 in .env file. 
        historyApiFallback: true, // enable HTML5 history api based routing
        overlay: true, //WDS overlay does not capture runtime errors of the application!!
        open: true // open the page in browser
    },
});

exports.loadCSS = ({ include, exclude } = {}) => ({
    module: {
        rules: [
            {
                test: /\.css$/,
                include,
                exclude,

                use: ["style-loader", "css-loader"],
            },
        ],
    },
});

exports.extractCSS = ({ include, exclude, use = [] }) => {
    // Output extracted CSS to a file
    const plugin = new MiniCssExtractPlugin({
        filename: "[name].css",
    });

    return {
        module: {
            rules: [
                {
                    test: /\.css$/,
                    include,
                    exclude,

                    use: [
                        MiniCssExtractPlugin.loader,
                    ].concat(use),
                },
            ],
        },
        plugins: [plugin],
    };
};

exports.purifyCSS = ({ paths }) => ({
    plugins: [new PurifyCSSPlugin({ paths })],
});

exports.autoprefix = () => ({
    loader: "postcss-loader",
    options: {
        plugins: () => [require("autoprefixer")()],
    },
});

exports.loadImages = ({ include, exclude, options } = {}) => ({
    module: {
        rules: [
            {
                test: /\.(png|jpg)$/,
                include,
                exclude,
                use: {
                    loader: "url-loader",
                    options,
                },
            },
        ],
    },
});
exports.loadJavaScript = ({ include, exclude } = {}) => ({
    module: {
        rules: [
            {
                test: /\.js$/,
                include,
                exclude,
                use: "babel-loader",
            },
        ],
    },
});