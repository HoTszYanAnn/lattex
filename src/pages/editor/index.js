import React, { useState, useEffect } from 'react'
import { UIEditor, LatexCompiler, ToolBar } from './components'
import { v4 as uuidv4 } from 'uuid';
import {
  Box,
  Button,
  Container,
  Grid,
  Link as MuiLink,
  Typography,
  makeStyles,
  withWidth
} from "@material-ui/core";
import { toLatexCode } from './function'

const useStyles = makeStyles((theme) => ({
  toolbar: {
    height: '40px',
    backgroundColor: '#ffe8c9'
  },
  editor: {
    height: '85vh',
    backgroundColor: '#efefef'
  },
  compiler: {
    height: '85vh',
    backgroundColor: 'grey',
  },
}));

const defaultPackedCode = {
  verified: '%make by LätTeX\n',
  documentType: '\\document{article}\n',
  haveContentPage: '%\\tableofcontents\n',
  titles: '\\title{testing}\n\\author{}\n\\date{\\today}\n',
  begin: '\\begin{document}\n',
  haveTitle: '%\\maketitle\n',
  content: [
    'testing\n',
  ],
  end: '\\end{document}\n'
}

const Editor = ({ width }) => {
  const classes = useStyles()

  const [showCompiler, setShowCompiler] = useState(!['xs', 'sm', 'md'].includes(width))
  const [doc, setDoc] = useState()
  const [key, setKey] = useState(uuidv4())

  // get code parse
  const [packedLatexCode, setPackedLatexCode] = useState(defaultPackedCode)
  const [latexCode, setLatexCode] = useState(toLatexCode(packedLatexCode))
  
  const changeShowCompiler = () => {
    setShowCompiler(!showCompiler)
  }

  const pushAndCompile = () => {
    //push to github
    setKey(uuidv4())
  }

  useEffect(() => {
    setLatexCode(toLatexCode(packedLatexCode))
  }, [packedLatexCode])

  return (
    <>
      <Box className={classes.toolbar}>
        <ToolBar
          showCompiler={showCompiler}
          changeShowCompiler={changeShowCompiler}
          pushAndCompile={pushAndCompile}
          latexCode={latexCode}
          packedLatexCode={packedLatexCode}
          setPackedLatexCode={setPackedLatexCode}
        />
      </Box>
      <Grid container>
        <Grid item xs={12} lg={showCompiler ? 6 : 12} className={classes.editor} style={{ display: showCompiler ? ['xs', 'sm', 'md'].includes(width) ? 'none' : 'block' : 'block' }}>
          <UIEditor />
        </Grid>
        <Grid item xs={12} lg={6} className={classes.compiler} style={{ display: showCompiler ? 'block' : 'none' }}>
          <LatexCompiler doc={doc} key={key}/>
        </Grid>
      </Grid>
    </>
  )
}

export default withWidth()(Editor)