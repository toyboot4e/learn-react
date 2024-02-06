import './App.css';
import * as emmet from 'emmet';
import { default as expand } from 'emmet';
import { FC, useState } from 'react';

// TODO: only dev-dependency is enough?
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/cjs/styles/prism';

/** Properties of {@link CodeBlock}. */
export type CodeBlockProps = {
  language: string;
  code: string;
};

export const CodeBlock: FC<CodeBlockProps> = ({ language, code }) => {
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

export const Acception: FC<AcceptionProps> = ({ isAccepted }) => {
  if (isAccepted) {
    // TODO: how to position
    // TODO: animation
    return (
      <div className="emmet-ac">
        <p className="emmet-ac-text">✓ Accepted</p>
      </div>
    );
  } else {
    return null;
  }
};

// /** Properties of {@link Square}. */
// export type CodeBlockProps = {
//   value: string;
//   isFocused: boolean;
//   onSquareClick: () => void;
// };

// constants
const placeholder = 'type abbreviaton syntax';

// TODO: Type annotation for this function?
export function App() {
  const [lang, setLang] = useState('html');

  // TODO: use `useReducer`
  const [expectation, setExpectation] = useState('div>ol>li*3');
  const expandedExpectation = expand(expectation);

  const [input, setCode] = useState('');
  const expandedInput = expand(input);

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
        <h1>Emmet 速習</h1>
      </header>
      <main>
        <div className="emmet-layout">
          <div className="emmet-column">
            <textarea
              rows={1}
              className="emmet-input"
              placeholder={placeholder}
              onChange={handleTextAreaChange}
            >
              {input}
            </textarea>
            <CodeBlock language={lang} code={expandedInput} />
          </div>

          <div className="emmet-column">
            <p>Expected</p>
            <CodeBlock language={lang} code={expandedExpectation} />
          </div>
        </div>

        <Acception isAccepted={expandedInput === expandedExpectation} />
      </main>
    </>
  );
}
