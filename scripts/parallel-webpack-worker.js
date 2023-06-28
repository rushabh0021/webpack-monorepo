// workerData is used for fetching the data from the thread and parentPort is used for manipulating the thread
const { workerData, parentPort } = require("worker_threads");
const { execSync } = require("child_process");

// log some stuff
console.log(`Building Module ${workerData}`);

execSync(
  `webpack --config webpack.build.js --env directoryName=${workerData}`,
  {
    stdio: [0, 1, 2],
  }
);

console.log(`Module ${workerData} has finished building.`);
// The postMessage() method is used for posting the given message in the console by taking the filename as fetched by workerData
parentPort.postMessage(true);
