import React from 'react'
import { Box } from '@material-ui/core'
import { NoMarginTooltip } from '../component-style'
import './styles.scss'

const block = ({ text, id }) => {
  return (
    <>
      <Box>
        <NoMarginTooltip title={text} aria-label={text} placement="top-start">
          <input
            readonly
            style={{ textAlign: 'center', caretColor: 'transparent', cursor: 'context-menu' }}
            value={text}
            className="section-title-field"
          />
        </NoMarginTooltip>
      </Box>
    </>
  )
}

export default block
