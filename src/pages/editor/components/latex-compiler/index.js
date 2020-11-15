import React, { useState } from 'react'
import { Box, Button } from '@material-ui/core'


const LatexCompiler = ({ doc, key }) => {
  return (
    <>
      <Box style={{ width: '100%', height: '100%', backgroundColor: 'rgb(82, 86, 89)'}}>
        <iframe
          //srcDoc={'<!DOCTYPE html>' + doc?.documentElement.outerHTML}
          src={`${process.env.REACT_APP_COMPILER_URL}/compile?git=${doc.url}&target=main.tex${false ? '&force=true': ''}`}
          style={{ width: '100%', height: '100%', border: 'none' }}
        />
      </Box>
    </>
  )
}

export default LatexCompiler