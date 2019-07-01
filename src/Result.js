import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AceEditor from "react-ace";
import "brace/mode/javascript";
import "brace/theme/monokai";

export default function Result({ data, error, isPortraitMode }) {

  return (
    <Root>
      {error && <div>{error.message}</div>}
      <AceEditor
        readOnly
        mode="javascript"
        theme="monokai"
        fontSize={14}
        value={JSON.stringify(data)}
        editorProps={{ $blockScrolling: true }}
        setOptions={{ tabSize: 2 }}
        style={{
          width: `${isPortraitMode ? 100 : 50}vw`,
          height: `${isPortraitMode ? 50 : 100}vh`
        }}
      />
    </Root>
  );
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;
