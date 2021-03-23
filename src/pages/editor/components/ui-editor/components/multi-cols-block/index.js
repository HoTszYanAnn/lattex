import React from 'react'
import ContentBlock from '../content-block'
import { Box } from '@material-ui/core'

const MultiColsBlock = ({ id, text, setText, code, setCode }) => {
  const num = parseInt(code.split('-')[1])

  return (
    <>
      <Box className="command-block">
        <Box className="command-block-label">Mutiple Columns - {num}</Box>
        <ContentBlock key={id + 'content'} text={text} setText={setText} id={id} multiCols={true} colsNum={num} setCode={setCode} />
      </Box>
    </>
  )
}

export default MultiColsBlock

