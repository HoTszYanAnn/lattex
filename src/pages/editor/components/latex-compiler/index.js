import React, { useState } from 'react'
import { Box } from '@material-ui/core'


const LatexCompiler = ({ doc, key }) => {
  return (
    <>
      <Box style={{ width: '100%', height: '100%', backgroundColor: 'white'}}>
        <iframe
          //srcDoc={'<!DOCTYPE html>' + doc?.documentElement.outerHTML}
          src={`${process.env.REACT_APP_COMPILER_URL}/compile?git=https://github.com/HoTszYanAnn/latex&target=latex.tex&force=true`}
          style={{ width: '100%', height: '100%', border: 'none' }}
        />
      </Box>
    </>
  )
}

export default LatexCompiler