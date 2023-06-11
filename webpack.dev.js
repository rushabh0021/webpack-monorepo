
const baseConfig = require("./webpack.config");
const path = require("path");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const HTMLWebpackDeployPlugin = require("html-webpack-deploy-plugin");
const { VueLoaderPlugin } = require("vue-loader");

/* const isDirectoryPresent = (componentName) => {

} */
module.exports = (env) => {
    console.log(env);
    const componentPrefix = "my-";
    const port = 9001;
    const componentDirectory = `./components/${env.directoryName}`;

    return {
        ...baseConfig,
        ...{
            mode: "development",
            context: path.resolve(componentDirectory),
            entry: path.resolve(`./components/${env.directoryName}/src/index.js`),
            output: {
                path: path.resolve(`./components/${env.directoryName}/.temp`),
                filename: `${componentPrefix}${env.directoryName}.js`,
                library: `${componentPrefix}${env.directoryName}`,
                libraryTarget: "umd",
                umdNamedDefine: true,
            },
            externals: {
                vue: "vue",
            },
            devtool: "source-map",
            devServer: {
                static: {
                    directory: path.resolve(`./components/${env.directoryName}/src`),
                },
                hot: true,
                compress: false,
                port,
                devMiddleware: {
                    writeToDisk: true,
                }
            },
            plugins: [
                new VueLoaderPlugin(),
                new HTMLWebpackPlugin(),
                new HTMLWebpackDeployPlugin({
                    useAssetsPath: false,
                    assets: {
                        copy: [
                            {
                                from: "./src/preview.js",
                                to: "./preview.js"
                            },
                            {
                                from: "../../node_modules/vue/dist/vue.js",
                                to: "./vue.js"
                            }
                        ],
                        scripts: [
                            {
                                append: false,
                                variableName: "Vue",
                                path: "vue.js",
                            },
                            "preview.js"
                        ],
                    }
                })
            ],
        }

    }
}