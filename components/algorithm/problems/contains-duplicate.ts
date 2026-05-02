import type { Problem } from "./problem-types";

const containsDuplicateProblem: Problem = {
  id: "contains-duplicate",
  title: "Contains Duplicate",
  difficulty: "Easy",
  summary: "Return true if any value appears at least twice in the array.",
  tests: [
    { input: '{"nums":[1,2,3,1]}', expected: "true" },
    { input: '{"nums":[1,2,3,4]}', expected: "false" },
  ],
  code: `function containsDuplicate(nums) {
  const seen = new Set();

  for (const num of nums) {
    // if already seen, duplicate exists
    if (seen.has(num)) return true;

    // store the number
    seen.add(num);
  }

  return false; // no duplicates found
}`,
  run: (input) => {
    const { nums } = JSON.parse(input);

    const seen = new Set<number>();

    for (const num of nums) {
      if (seen.has(num)) return "true";
      seen.add(num);
    }

    return "false";
  },
};

export default containsDuplicateProblem;
