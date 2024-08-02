import './App.css';
import { default as unsafeExpand } from 'emmet';
import { useState, JSX } from 'react';
import { Problem, htmlProblems } from './Problem.ts';
import { Link } from 'react-router-dom';

// TODO: only dev-dependency is enough?
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/cjs/styles/prism';

// TODO: DPI.
// TODO: Separate files per component? Or easier layout.
// TODO: Let user select indent size.
// TODO: Cheat mode: show hints or answer on click at some point.

/** Properties of {@link CodeBlock}. */
export type CodeBlockProps = {
  readonly language: string;
  readonly code: string;
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

/** Properties of {@link Title}. */
export type TitleProps = {
  readonly problemNo: number;
  readonly title: string;
};

export const Title = ({ problemNo, title }: TitleProps): JSX.Element => {
  return (
    <p className="emmet-problem-title">
      {`${String(problemNo + 1).padStart(2, '0')} - ${title}`}
    </p>
  );
};

/** Properties of {@link Sidebar}. */
export type SidebarProps = {
  readonly problems: Problem[];
  /** Zero-based. */
  readonly currentProblem: number;
};

// TODO: collapsible
export const Sidebar = ({
  problems,
  currentProblem,
}: SidebarProps): JSX.Element => {
  // TODO: <p> should full fill the row
  // TODO: TODO: <Link> with parameters instead
  return (
    <div className="emmet-sidebar">
      {problems.map((p, i) => (
        <Link
          key={i}
          className={i === currentProblem ? 'emmet-sidebar-current' : ''}
          // The path contains `:problemId`, so use `../`:
          to={'../' + p.slug}
          relative="path"
        >
          <span className="emmet-sidebar-number">
            {`${String(i + 1).padStart(2, '0')}`}
          </span>
          {p.title}
        </Link>
      ))}
    </div>
  );
};

/** Tries to find the longest valid input and expands it. Returns `(expanded, isValid)`. */
export const expandBestEffort = (code: string): [string, boolean] => {
  var isValid = true;
  for (let len = code.length; len >= 1; len--) {
    const slice = code.slice(0, len);
    try {
      const expanded = unsafeExpand(slice);
      return [expanded, isValid];
    } catch (_) {
      isValid = false;
    }
  }
  return ['', isValid];
};

/** Properties of {@link App}. */
export type AppProps = {
  readonly problemNo: number;
  readonly problem: Problem;
};

export const App = ({ problemNo, problem }: AppProps): JSX.Element => {
  const lang = 'html';
  const placeholder = 'type abbreviaton syntax';

  const [input, setCode] = useState('');
  const [expandedInput, isValidInput] = expandBestEffort(input);

  const expectation = problem.expected;
  const expandedExpectation = unsafeExpand(expectation);

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
          <Title problemNo={problemNo} title={problem.title} />
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
                  value={input}
                ></textarea>
              </p>
              <CodeBlock language={lang} code={expandedInput} />
            </div>
            {/* right element: expected code*/}
            <div className="emmet-layout-element">
              {/* TODO: add cheat button */}
              <p className="emmet-layout-element-title">Expected</p>
              <CodeBlock language={lang} code={expandedExpectation} />
            </div>
          </div>
        </div>

        <Acception
          isAccepted={isValidInput && expandedInput === expandedExpectation}
        />
      </main>
    </>
  );
};
