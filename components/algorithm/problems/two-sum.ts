import type { Problem } from "./problem-types";

const twoSumProblem: Problem = {
  id: "two-sum",
  title: "Two Sum",
  difficulty: "Easy",
  summary: "Find the two indices whose values add up to the target.",
  tests: [
    { input: '{"nums":[2,7,11,15],"target":9}', expected: "[0,1]" },
    { input: '{"nums":[3,2,4],"target":6}', expected: "[1,2]" },
    { input: '{"nums":[3,3],"target":6}', expected: "[0,1]" },
  ],
  code: `function twoSum(nums, target) {
  const seen = new Map(); // value -> index

  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i]; // complement

    if (seen.has(need)) {
      return [seen.get(need), i]; // found pair
    }

    seen.set(nums[i], i); // store current
  }

  return [];
}`,
  run: (input) => {
    const { nums, target } = JSON.parse(input);

    const seen = new Map();

    for (let i = 0; i < nums.length; i++) {
      const need = target - nums[i];
      if (seen.has(need)) return JSON.stringify([seen.get(need), i]);
      seen.set(nums[i], i);
    }

    return "[]";
  },
};

export default twoSumProblem;
