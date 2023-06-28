const path = require("path");

const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
    mode: "none",
    externals: {
        Vue: "Vue",
    },
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
                        ["@babel/preset-env", { targets: "defaults" }]
                    ]
                }
            },
            {
                test: /\.css$/,
                use: [
                    "vue-style-loader",
                    "css-loader"
                ]
            },
           /*  {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: {
                            sources: {
                                list: [
                                    { tag: "img", attribute: "src", type: "src" },
                                    { tag: "input", attribute: "src", type: "src" },
                                    { tag: "object", attribute: "data", type: "src" },
                                ],
                            },
                        },
                    },
                ],
            } ,*/
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ],
}