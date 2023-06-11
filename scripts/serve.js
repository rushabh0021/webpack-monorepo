const { execSync } = require("child_process");
const { existSync, rmSync, existsSync } = require("fs");

const arg = process.argv[2];

if(arg){
    const tempDir = `./components/${arg}/.temp`;
    const tempDirExists = existsSync(tempDir);
    if(tempDirExists){
        rmSync(tempDir, {recursive: true, force: true });
    }

    execSync(`webpack serve --env directoryName=${arg} --config webpack.dev.js`, {
        stdio: [0, 1, 2],
    });
}
console.error("Please provide component name");