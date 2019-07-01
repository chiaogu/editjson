import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AceEditor from "react-ace";
import "brace/mode/javascript";
import "brace/theme/monokai";
import Parser from "./Parser";

export default function ParserEditor({ parser, onParserChange }) {
  const [error, setError] = useState();
  const [editorValue, setEditorValue] = useState();

  useEffect(() => setEditorValue(parser.toString()), [parser]);

  function onChange(newValue) {
    setEditorValue(newValue + "");

    try {
      const parser = new Parser(eval(`(${newValue})`));
      onParserChange(parser);
      setError();
    } catch (e) {
      setError(e);
    }
  }

  return (
    <Root>
      <AceEditor
        placeholder="Placeholder Text"
        mode="javascript"
        theme="monokai"
        name="blah2"
        onChange={onChange}
        fontSize={14}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        debounceChangePeriod={1000}
        value={editorValue}
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          showLineNumbers: true,
          tabSize: 2
        }}
        style={{
          width: "50vw",
          height: "100vh"
        }}
      />
      {error && <div>{error.message}</div>}
    </Root>
  );
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;
