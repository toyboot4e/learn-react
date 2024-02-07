export class Problem {
  readonly title: string;
  readonly expected: string;

  constructor(title: string, expected: string) {
    this.title = title;
    this.expected = expected;
  }
}

// TODO: Extract the data and load file at compile time.
export const htmlProblems: Problem[] = [
  new Problem('Bang', '!'),
  new Problem('List', 'div>ol>li*3'),
  new Problem('Nav', 'nav>ol>li*3'),
];
