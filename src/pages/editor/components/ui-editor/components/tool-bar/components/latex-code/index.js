import React, { useState } from 'react'
import {
  Button,
  Box,
  IconButton,
  Tooltip,
  Dialog,
  Fab
} from '@material-ui/core';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import FileSaver from 'file-saver';
import GetAppIcon from '@material-ui/icons/GetApp';

const LatexCode = ({ code }) => {

  const exportTexFile = () => {
    var file = new File([code], "lattex.tex", { type: "text/plain;charset=utf-8" });
    FileSaver.saveAs(file);
  }

  return (
    <>
      <Box style={{ maxWidth: '30vw', marginLeft: '15px', backgroundColor: 'rgb(43, 43, 43)', maxHeight: '50vh' }} className="latex-code-menu">
        <Box display='flex' style={{ position: 'sticky', top: 0 }}>
          <Tooltip title="Export as Tex" placement="top">
            <IconButton onClick={exportTexFile}>
              <GetAppIcon style={{ color: "#fff" }} />
            </IconButton>
          </Tooltip>
        </Box>
        <Box style={{ margin: 0, maxHeight: 'calc(50vh - 48px)', overflowY: "auto" }}>
          <SyntaxHighlighter language="latex" showLineNumbers wrapLines style={a11yDark}>
            {code}
          </SyntaxHighlighter>
        </Box>
      </Box>
    </>
  );
}

export default LatexCode