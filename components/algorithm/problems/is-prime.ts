import type { Problem } from "./problem-types";

const isPrimeProblem: Problem = {
  id: "is-prime",
  title: "Is Prime",
  difficulty: "Easy",
  summary: "Return true if the given number is a prime number.",
  tests: [
    { input: '{"n":2}', expected: "true" },
    { input: '{"n":3}', expected: "true" },
    { input: '{"n":9}', expected: "false" },
    { input: '{"n":5}', expected: "true" },
    { input: '{"n":1}', expected: "false" },
  ],
  code: `function isPrime(n) {
  if (n < 2) return false; // 1 is not prime

  for (let i = 2; i * i <= n; i++) { //Time: O(sqrt(n)
    // check up to sqrt(n)
    if (n % i === 0) {
      return false;
    }
  } 

  return true; // no division found
}`,
  run: (input) => {
    const { n } = JSON.parse(input);

    if (n < 2) return "false";

    for (let i = 2; i * i <= n; i++) {
      if (n % i === 0) {
        return "false";
      }
    }

    return "true";
  },
};

export default isPrimeProblem;
