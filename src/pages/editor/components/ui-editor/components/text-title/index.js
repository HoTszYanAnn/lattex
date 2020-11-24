import React, { useState } from 'react'
import {
  TextField,
  Box,
  Tooltip,
  withStyles
} from '@material-ui/core'
import "./styles.scss"
import { NoMarginTooltip } from '../component-style'

const TextTitle = ({ info, text, setText, id }) => {
  return (
    <>
      <Box>
        <NoMarginTooltip title={`${info.name} Title`} aria-label={info.name} placement="top-start">
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
        </NoMarginTooltip>
      </Box>
    </>
  )
}

export default TextTitle