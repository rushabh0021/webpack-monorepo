/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const { Worker } = require("worker_threads");
const OS = require("os");

const { rmSync, existsSync } = fs;

const cores = OS.cpus().length;
process.env.UV_THREADPOOL_SIZE = cores;
const MAX_PARALLEL_THREADS = cores;

async function* raceAsyncIterators(asyncIterators) {
  async function nextResultWithItsIterator(iterator) {
    return { result: await iterator.next(), iterator };
  }
  /** @type Map<AsyncIterator<T>,
        Promise<{result: IteratorResult<T>, iterator: AsyncIterator<T>}>> */
  const promises = new Map(
    asyncIterators.map((iterator) => [
      iterator,
      nextResultWithItsIterator(iterator),
    ])
  );
  while (promises.size) {
    const { result, iterator } = await Promise.race(promises.values());
    if (result.done) {
      promises.delete(iterator);
    } else {
      promises.set(iterator, nextResultWithItsIterator(iterator));
      yield result.value;
    }
  }
}

async function* runTasks(maxConcurrency, taskIterator) {
  // Each async iterator is a worker, polling for tasks from the shared taskIterator
  // Sharing the iterator ensures that each worker gets unique tasks.
  const asyncIterators = new Array(maxConcurrency);
  for (let i = 0; i < maxConcurrency; i++) {
    asyncIterators[i] = (async function* () {
      for (const task of taskIterator) yield await task();
    })();
  }
  yield* raceAsyncIterators(asyncIterators);
}

// function createWorker() runs the worker thread and returns a Promise
const createWorker = (workerData) =>
  new Promise((resolve, reject) => {
    const worker = new Worker("./scripts/parallel-webpack-worker.js", {
      workerData,
    });
    worker.on("message", resolve);
    worker.on("error", reject);
    worker.on("exit", (code) => {
      if (code !== 0)
        reject(
          new Error(
            `Parallel Webpack Worker Thread stopped with exit code ${code}`
          )
        );
    });
  });

const arg = process.argv[2] || "all";

if (arg === "all") {
  // spawn worker threads;
  const directoryPath = path.resolve(`./components`);

  const tasks = fs
    .readdirSync(directoryPath, { withFileTypes: true })
    .filter((directory) => directory.isDirectory())
    .map(
      (directory) => () =>
        createWorker(directory.name).catch((err) => console.error(err))
    );
  (async () => {
    for await (const unusedVar of runTasks(
      MAX_PARALLEL_THREADS,
      tasks.values()
    )) {
      console.log("");
    }
  })();
} else {
  if (arg) {
    const buildDir = `./components/${arg}/build`;
    const buildDirExists = existsSync(buildDir);
    if (buildDirExists) {
      rmSync(buildDir, { recursive: true, force: true });
    }
  }
  execSync(`webpack --config webpack.build.js --env directoryName=${arg}`, {
    stdio: [0, 1, 2],
  });
}
