import React, { useState } from 'react'
import {
  Box,
  Button,
  TextField,
  Tooltip,
  withStyles
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'

const TextTitle = ({ info, text, setText, id }) => {
  return (
    <>
      <Box className="command-block">
        <Box className="command-block-label">{info.name}</Box>
        <input
          style={{
            fontSize: info.size,
            fontWeight: info.weight,
          }}
          onChange={(e) => setText(id, e.target.value)}
          value={text}
          className="section-title-field"
          placeholder="Write Here..."
        />
      </Box>
    </>
  )
}

export default TextTitle