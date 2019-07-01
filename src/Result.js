import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AceEditor from "react-ace";
import jszip from 'jszip';
import { saveAs } from 'file-saver';
import iconDownload from './icon__download.png';


export default function Result({ data, error, isPortraitMode }) {
  const [currentFile, setCurrentFile] = useState(0);


  async function download() {
    const zip = new jszip().folder('output');
    data.forEach(({ name, data }) => zip.file(`${name}.json`, JSON.stringify(data, null, 2)));
    const output = await zip.generateAsync({type:"blob"});
    saveAs(output, 'output');
  }

  return (
    <Root>
      <DownloadButton onClick={download}/>
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
          <Tab/>
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
  position: relative;
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

const DownloadButton = styled.div`
  position: absolute;
  top: 5px;
  right: 8px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  background-image: url(${iconDownload});
  background-size: 24px 24px;
  background-position: center center;
  background-repeat: no-repeat;
  filter: drop-shadow(0px 0px 5px rgba(0,0,0,1));
  transition: filter 0.5s;

  &:hover {
    transition: filter 0s;
    filter: drop-shadow(0px 0px 10px rgba(255,255,255,1));
  }
`;