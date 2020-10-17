import React, { useState } from 'react'
import { UIEditor, LatexCompiler, ToolBar } from './components'
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
  },
}));

const Editor = ({ width }) => {
  const classes = useStyles()

  const [showCompiler, setShowCompiler] = useState(!['xs', 'sm', 'md'].includes(width))
  const [doc, setDoc] = useState()
  const [key, setKey] = useState('45645646546')
  const [latexCode, setLatexCode] = useState("")

  const changeShowCompiler = () => {
    setShowCompiler(!showCompiler)
  }

  const handleClick = () => {
    //push to github
    //refresh 
    setKey(key+'a')
  }

  return (
    <>

      <Box className={classes.toolbar}>
        <ToolBar showCompiler={showCompiler} changeShowCompiler={changeShowCompiler} />
        <Button onClick={handleClick}>compile</Button>
      </Box>
      {showCompiler ?
        ['xs', 'sm', 'md'].includes(width) ?
          <Grid container>
            <Grid item xs={12} className={classes.compiler}>
              <LatexCompiler doc={doc} key={key}/>
            </Grid>
          </Grid>
          :
          <Grid container>
            <Grid item xs={6} className={classes.editor}>
              <UIEditor />
            </Grid>
            <Grid item xs={6} className={classes.compiler}>
              <LatexCompiler doc={doc} key={key}/>
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