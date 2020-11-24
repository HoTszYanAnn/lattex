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
  Grid,
  Fab
} from "@material-ui/core";

import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';

import CachedIcon from '@material-ui/icons/Cached';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import SettingButton from './components/setting';
import AddButton from './components/add-box'
import LatexCodeButton from './components/latex-code'

const useStyles = makeStyles((theme) => ({
  toolBox: {
    alignItems: 'center',
    flexDirection: 'column',
  },
}));

const ToolBar = ({ showCompiler, changeShowCompiler, pushAndCompile, doc, setBox, onSave }) => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <Box>
        <Box display="inline-block">
          <Tooltip title='ToolBar' aria-label='ToolBar'>
            <Fab onClick={handleClick} size="medium" color="primary">
              {open ? <CloseIcon /> : <EditIcon />}
            </Fab>
          </Tooltip>
        </Box>
        <Box display="inline-block" mx={1} />
        <Box display="inline-block">
          <Grid item container direction="row" style={{ display: open ? 'flex' : 'none' }} alignItems="center" spacing={3}>
            <Grid item>
              <SettingButton doc={doc} pushAndCompile={pushAndCompile} />
            </Grid>
            <Grid item>
              <Box alignSelf='flex-start'>
                <AddButton setBox={setBox} />
              </Box>
            </Grid>
            <Grid item>
              <LatexCodeButton code={doc.latex.latex_code} />
            </Grid>
            <Grid item>
              <Tooltip title='Show Compiler?' aria-label='Show Compiler?' placement="top">
                <Fab size="small" onClick={changeShowCompiler}>{showCompiler ? <VisibilityIcon /> : <VisibilityOffIcon />}</Fab>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title="Recompile" aria-label="Recompile" placement="top">
                <Fab size="small" onClick={pushAndCompile} disabled={!showCompiler}><CachedIcon /></Fab>
              </Tooltip>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  )
}

export default ToolBar