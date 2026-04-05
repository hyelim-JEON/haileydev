import type { Problem } from "./problem-types";

const longestWordProblem: Problem = {
  id: "longest-word",
  title: "Longest Word",
  difficulty: "Easy",
  summary: "Return the longest word in a sentence. If tie, return the later one.",
  tests: [
    { input: '{"sentence":"what a wonderful world"}', expected: '"wonderful"' },
    { input: '{"sentence":"have a nice day"}', expected: '"nice"' },
    {
      input: '{"sentence":"the quick brown fox jumped over the lazy dog"}',
      expected: '"jumped"',
    },
    { input: '{"sentence":"a bb ccc bb"}', expected: '"ccc"' },
  ],
  code: `function longestWord(sentence) {
  const words = sentence.split(" "); // split sentence into words
  let longest = "";

  for (const word of words) {
    // use >= to prefer later word in case of tie
    if (word.length >= longest.length) {
      longest = word;
    }
  }

  return longest; // return longest word
}`,
  run: (input) => {
    const { sentence } = JSON.parse(input);

    const words = sentence.split(" ");
    let longest = "";

    for (const word of words) {
      if (word.length >= longest.length) {
        longest = word;
      }
    }

    return JSON.stringify(longest);
  },
};

export default longestWordProblem;
