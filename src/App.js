import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ParserEditor from "./ParserEditor";
import Result from "./Result";
import Source from "./Source";
import Parser from "./Parser";

const DEFAULT_PARSER_FUNC = `
function parse(data) {
  return [{ name: 'Untitle', data }];
}
`;

const DEFAULT_SOURCE = {
  apple: "aaa",
  blue: "bbb",
  cat: "ccc"
};

const tmpParser = localStorage.getItem('parser');
const tmpSource = JSON.parse(localStorage.getItem('source'));
const defaultParser = new Parser(tmpParser || DEFAULT_PARSER_FUNC);
const defaultSource = tmpSource ||DEFAULT_SOURCE;

export default function App() {
  const [source, setSource] = useState(defaultSource);
  const [parser, setParser] = useState(defaultParser);
  const [result, setResult] = useState([]);
  const [error, setError] = useState();
  const [isPortraitMode, setIsPortraitMode] = useState(window.innerHeight >= window.innerWidth);

  useEffect(() => {
    function onResize() {
      setIsPortraitMode(window.innerHeight >= window.innerWidth);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    try{
      const result = parser.parse(source);
      const isFormatCorrect = Array.isArray(result) && result[0].name;
      if(isFormatCorrect) {
        setResult(result);
      } else {
        setError(new Error('Ivalid format'));
      }
    } catch(e) {
      setError(e);
    }
    localStorage.setItem('parser', parser.toString());
    localStorage.setItem('source', JSON.stringify(source));
  }, [source, parser]);

  return (
    <Root isPortraitMode={isPortraitMode}>
      <ParserEditor
        isPortraitMode={isPortraitMode}
        parser={parser}
        onError={setError}
        onParserChange={setParser}
      />
      <Column isPortraitMode={isPortraitMode}>
        <Source
          isPortraitMode={isPortraitMode}
          data={source}
          onError={setError}
          onDataChange={setSource}
        />
        <Result isPortraitMode={isPortraitMode} data={result} error={error} />
      </Column>
    </Root>
  );
}

const Root = styled.div`
  display: flex;

  flex-direction: ${({ isPortraitMode }) =>
    isPortraitMode ? "column" : "row"};
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  ${({ isPortraitMode }) =>
    isPortraitMode
      ? `
    width: 100vw;
  `
      : `
    width: 50vw;
    height: 100vh;
  `}
`;
