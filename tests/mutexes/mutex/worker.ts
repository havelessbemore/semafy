import { parentPort } from "node:worker_threads";

interface Request {
  type: string;
}

const fns: Record<string, (msg: unknown) => unknown> = {};
parentPort!.addListener("message", async (msg: Request) => {
  const fn = fns[msg.type];
  if (fn == null) {
    throw new Error("Unknown message type");
  }
  const res = fn(msg);
  if (res instanceof Promise) {
    parentPort!.postMessage(await res);
  } else {
    parentPort!.postMessage(res);
  }
});
