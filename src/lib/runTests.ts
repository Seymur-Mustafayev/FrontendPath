import type { TaskTest } from '../data/tasks';

export type TestStatus = 'pass' | 'fail' | 'error' | 'timeout';

export interface TestResult {
  status: TestStatus;
  actual?: string;
  error?: string;
  logs: string[];
}

const TEST_TIMEOUT = 2500;

const WORKER_SOURCE = `
const fmt = (v, depth = 0) => {
  if (v === undefined) return 'undefined';
  if (typeof v === 'number' && Number.isNaN(v)) return 'NaN';
  if (typeof v === 'string') return JSON.stringify(v);
  if (typeof v === 'function') return 'ƒ ' + (v.name || 'anonymous') + '()';
  if (typeof v === 'bigint') return v + 'n';
  if (typeof v === 'symbol') return v.toString();
  if (v instanceof Error) return v.name + ': ' + v.message;
  if (v instanceof Promise) return 'Promise {…}';
  if (v === null || typeof v !== 'object') return String(v);
  if (depth > 4) return Array.isArray(v) ? '[…]' : '{…}';
  if (Array.isArray(v)) return '[' + v.map((x) => fmt(x, depth + 1)).join(', ') + ']';
  const keys = Object.keys(v);
  if (!keys.length) return '{}';
  return '{ ' + keys.map((k) => (/^[A-Za-z_$][\\w$]*$/.test(k) ? k : JSON.stringify(k)) + ': ' + fmt(v[k], depth + 1)).join(', ') + ' }';
};

const eq = (a, b) => {
  if (Object.is(a, b)) return true;
  if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) return false;
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  const ka = Object.keys(a);
  const kb = Object.keys(b);
  if (ka.length !== kb.length) return false;
  return ka.every((k) => Object.prototype.hasOwnProperty.call(b, k) && eq(a[k], b[k]));
};

self.onunhandledrejection = (e) => e.preventDefault();

self.onmessage = async (e) => {
  const { code, tests } = e.data;
  for (let i = 0; i < tests.length; i++) {
    const t = tests[i];
    const logs = [];
    const log = (...args) => logs.push(args.map((x) => (typeof x === 'string' ? x : fmt(x))).join(' '));
    const sandboxConsole = { log, info: log, warn: log, error: log, debug: log };
    let result;
    try {
      const run = new Function('console', '"use strict";\\n' + code + '\\n;return (async () => (' + t.call + '))();');
      const value = await run(sandboxConsole);
      if (t.throws) result = { status: 'fail', actual: fmt(value) };
      else result = { status: eq(value, t.expect) ? 'pass' : 'fail', actual: fmt(value) };
    } catch (err) {
      const message = err && err.name ? err.name + ': ' + err.message : String(err);
      result = t.throws ? { status: 'pass', actual: message } : { status: 'error', error: message };
    }
    self.postMessage({ i, ...result, logs });
  }
  self.postMessage({ done: true });
};
`;

let workerUrl: string | undefined;

function createWorker(): Worker {
  workerUrl ??= URL.createObjectURL(new Blob([WORKER_SOURCE], { type: 'text/javascript' }));
  return new Worker(workerUrl);
}

export function formatExpected(test: TaskTest): string {
  const fmt = (v: unknown, depth = 0): string => {
    if (v === undefined) return 'undefined';
    if (typeof v === 'string') return JSON.stringify(v);
    if (v === null || typeof v !== 'object') return String(v);
    if (depth > 4) return Array.isArray(v) ? '[…]' : '{…}';
    if (Array.isArray(v)) return '[' + v.map((x) => fmt(x, depth + 1)).join(', ') + ']';
    const keys = Object.keys(v);
    if (!keys.length) return '{}';
    return (
      '{ ' +
      keys
        .map((k) => (/^[A-Za-z_$][\w$]*$/.test(k) ? k : JSON.stringify(k)) + ': ' + fmt((v as Record<string, unknown>)[k], depth + 1))
        .join(', ') +
      ' }'
    );
  };
  return fmt(test.expect);
}

export function runTests(
  code: string,
  tests: TaskTest[],
  onResult: (index: number, result: TestResult) => void
): Promise<TestResult[]> {
  return new Promise((resolve) => {
    const results: TestResult[] = [];
    const worker = createWorker();
    let timer: number | undefined;

    const finish = () => {
      window.clearTimeout(timer);
      worker.terminate();
      resolve(results);
    };

    const arm = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        for (let i = results.length; i < tests.length; i++) {
          const r: TestResult = { status: 'timeout', logs: [] };
          results[i] = r;
          onResult(i, r);
        }
        finish();
      }, TEST_TIMEOUT);
    };

    worker.onmessage = (e: MessageEvent) => {
      const data = e.data as { done?: boolean; i: number } & TestResult;
      if (data.done) return finish();
      const r: TestResult = { status: data.status, actual: data.actual, error: data.error, logs: data.logs };
      results[data.i] = r;
      onResult(data.i, r);
      arm();
    };
    worker.onerror = (e) => {
      e.preventDefault();
      for (let i = results.length; i < tests.length; i++) {
        const r: TestResult = { status: 'error', error: e.message || 'Error', logs: [] };
        results[i] = r;
        onResult(i, r);
      }
      finish();
    };

    arm();
    worker.postMessage({ code, tests });
  });
}
