import React, { PropTypes, useState } from 'react'
import RichTextEditor from 'react-rte';
import {
  Box
} from '@material-ui/core'

const TextContent = ({ id, text, setText }) => {
  const toolbarConfig = {
    display: ['INLINE_STYLE_BUTTONS', 'BLOCK_ALIGNMENT_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'BLOCK_TYPE_DROPDOWN', 'LINK_BUTTONS', 'HISTORY_BUTTONS'],
    INLINE_STYLE_BUTTONS: [
      {label: 'Bold', style: 'BOLD'},
      {label: 'Italic', style: 'ITALIC'},
      {label: 'Underline', style: 'UNDERLINE'},
      {label: 'Strikethrough', style: 'STRIKETHROUGH'}
    ],
    BLOCK_ALIGNMENT_BUTTONS: [
      {label: 'Align Left', style: 'ALIGN_LEFT'},
      {label: 'Align Center', style: 'ALIGN_CENTER'},
      {label: 'Align Right', style: 'ALIGN_RIGHT'},
    ], 
    BLOCK_TYPE_BUTTONS: [
      {label: 'UL', style: 'unordered-list-item'},
      {label: 'OL', style: 'ordered-list-item'}
    ],
    BLOCK_TYPE_DROPDOWN: [
      {label: 'normal', style: 'unstyled'},
      {label: 'Huge', style: 'header-one'},
      {label: 'huge', style: 'header-two'},
      {label: 'Large', style: 'header-three'},
      {label: 'large', style: 'header-four'},
      {label: 'small', style: 'header-five'},
      {label: 'foot note', style: 'header-six'},
      {label: 'code', style: 'code-block'},
    ],
  }

  const [value, setValue] = useState(RichTextEditor.createValueFromString(text, 'html'))
  

  const onChange = (val) => {
    setValue(val)
    setText(id, val)
  }
  return (
    <Box>
      <RichTextEditor
        toolbarConfig={toolbarConfig}
        value={value}
        onChange={onChange}
      />
    </Box>
  )
}

export default TextContent