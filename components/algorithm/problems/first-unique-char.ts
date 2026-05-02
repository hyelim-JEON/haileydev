import type { Problem } from "./problem-types";

const firstUniqueCharProblem: Problem = {
  id: "first-unique-char",
  title: "First Unique Character",
  difficulty: "Easy",
  summary: "Return the index of the first non-repeating character. If none, return -1.",
  tests: [
    { input: '{"s":"leetcode"}', expected: "0" },
    { input: '{"s":"loveleetcode"}', expected: "2" },
    { input: '{"s":"aabb"}', expected: "-1" },
  ],
  code: `function firstUniqChar(s) {
  const count = {};

  for (const char of s) {
    count[char] = (count[char] || 0) + 1;
  }

  for (let i = 0; i < s.length; i++) {
    if (count[s[i]] === 1) {
      return i;
    }
  }

  return -1;
}`,
  run: (input) => {
    const { s } = JSON.parse(input);

    const count: Record<string, number> = {};

    for (const char of s) {
      count[char] = (count[char] || 0) + 1;
    }

    for (let i = 0; i < s.length; i++) {
      if (count[s[i]] === 1) {
        return String(i);
      }
    }

    return "-1";
  },
};

export default firstUniqueCharProblem;
