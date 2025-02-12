import React, { useRef, useEffect } from 'react'
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
import SettingButton from './components/setting';
import LatexCodeButton from './components/latex-code'
import CodeIcon from '@material-ui/icons/Code';
import ButtonMenu from './components/button-menu'
import AddIcon from '@material-ui/icons/Add';
import SettingIcon from '@material-ui/icons/Settings';
import _ from 'lodash'
import AddMenu from './components/add-menu';

const useStyles = makeStyles((theme) => ({
  toolBox: {
    alignItems: 'center',
    flexDirection: 'column',
  },
}));

const ToolBar = ({ showCompiler, changeShowCompiler, pushAndCompile, doc, setBox, setting, setSetting, onSave, uploadImages, loading }) => {
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

  const handleClose = () => {
    setOpen(false);
    setWindowOpen(null)
  };
  console.log(open)

  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          if (document.getElementsByClassName("MuiMenu-list") && document.getElementsByClassName("MuiMenu-list")[1]?.contains(event.target)){
            return
          }
          console.log('toolbar outsided!!!!!')
          handleClose()
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  return (
    <>
      <Box ref={wrapperRef}>
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
                    <AddMenu setBox={setBox} handleClose={handleClose} documentclass={doc.latex.documentclass} images={doc.latex.images} uploadImages={uploadImages} loading={loading} />
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
                    <SettingButton doc={doc} pushAndCompile={pushAndCompile} handleClose={handleClose} setting={setting} setSetting={setSetting}/>
                  }
                />
              </Box>
            </Grid>
            <Grid item key="code-button">
              <Box alignSelf='flex-start'>
                <ButtonMenu
                  id="code-button"
                  key="code-button"
                  currentOpenWindow={currentOpenWindow}
                  handleOpenWindow={handleOpenWindow}
                  icon={<CodeIcon style={{ color: currentOpenWindow === 'code-button' ? 'white' : 'orange', fontSize: 35 }} />}
                  children={
                    <LatexCodeButton code={doc.latex.latex_code} handleClose={handleClose} />
                  }
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  )
}

export default ToolBar