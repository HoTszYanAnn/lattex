import React, { useState } from 'react'
import {
  Tooltip,
  Fab,
  Box
} from '@material-ui/core'

const ButtonMenu = ({ id, currentOpenWindow, handleOpenWindow, children, icon }) => {
  const open = currentOpenWindow === id
  return (
    <>
      <Box style={{ position: 'relative' }}>
        <Fab
          onClick={() => handleOpenWindow(id)}
          size="medium"
          className={`toolbar-button${open ? ' opened-toolbar-button' : ''}`}
          disableRipple={true}
        >
          {icon}
        </Fab>
        {/* TODO: wtf how to make that shape in svg*/}
        <Box className={open ? 'opened-toolbar-button-menu-shape-white-up' : ''} />
        <Box className={open ? 'opened-toolbar-button-menu-shape-orange-up' : ''} />
        <Box className={open ? 'opened-toolbar-button-menu-shape-white-down' : ''} />
        <Box className={open ? 'opened-toolbar-button-menu-shape-orange-down' : ''} />
        <Box className={open ? 'opened-toolbar-button-menu-bridge' : ''} />
      </Box>
      <Box className="toolbar-button-menu" style={{ display: open ? 'block' : 'none' }}>
        {children}
      </Box>
    </>
  )
}

export default ButtonMenu