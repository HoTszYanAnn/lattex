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
    backgroundColor: 'grey'
  }
}));

const Editor = ({ width }) => {
  const [showCompiler, setShowCompiler] = useState(!['xs', 'sm', 'md'].includes(width))
  const classes = useStyles()
  console.log(width)
  const changeShowCompiler = () => {
    setShowCompiler(!showCompiler)
  }

  return (
    <>
      <Box className={classes.toolbar}>
        <ToolBar showCompiler={showCompiler} changeShowCompiler={changeShowCompiler} />
      </Box>
      {showCompiler ?
        ['xs', 'sm', 'md'].includes(width) ?
          <Grid container>
            <Grid item xs={12} className={classes.compiler}>
              <LatexCompiler />
            </Grid>
          </Grid>
          :
          <Grid container>
            <Grid item xs={6} className={classes.editor}>
              <UIEditor />
            </Grid>
            <Grid item xs={6} className={classes.compiler}>
              <LatexCompiler />
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