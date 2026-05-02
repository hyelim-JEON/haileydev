import type { Problem } from "./problem-types";

const fibProblem: Problem = {
  id: "fib",
  title: "Fibonacci (Recursive)",
  difficulty: "Medium",
  summary: "Return the n-th number of the Fibonacci sequence using recursion.",
  tests: [
    { input: '{"n":0}', expected: "0" },
    { input: '{"n":1}', expected: "1" },
    { input: '{"n":2}', expected: "1" },
    { input: '{"n":5}', expected: "5" },
    { input: '{"n":7}', expected: "13" },
  ],
  code: `function fib(n) {
  if (n === 0) return 0;
  if (n === 1) return 1;

  return fib(n - 1) + fib(n - 2);
}`,
  run: (input) => {
    const { n } = JSON.parse(input);

    const fib = (n: number): number => {
      if (n === 0) return 0;
      if (n === 1) return 1;
      return fib(n - 1) + fib(n - 2);
    };

    return String(fib(n));
  },
};

export default fibProblem;
