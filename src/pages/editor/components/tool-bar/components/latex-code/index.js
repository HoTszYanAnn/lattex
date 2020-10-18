import React, { useState } from 'react'
import CodeIcon from '@material-ui/icons/Code';
import {
  Button,
  Box,
  IconButton,
  Tooltip,
  Dialog
} from '@material-ui/core';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import FileSaver from 'file-saver';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import GetAppIcon from '@material-ui/icons/GetApp';

const LatexCode = ({ code }) => {

  const [open, setOpen] = useState(false)

  const handleChange = (val) => {
    setOpen(val)
  }

  const exportTexFile = () => {
    var file = new File([code], "lattex.tex", { type: "text/plain;charset=utf-8" });
    FileSaver.saveAs(file);
  }

  return (
    <>
      <Tooltip title="Source Code" placement="top">
        <IconButton onClick={() => handleChange(true)}>
          <CodeIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        onClose={() => handleChange(false)}
        open={open}
        fullWidth
        maxWidth='lg'
        disableBackdropClick={true}
        disableEscapeKeyDown={true}
      >
        <Box display='flex' style={{ backgroundColor: 'rgb(43, 43, 43)' }}>
          <Tooltip title="Back" placement="top">
            <IconButton onClick={() => handleChange(false)}>
              <ArrowBackIcon style={{ color: "#fff" }} />
            </IconButton>
          </Tooltip>
          <Box flexGrow={1} />
          <Tooltip title="Export as Tex" placement="top">
            <IconButton onClick={exportTexFile}>
              <GetAppIcon style={{ color: "#fff" }} />
            </IconButton>
          </Tooltip>
        </Box>
        <Box px={2} style={{ height: '50vh', backgroundColor: 'rgb(43, 43, 43)' }}>
          <SyntaxHighlighter language="latex" showLineNumbers wrapLongLines wrapLines style={a11yDark}>
            {code}
          </SyntaxHighlighter>
        </Box>
      </Dialog>
    </>
  );
}

export default LatexCode