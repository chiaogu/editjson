import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ParserEditor from "./ParserEditor";
import Result from "./Result";
import Parser from "./Parser";

const DEFAULT_PARSER = new Parser(function parse(data) {
  return data;
});

export default function App() {
  const [parser, setParser] = useState(DEFAULT_PARSER);
  const [error, setError] = useState();
  const [isPortraitMode, setIsPortraitMode] = useState();

  useEffect(() => {
    function onResize() {
      const { innerWidth, innerHeight } = window;
      setIsPortraitMode(innerHeight >= innerWidth);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const source = {
    apple: "aaa",
    blue: "bbb",
    cat: "ccc"
  };

  return (
    <Root
      style={{
        flexDirection: isPortraitMode ? "column" : "row"
      }}
    >
      <ParserEditor
        isPortraitMode={isPortraitMode}
        parser={parser}
        onError={setError}
        onParserChange={setParser}
      />
      <Result
        isPortraitMode={isPortraitMode}
        data={parser.parse(source)}
        error={error}
      />
    </Root>
  );
}

const Root = styled.div`
  display: flex;
`;
