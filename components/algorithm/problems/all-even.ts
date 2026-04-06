import type { Problem } from "./problem-types";

const allEvenProblem: Problem = {
  id: "all-even",
  title: "All Even",
  difficulty: "Easy",
  summary: "Return true if every number in the array is even.",
  tests: [
    { input: '{"nums":[4,90,68,6,-2]}', expected: "true" },
    { input: '{"nums":[14,40,36,3]}', expected: "false" },
    { input: '{"nums":[30,24,2048,0,12,50]}', expected: "true" },
    { input: '{"nums":[7,7,7,7]}', expected: "false" },
    { input: '{"nums":[100]}', expected: "true" },
  ],
  code: `function allEven(nums) {
  for (const num of nums) { //Time: O(n)
    // if any number is odd, return false
    if (num % 2 !== 0) {
      return false;
    }
  }

  return true; // all numbers are even
}`,
  run: (input) => {
    const { nums } = JSON.parse(input);

    for (const num of nums) {
      if (num % 2 !== 0) {
        return "false";
      }
    }

    return "true";
  },
};

export default allEvenProblem;
