import React, { useState } from 'react'
import {
  Box,
  Button,
  TextField,
  Tooltip,
  withStyles
} from '@material-ui/core'

const TextTitle = ({ info, text, setText, id, label, star = false }) => {
  return (
    <>
      <Box className="command-block">
        <Box className="command-block-label">{info.name} Title {star && '(will not be added in content)'} </Box>
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