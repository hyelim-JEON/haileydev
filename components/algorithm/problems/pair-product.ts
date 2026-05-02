import type { Problem } from "./problem-types";

const pairProductProblem: Problem = {
  id: "pair-product",
  title: "Pair Product",
  difficulty: "Easy",
  summary: "Return indices of two numbers whose product equals targetProduct.",
  tests: [
    { input: '{"numbers":[3,2,5,4,1],"targetProduct":8}', expected: "[1,3]" },
    { input: '{"numbers":[2,4,6,8],"targetProduct":16}', expected: "[1,3]" },
  ],
  code: `function pairProduct(numbers, targetProduct) {
  const map = {};

  for (let i = 0; i < numbers.length; i++) {
    const current = numbers[i];

    // skip if it can't divide evenly (no valid pair possible)
    if (targetProduct % current !== 0) continue;

    const need = targetProduct / current;

    // check if the needed value was seen before
    if (need in map) {
      return [map[need], i];
    }

    // store current number with its index
    map[current] = i;
  }
}`,
  run: (input) => {
    const { numbers, targetProduct } = JSON.parse(input);

    const map: Record<number, number> = {};

    for (let i = 0; i < numbers.length; i++) {
      const current = numbers[i];

      if (targetProduct % current !== 0) continue;

      const need = targetProduct / current;

      if (need in map) {
        return JSON.stringify([map[need], i]);
      }

      map[current] = i;
    }

    return "[]";
  },
};

export default pairProductProblem;
