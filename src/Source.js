import React, { useState, useEffect } from "react";
import AceEditor from "react-ace";

export default function ParserEditor({
  isPortraitMode,
  data,
  onError,
  onDataChange
}) {
  const [editorValue, setEditorValue] = useState();

  useEffect(() => setEditorValue(JSON.stringify(data, null, 2)), [data]);

  function onChange(newValue) {
    setEditorValue(newValue + "");

    try {
      const data = JSON.parse(newValue);
      onDataChange(data);
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
        height: `${isPortraitMode ? 50 : 50}vh`
      }}
    />
  );
}
