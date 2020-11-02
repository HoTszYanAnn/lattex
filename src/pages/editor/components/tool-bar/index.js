import React from 'react'
import {
  Box,
  IconButton,
  Button,
  Tooltip,
  Container,
  Link as MuiLink,
  Typography,
  makeStyles,
} from "@material-ui/core";
import CachedIcon from '@material-ui/icons/Cached';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import SettingButton from './components/setting';
import AddButton from './components/add-box'
import LatexCodeButton from './components/latex-code'

const useStyles = makeStyles((theme) => ({
  toolBox: {
    display: 'flex',
    height: '100%'
  },
}));

const ToolBar = ({ latexCode, showCompiler, changeShowCompiler, pushAndCompile, packedLatexCode, setPackedLatexCode }) => {
  const classes = useStyles()

  return (
    <>
      <Box className={classes.toolBox}>
        <Box mx={1} />
        <SettingButton 
          packedLatexCode={packedLatexCode} 
          setPackedLatexCode={setPackedLatexCode}
        />
        <AddButton/>
        <Box flexGrow={1} />
        <LatexCodeButton code={latexCode} />
        <Tooltip title='Show Compiler?' aria-label='Show Compiler?' placement="top">
          <IconButton onClick={changeShowCompiler}>{showCompiler ? <VisibilityIcon /> : <VisibilityOffIcon />}</IconButton>
        </Tooltip>
        <Tooltip title="Recompile" aria-label="Recompile" placement="top">
          <IconButton onClick={pushAndCompile} disabled={!showCompiler}><CachedIcon /></IconButton>
        </Tooltip>
        <Box mx={1} />
      </Box>
    </>
  )
}

export default ToolBar