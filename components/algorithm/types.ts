export type TestCase = {
  input: string;
  expected: string;
};

export type Problem = {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  summary: string;
  tests: TestCase[];
  code: string;
  run: (input: string) => string;
};
