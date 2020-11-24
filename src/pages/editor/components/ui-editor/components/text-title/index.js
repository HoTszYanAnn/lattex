import React, { useState } from 'react'
import {
  TextField,
  Box,
  Tooltip,
  withStyles
} from '@material-ui/core'
import "./styles.scss"

const NoMarginTooltip = withStyles((theme) => ({
  tooltip: {
    margin: 0,
    fontSize: 12
  },
}))(Tooltip);

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