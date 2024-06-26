import { Worker } from "node:worker_threads";

/**
 * Creates a new Worker instance.
 *
 * @param workerPath - The path to the worker script.
 *
 * @returns A new Worker instance.
 */
export function createWorker(workerPath: string): Worker {
  const worker = new Worker(workerPath);
  worker.on("error", (err) => {
    throw err;
  });
  worker.on("messageerror", (err) => {
    throw err;
  });
  return worker;
}

/**
 * Creates new Worker instances.
 *
 * @param workerPath - The path to the worker script.
 * @param N - The number of workers to create.
 *
 * @returns An array of new Worker instances.
 */
export function createWorkers(workerPath: string, N = 1): Worker[] {
  const workers = new Array<Worker>(N);
  for (let i = 0; i < N; ++i) {
    workers[i] = createWorker(workerPath);
  }
  return workers;
}

/**
 * Executes a task on a Worker and returns a Promise that resolves with the response.
 *
 * @param worker - The Worker instance to execute the task.
 * @param req - The request to send to the worker.
 *
 * @returns A Promise that resolves with the response from the worker.
 */
export function exec<Req, Res>(worker: Worker, req: Req): Promise<Res> {
  return new Promise<Res>((resolve) => {
    worker.once("message", resolve);
    worker.postMessage(req);
  });
}
