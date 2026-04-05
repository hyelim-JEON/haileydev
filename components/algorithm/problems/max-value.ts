import type { Problem } from "./problem-types";

const maxValueProblem: Problem = {
  id: "max-value",
  title: "Max Value",
  difficulty: "Easy",
  summary: "Return the largest number in an array without using built-in methods.",
  tests: [
    { input: '{"nums":[4,7,2,8,10,9]}', expected: "10" },
    { input: '{"nums":[10,5,40,40.3]}', expected: "40.3" },
    { input: '{"nums":[-5,-2,-10]}', expected: "-2" },
    { input: '{"nums":[1]}', expected: "1" },
  ],
  code: `function maxValue(nums) {
  let max = -Infinity; // smallest start

  for (let i = 0; i < nums.length; i++) {
    // update max if current is bigger
    if (nums[i] > max) {
      max = nums[i];
    }
  }

  return max;
}`,
  run: (input) => {
    const { nums } = JSON.parse(input);

    let max = -Infinity;

    for (let i = 0; i < nums.length; i++) {
      if (nums[i] > max) {
        max = nums[i];
      }
    }

    return String(max);
  },
};

export default maxValueProblem;
