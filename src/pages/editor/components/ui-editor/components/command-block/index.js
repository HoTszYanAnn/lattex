import React from 'react'
import { Box, Divider } from '@material-ui/core'

const DefaultBlock = ({ text, label }) => (
  <>
    <Box className="command-block-label">{label ? label : text}</Box>
    <input
      readonly
      style={{ textAlign: 'center', caretColor: 'transparent', cursor: 'context-menu' }}
      value={text}
      className="section-title-field"
    />
  </>
)

const DividerBlock = () => (
  <>
    <Divider style={{ position: 'absolute', top: '50%', width: 'calc(100% - 15px - 15px)', left: '15px' }} />
    <DefaultBlock text="" label="Divider Block" />
  </>
)

const EndBlock = () => (
  <>
    <Divider style={{ position: 'absolute', top: '50%', width: 'calc(100% - 15px - 15px)', left: '15px', light: true, vairant: 'middle'}} />
    <DefaultBlock text="" label="End Block" />
  </>
)

const textblock = {
  'maketitle': 'Title Block',
  'tableofcontents': 'Table of Contents Block',
  'newpage': 'New Page Block',
}

const block = ({ text, id }) => {
  return (
    <>
      <Box className="command-block">
        {textblock[text]
          ? <DefaultBlock text={textblock[text].substring(0, textblock[text].length - 6)} label={textblock[text]} />
          : text === 'hrule'
            ? <DividerBlock />
            : text === 'end'
              ? <EndBlock />
              : <DefaultBlock text={text} />
        }
      </Box>
    </>
  )
}

export default block
