import './App.css';
import * as emmet from 'emmet';
import { default as expand } from 'emmet';
import { useState, JSX } from 'react';
import { Problem, htmlProblems } from './Problem.ts';

// TODO: only dev-dependency is enough?
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/cjs/styles/prism';

// TODO: Separate files per component? Or easier layout.

/** Properties of {@link CodeBlock}. */
export type CodeBlockProps = {
  language: string;
  code: string;
};

export const CodeBlock = ({ language, code }: CodeBlockProps): JSX.Element => {
  // TODO: how to extract `className`? (as variables?)
  return (
    <SyntaxHighlighter
      className="emmet-layout-element-code"
      style={okaidia}
      language={language}
      children={String(code)}
    />
  );
};

/** Properties of {@link Acception}. */
export type AcceptionProps = {
  isAccepted: boolean;
};

/** The "Accepted" popup. */
export const Acception = ({
  isAccepted,
}: AcceptionProps): JSX.Element | null => {
  if (isAccepted) {
    // TODO: animation
    // TODO: never wrap, but fix in the screen, but not too big
    return (
      <div className="emmet-ac">
        <p className="emmet-ac-text">✓ Accepted</p>
      </div>
    );
  } else {
    return null;
  }
};

/** Properties of {@link Sidebar}. */
export type SidebarProps = {
  problems: Problem[];
  /** Zero-based. */
  currentProblem: number;
};

// TODO: collapsible
export const Sidebar = ({
  problems,
  currentProblem,
}: SidebarProps): JSX.Element => {
  // TODO: <p> should full fill the row
  return (
    <div className="emmet-sidebar">
      {problems.map((p, i) => (
        <p className={i == currentProblem ? 'emmet-sidebar-current' : ''}>
          <span className="emmet-sidebar-number">
            {`${String(i + 1).padStart(2, '0')}`}
          </span>
          {p.title}
        </p>
      ))}
    </div>
  );
};

export const App = (): JSX.Element => {
  const lang = 'html';
  const placeholder = 'type abbreviaton syntax';

  // TODO: use `useReducer`
  const [problemNo, setProblemNo] = useState(1);
  const problem = htmlProblems[problemNo];

  const [input, setCode] = useState('');
  const expandedInput = expand(input);

  if (problem === undefined) {
    alert('Invalid problem no?');
    // FIXME: type error
    // TODO: set the problem no to zero, but forbidding infinite loop
    return null;
  }

  const expectation = problem.expected;
  const expandedExpectation = expand(expectation);

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // strip newline characters
    e.target.value = e.target.value.replace(/[\r\n\v]+/g, '');

    // update code
    setCode(e.target.value);
  };

  // TODO: do not hard code className. maybe use storybook or something. or use constants?
  // TODO: do I have to nest `div`s to make up such a layout with flex?
  return (
    <>
      <header>
        <h1>Emmet 道場</h1>
      </header>
      <main>
        <Sidebar problems={htmlProblems} currentProblem={problemNo} />
        <div className="emmet-container">
          <p className="emmet-problem-title">
            {`${String(problemNo + 1).padStart(2, '0')} - ${problem.title}`}
          </p>
          <div className="emmet-layout">
            {/* left element: user input */}
            <div className="emmet-layout-element">
              <p className="emmet-layout-element-title">
                <textarea
                  rows={1}
                  className="emmet-layout-element-title-input"
                  placeholder={placeholder}
                  onChange={handleTextAreaChange}
                  autoFocus={true}
                >
                  {input}
                </textarea>
              </p>
              <CodeBlock language={lang} code={expandedInput} />
            </div>
            {/* right element: expected code*/}
            <div className="emmet-layout-element">
              <p className="emmet-layout-element-title">Expected</p>
              <CodeBlock language={lang} code={expandedExpectation} />
            </div>
          </div>
        </div>

        <Acception isAccepted={expandedInput === expandedExpectation} />
      </main>
    </>
  );
};
