const baseConfig = require("./webpack.config");
const path = require("path");

module.exports = (env) => {
    console.log(env);
    const componentPrefix = "my-";
    const componentDirectory = `./components/${env.directoryName}`;

    return {
        entry: path.resolve(`./components/${env.directoryName}/src/index.js`),
        output: {
            path: path.resolve(`./components/${env.directoryName}/build/`),
            filename: `${componentPrefix}${env.directoryName}.js`,
            library: `${componentPrefix}${env.directoryName}`,
            libraryTarget: "umd",
            umdNamedDefine: true,
        },
        optimization: {
            chunkIds: "deterministic",
        },
        ...baseConfig,
        ...{ mode: "production" },
    }
}