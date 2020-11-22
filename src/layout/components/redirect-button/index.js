import React from 'react'
import {
  Button,
  Box,
  makeStyles,
} from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import LoginButton from './components/login-button'
import EditorButton from './components/editor-button'
import { connect } from "react-redux";

const RedirectButton = ({ AUTHORIZED }) => {
  return (
    <>
      <Box style={{ zIndex: 999, position: 'fixed', top: '50%', left: 0, transform: 'translate(0, -50%)' }}>
        {AUTHORIZED
          ? <EditorButton />
          : <LoginButton />
        }
      </Box>
    </>
  )
}

export default connect(({ AUTHORIZED, USER_PROFILE }) => ({
  AUTHORIZED,
  USER_PROFILE,
}))(RedirectButton);