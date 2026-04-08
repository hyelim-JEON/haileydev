import type { Problem } from "./problem-types";

const mostFrequentCharProblem: Problem = {
  id: "most-frequent-char",
  title: "Most Frequent Character",
  difficulty: "Easy",
  summary: "Return the most frequent character in a string. If there is a tie, return the earliest one.",
  tests: [
    { input: '{"s":"bookkeeper"}', expected: '"e"' },
    { input: '{"s":"david"}', expected: '"d"' },
    { input: '{"s":"abby"}', expected: '"b"' },
  ],
  code: `function mostFrequentChar(s) {
  const count = {};

  // count frequency of each character
  for (const char of s) {
    count[char] = (count[char] || 0) + 1;
  }

  let best = null;

  // find the character with highest frequency
  for (const char of s) {
    if (best === null || count[char] > count[best]) {
      best = char;
    }
  }

  return best;
}

// Time: O(n)
// Space: O(n)
// 
// if multiple characters share the same max frequency,
// return all of them in an array`,
  run: (input) => {
    const { s } = JSON.parse(input);

    const count: Record<string, number> = {};

    for (const char of s) {
      count[char] = (count[char] || 0) + 1;
    }

    let best: string | null = null;

    for (const char of s) {
      if (best === null || count[char] > count[best]) {
        best = char;
      }
    }

    return JSON.stringify(best);
  },
};

export default mostFrequentCharProblem;
