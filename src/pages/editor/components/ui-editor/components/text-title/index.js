import React, { useState } from 'react'
import {
  TextField,
  Box,
  Tooltip,
  withStyles
} from '@material-ui/core'

const TextTitle = ({ info, text, setText, id }) => {
  return (
    <>
      <Box className="command-block">
        <Box className="command-block-label">{text}</Box>
        <input
          style={{
            fontSize: info.size,
            fontFamily: info.family,
            fontWeight: info.weight,
          }}
          onChange={(e) => setText(id, e.target.value)}
          value={text}
          className="section-title-field"
        />
      </Box>
    </>
  )
}

export default TextTitle