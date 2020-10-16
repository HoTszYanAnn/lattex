import React, { useState } from 'react'
import { UIEditor, LatexCompiler, ToolBar } from './components'
import { parse, HtmlGenerator } from 'latex.js'
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

const useStyles = makeStyles((theme) => ({
  toolbar: {
    height: '5vh',
    backgroundColor: 'yellow'
  },
  editor: {
    height: '85vh',
    backgroundColor: '#efefef'
  },
  compiler: {
    height: '85vh',
    backgroundColor: 'grey',
    padding: '1.5rem 3rem',
  }
}));

const Editor = ({ width }) => {
  const classes = useStyles()
  
  const [showCompiler, setShowCompiler] = useState(!['xs', 'sm', 'md'].includes(width))
  const [doc, setDoc] = useState()
  const [latexCode, setLatexCode] = useState("")

  let generator = new HtmlGenerator({ hyphenate: false })
  
  const handleClick = () => {
    fetch('/latex.tex')
    .then((r) => r.text())
    .then(text  => {
      setDoc(parse(text, { generator: generator }).htmlDocument())
    })
  }

  const changeShowCompiler = () => {
    setShowCompiler(!showCompiler)
  }

  return (
    <>

      <Box className={classes.toolbar}>
        <ToolBar showCompiler={showCompiler} changeShowCompiler={changeShowCompiler} />
        <Button onClick={handleClick}>test</Button>
      </Box>
      {showCompiler ?
        ['xs', 'sm', 'md'].includes(width) ?
          <Grid container>
            <Grid item xs={12} className={classes.compiler}>
              <LatexCompiler doc={doc}/>
            </Grid>
          </Grid>
          :
          <Grid container>
            <Grid item xs={6} className={classes.editor}>
              <UIEditor />
            </Grid>
            <Grid item xs={6} className={classes.compiler}>
              <LatexCompiler doc={doc}/>
            </Grid>
          </Grid>
        :
        <Grid container>
          <Grid item xs={12} className={classes.editor}>
            <UIEditor />
          </Grid>
        </Grid>
      }
    </>
  )
}

export default withWidth()(Editor)