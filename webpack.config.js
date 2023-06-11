const path = require("path");

const { VueLoaderPlugin }  = require("vue-loader");

module.exports = {
/*     entry: "./src/main.js", */
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader"
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: [
                        ["@babel/preset-env", {targets : "defaults" }]
                    ]
                }
            },
            {
                test: /\.css$/,
                use: [
                    "vue-style-loader",
                    "css-loader"
                ]
            }
        ]
    },
   /*  output: {
        path: path.join(__dirname, "dist"),
        filename: "bundle.js",
        publicPath: "/dist"
    }, */
  /*   devServer: {
        static: {
            directory: path.join(__dirname, "public"),
            watch: true,
        },
        port: 9001,
        compress: true,
    }, */
    plugins: [
        new VueLoaderPlugin()
    ],
}