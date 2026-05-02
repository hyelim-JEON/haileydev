import type { Problem } from "./problem-types";

const counterProblem: Problem = {
  id: "counter",
  title: "Create Counter (Closure)",
  difficulty: "Easy",
  summary: "Return a function that returns n initially and increments by 1 on each call.",
  tests: [
    { input: '{"n":10,"calls":3}', expected: "[10,11,12]" },
    { input: '{"n":-2,"calls":5}', expected: "[-2,-1,0,1,2]" },
  ],
  code: `function createCounter(n) {
  return function() {
    return n++;
  };
}`,
  run: (input) => {
    const { n, calls } = JSON.parse(input);

    const createCounter = (n: number) => {
      return () => n++;
    };

    const counter = createCounter(n);
    const result: number[] = [];

    for (let i = 0; i < calls; i++) {
      result.push(counter());
    }

    return JSON.stringify(result);
  },
};

export default counterProblem;
