const path = require("path");

module.exports = {
    mode: "developement",
    entry: path.join(__dirname, "./app/src/index.tsx"),
    output: {
        path: path.join(__dirname, "./dist"),
        publicPath: "/",
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.(tsx)/,
                exclude: /node_modules/,
                use: ["awesome-typescript-loader"]
            },
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: [{
                    loader: "babel-loader",
                    options: {
                        enforce: "pre",
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
                }]
            }
        ]
    },
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"]
    },
    plugins: [],
    devServer: {
        contentBase: path.join(__dirname, "./app/public")
    }
};
