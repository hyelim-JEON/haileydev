import type { Problem } from "./problem-types";

const ransomNoteProblem: Problem = {
  id: "ransom-note",
  title: "Ransom Note",
  difficulty: "Easy",
  summary: "Return true if ransomNote can be constructed from magazine characters.",
  tests: [
    { input: '{"ransomNote":"aa","magazine":"aab"}', expected: "true" },
    { input: '{"ransomNote":"aa","magazine":"ab"}', expected: "false" },
  ],
  code: `function canConstruct(ransomNote, magazine) {
  const count = {};

  for (const char of magazine) {
    count[char] = (count[char] || 0) + 1;
  }

  for (const char of ransomNote) {
    if (!count[char]) return false;
    count[char]--;
  }

  return true;
}`,
  run: (input) => {
    const { ransomNote, magazine } = JSON.parse(input);

    const count: Record<string, number> = {};

    for (const char of magazine) {
      count[char] = (count[char] || 0) + 1;
    }

    for (const char of ransomNote) {
      if (!count[char]) return "false";
      count[char]--;
    }

    return "true";
  },
};

export default ransomNoteProblem;
