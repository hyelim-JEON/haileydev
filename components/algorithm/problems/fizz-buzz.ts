import type { Problem } from "./problem-types";

const fizzBuzzProblem: Problem = {
  id: "fizz-buzz",
  title: "Fizz Buzz",
  difficulty: "Easy",
  summary: "Return an array from 1 to n, replacing multiples of 3 with 'fizz', 5 with 'buzz', and both with 'fizzbuzz'.",
  tests: [
    {
      input: '{"n":11}',
      expected: '[1,2,"fizz",4,"buzz","fizz",7,8,"fizz","buzz",11]',
    },
    {
      input: '{"n":2}',
      expected: "[1,2]",
    },
    {
      input: '{"n":16}',
      expected: '[1,2,"fizz",4,"buzz","fizz",7,8,"fizz","buzz",11,"fizz",13,14,"fizzbuzz",16]',
    },
  ],
  code: `function fizzBuzz(n) {
  const result = []; // store output

  for (let i = 1; i <= n; i++) {
    // divisible by both 3 and 5
    if (i % 15 === 0) {
      result.push("fizzbuzz");
    }
    // divisible by 3
    else if (i % 3 === 0) {
      result.push("fizz");
    }
    // divisible by 5
    else if (i % 5 === 0) {
      result.push("buzz");
    }
    // otherwise push number
    else {
      result.push(i);
    }
  }

  return result;
}

// Time: O(n)
// Space: O(n)`,
  run: (input) => {
    const { n } = JSON.parse(input);

    const result: (number | string)[] = [];

    for (let i = 1; i <= n; i++) {
      if (i % 15 === 0) {
        result.push("fizzbuzz");
      } else if (i % 3 === 0) {
        result.push("fizz");
      } else if (i % 5 === 0) {
        result.push("buzz");
      } else {
        result.push(i);
      }
    }

    return JSON.stringify(result);
  },
};

export default fizzBuzzProblem;
