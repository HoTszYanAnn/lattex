import React from 'react'
import { Box } from '@material-ui/core'

const block = ({ text, id }) => {
  return (
    <>
      <Box className="command-block">
        <Box className="command-block-label">{text}</Box>
          <input
            readonly
            style={{ textAlign: 'center', caretColor: 'transparent', cursor: 'context-menu' }}
            value={text}
            className="section-title-field"
          />
      </Box>
    </>
  )
}

export default block
