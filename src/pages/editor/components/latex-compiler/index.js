import React, { useState } from 'react'
import { Box } from '@material-ui/core'


const LatexCompiler = ({ doc }) => {
  return (
    <>
      <Box style={{ width: '100%', height: '100%', backgroundColor: 'white' }}>
        <iframe
          srcDoc={'<!DOCTYPE html>' + doc?.documentElement.outerHTML}
          style={{ width: '100%', height: '100%', border: 'none', overflow: 'scroll' }}
        />
      </Box>
    </>
  )
}

export default LatexCompiler