import React, { useState, useEffect } from "react";
import AceEditor from "react-ace";
import "brace/mode/javascript";
import "brace/theme/monokai";
import Parser from "./Parser";

export default function ParserEditor({ isPortraitMode, parser, onError, onParserChange }) {
  const [editorValue, setEditorValue] = useState();

  useEffect(() => setEditorValue(parser.toString()), [parser]);

  function onChange(newValue) {
    setEditorValue(newValue + "");

    try {
      const parser = new Parser(eval(`(${newValue})`));
      onParserChange(parser);
      onError();
    } catch (e) {
      onError(e);
    }
  }

  return (
    <AceEditor
      onChange={onChange}
      value={editorValue}
      mode="javascript"
      theme="monokai"
      fontSize={14}
      debounceChangePeriod={1000}
      setOptions={{ tabSize: 2 }}
      style={{
        width: `${isPortraitMode ? 100 : 50}vw`,
        height: `${isPortraitMode ? 50 : 100}vh`
      }}
    />
  );
}
