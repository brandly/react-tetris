import React from 'react';
import styled from 'styled-components';

const Shell = styled.div`
  display: inline-block;
  margin: 18px 0;
  font-family: Consolas, 'Andale Mono WT', 'Andale Mono', 'Lucida Console',
    'Lucida Sans Typewriter', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono',
    'Liberation Mono', 'Nimbus Mono L', Monaco, 'Courier New', Courier,
    monospace;
  border-radius: 5px;
  background: #fff;
  border: 1px solid #eaeaea;
  padding: 12px 18px;
`;

export default function TypedShell({
  children
}: {
  children: string;
}): JSX.Element {
  const [lettersToShow, setLettersToShow] = React.useState(0);

  React.useEffect(() => {
    let id: number | undefined;
    const addLetters = () => {
      const wait = Math.random() * 200 + 40;

      id = setTimeout(() => {
        setLettersToShow((current) => current + 1);

        if (lettersToShow < children.length) {
          addLetters();
        }
      }, wait);
    };

    addLetters();

    return () => {
      id && clearTimeout(id);
    };
  }, [lettersToShow, setLettersToShow, children]);

  return <Shell>$ {children.slice(0, lettersToShow)}</Shell>;
}
