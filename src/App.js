import React, { useState } from "react";
import styled from "styled-components";
import ParserEditor from "./ParserEditor";
import Parser from "./Parser";

const DEFAULT_PARSER = new Parser(function parse(data) {
  return data;
});

export default function App() {
  const [parser, setParser] = useState(DEFAULT_PARSER);

  function onParserChange(newParser) {
    setParser(newParser);
    console.log("App", newParser.parse({ foo: "bar" }));
  }

  return (
    <Root>
      <ParserEditor {...{ parser, onParserChange }} />
      <Result />
    </Root>
  );
}

const Root = styled.div`
  display: flex;
`;

const Result = styled.div``;
