import type { Problem } from "./problem-types";

const arrayLastProblem: Problem = {
  id: "array-last",
  title: "Array Last",
  difficulty: "Easy",
  summary: "Return the last element of the array. If the array is empty, return -1.",
  tests: [
    { input: '{"nums":[null, {}, 3]}', expected: "3" },
    { input: '{"nums":[]}', expected: "-1" },
    { input: '{"nums":[5]}', expected: "5" },
    { input: '{"nums":[1,2,3,4]}', expected: "4" },
  ],
  code: `function last(nums) {
  if (nums.length === 0) return -1;
  return nums[nums.length - 1];
}`,
  run: (input) => {
    const { nums } = JSON.parse(input);

    if (nums.length === 0) return "-1";

    return String(nums[nums.length - 1]);
  },
};

export default arrayLastProblem;
