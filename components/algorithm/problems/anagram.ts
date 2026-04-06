import type { Problem } from "./problem-types";

const anagramsProblem: Problem = {
  id: "anagrams",
  title: "Anagrams",
  difficulty: "Easy",
  summary: "Return true if two strings are anagrams (contain the same characters with the same frequency).",
  tests: [
    { input: '{"s1":"restful","s2":"fluster"}', expected: "true" },
    { input: '{"s1":"cats","s2":"tocs"}', expected: "false" },
    { input: '{"s1":"monkeyswrite","s2":"newyorktimes"}', expected: "true" },
  ],
  code: `function anagrams(s1, s2) {
  // if lengths are different, they can't be anagrams
  if (s1.length !== s2.length) return false;

  const count = {}; // char -> frequency

  // count characters in first string
  for (const char of s1) {
    count[char] = (count[char] || 0) + 1;
  }

  // subtract using second string
  for (const char of s2) {
    // if char doesn't exist, not an anagram
    if (!(char in count)) return false;

    count[char] -= 1;
  }

  // check if all counts are back to zero
  for (const char in count) {
    if (count[char] !== 0) return false;
  }

  return true; // all matched
}

// Time: O(n)
// Space: O(n)`,
  run: (input) => {
    const { s1, s2 } = JSON.parse(input);

    if (s1.length !== s2.length) return "false";

    const count: Record<string, number> = {};

    for (const char of s1) {
      count[char] = (count[char] || 0) + 1;
    }

    for (const char of s2) {
      if (!(char in count)) return "false";
      count[char] -= 1;
    }

    for (const char in count) {
      if (count[char] !== 0) return "false";
    }

    return "true";
  },
};

export default anagramsProblem;
