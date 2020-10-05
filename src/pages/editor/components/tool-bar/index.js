import React from 'react'
import {
  Box,
  Button,
  Container,
  Link as MuiLink,
  Typography,
  makeStyles,
} from "@material-ui/core";



const ToolBar = ({ showCompiler, changeShowCompiler }) => {

  return (
    <>
      ToolBar
      <Button onClick={changeShowCompiler}>{showCompiler ? 'Disable Compiler' : 'Show Compiler'} </Button>
    </>
  )
}

export default ToolBar