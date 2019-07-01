import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AceEditor from "react-ace";

export default function Result({ data, error, isPortraitMode }) {
  const [currentFile, setCurrentFile] = useState(0);

  return (
    <Root>
      {data && (
        <TabBar>
          {data.map(({ name }, index) => (
            <Tab
              key={index}
              isSelected={index === currentFile}
              onClick={() => setCurrentFile(index)}
            >
              {name}
            </Tab>
          ))}
        </TabBar>
      )}
      {error && <div>{error.message}</div>}
      <AceEditor
        readOnly
        mode="javascript"
        theme="monokai"
        fontSize={14}
        value={
          data &&
          data[currentFile] &&
          JSON.stringify(data[currentFile].data, null, 2)
        }
        highlightActiveLine={false}
        editorProps={{ $blockScrolling: true }}
        setOptions={{ tabSize: 2 }}
        style={{
          width: `${isPortraitMode ? 100 : 50}vw`,
          height: `${isPortraitMode ? 50 : 50}vh`
        }}
      />
    </Root>
  );
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

const TabBar = styled.div`
  display: flex;
  background: #000;
  overflow: auto;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const Tab = styled.div`
  width: 100px;
  height: 40px;
  cursor: pointer;
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  background: #222;
  color: #ddd;
  border-right: 1px solid #000;
  font-family: Courier New;

  ${({ isSelected }) =>
    isSelected &&
    `
    background: #333;
    color: #fff;
  `}
`;
