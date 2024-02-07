import './App.css';
import * as emmet from 'emmet';
import { default as expand } from 'emmet';
import { useState, JSX } from 'react';
import { Problem, htmlProblems } from './Problem.ts';

// TODO: only dev-dependency is enough?
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/cjs/styles/prism';

/** Properties of {@link CodeBlock}. */
export type CodeBlockProps = {
  language: string;
  code: string;
};

export const CodeBlock = ({ language, code }: CodeBlockProps): JSX.Element => {
  // TODO: how to extract `className`?
  return (
    <SyntaxHighlighter
      className="emmet-code"
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

export const Acception = ({ isAccepted }: AcceptionProps): JSX.Element => {
  if (isAccepted) {
    // TODO: how to position
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

export const App = (): JSX.Element => {
  const lang = 'html';
  const placeholder = 'type abbreviaton syntax';

  // TODO: use `useReducer`
  const [problemNo, setProblemNo] = useState(0);
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

  // TODO: do not hard coding className. maybe use storybook.
  return (
    <>
      <header>
        <h1>Emmet 道場</h1>
      </header>
      <main>
        <p className="emmet-problem-title">
          {`${String(problemNo + 1).padStart(2, '0')} - ${problem.title}`}
        </p>
        <div className="emmet-layout">
          <textarea
            rows={1}
            className="emmet-input"
            placeholder={placeholder}
            onChange={handleTextAreaChange}
          >
            {input}
          </textarea>
          <p>Expected</p>

          <CodeBlock language={lang} code={expandedInput} />
          <CodeBlock language={lang} code={expandedExpectation} />
        </div>

        <Acception isAccepted={expandedInput === expandedExpectation} />
      </main>
    </>
  );
};
