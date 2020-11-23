import React, { PropTypes, useState } from 'react'
import RichTextEditor from 'react-rte';
import {
  Box
} from '@material-ui/core'

const TextContent = ({ id, text, setText }) => {
  const [value, setValue] = useState(RichTextEditor.createValueFromString(text, 'html'))
  const excludeControls = ['headings', 'emoji', 'media', 'hr', 'blockquote', 'separator', 'letter-spacing']

  const onChange = (val) => {
    setValue(val)
    setText(id, val)
  }
  return (
    <Box>
      <RichTextEditor
        value={value}
        onChange={onChange}
      />
    </Box>
  )
}

export default TextContent