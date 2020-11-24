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
import ButtonMenu from './components/button-menu'
import AddIcon from '@material-ui/icons/Add';
import SettingIcon from '@material-ui/icons/Settings';
import _ from 'lodash'

const useStyles = makeStyles((theme) => ({
  toolBox: {
    alignItems: 'center',
    flexDirection: 'column',
  },
}));

const ToolBar = ({ showCompiler, changeShowCompiler, pushAndCompile, doc, setBox, onSave }) => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false);
  const [currentOpenWindow, setWindowOpen] = React.useState(null);

  const handleOpenWindow = (val) => {
    if (val === currentOpenWindow)
      setWindowOpen(null)
    else
      setWindowOpen(val)
  }
  const handleClick = () => {
    setOpen(!open);
    setWindowOpen(null)
  };

  return (
    <>
      <Box>
        <Box display="block">
          <Tooltip title='ToolBar' aria-label='ToolBar'>
            <Fab onClick={handleClick} size="medium" color="primary">
              {open ? <CloseIcon style={{ color: 'white' }} /> : <EditIcon style={{ color: 'white' }} />}
            </Fab>
          </Tooltip>
        </Box>
        <Box display="block" my={2} />
        <Box display="block">
          <Grid item container direction="column" style={{ display: open ? 'flex' : 'none' }} alignItems="center" spacing={3}>
            {/* TODO: how can parse and use map lol */}
            <Grid item key="add-button">
              <Box alignSelf='flex-start'>
                <ButtonMenu
                  id="add-button"
                  key="add-button"
                  currentOpenWindow={currentOpenWindow}
                  handleOpenWindow={handleOpenWindow}
                  icon={<AddIcon style={{ color: currentOpenWindow === 'add-button' ? 'white' : 'orange', fontSize: 35 }} />}
                  children={
                    <>
                      asdasdasd add-button
                    </>
                  }
                />
              </Box>
            </Grid>
            <Grid item key="setting-button">
              <Box alignSelf='flex-start'>
                <ButtonMenu
                  id="setting-button"
                  key="setting-button"
                  currentOpenWindow={currentOpenWindow}
                  handleOpenWindow={handleOpenWindow}
                  icon={<SettingIcon style={{ color: currentOpenWindow === 'setting-button' ? 'white' : 'orange', fontSize: 35 }} />}
                  children={
                    <SettingButton doc={doc} pushAndCompile={pushAndCompile} />
                  }
                />
              </Box>
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
                <Fab size="small" onClick={onSave} disabled={!showCompiler}><CachedIcon /></Fab>
              </Tooltip>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  )
}

export default ToolBar