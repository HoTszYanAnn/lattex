import React, { PropTypes, useState } from 'react'
import 'braft-editor/dist/index.css'
import BraftEditor from 'braft-editor'
import {
  Box
} from '@material-ui/core'
import './styles.scss'

const TextContent = ({ id, text, setText }) => {

  const onChange = (val) => {
    setValue(val)
  }
  const onBlur = () => {
    setText(id, value.toHTML())
  }
  const [value, setValue] = useState(BraftEditor.createEditorState(text))
  const excludeControls = ['headings', 'emoji', 'hr', 'blockquote', 'separator', 'letter-spacing']
  const fontSize = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 19, 23, 27, 33]
  const lineHeights = [1, 1.2, 1.5, 1.75, 2]
  return (
    <Box>
      <BraftEditor
        value={value}
        onChange={onChange}
        fontSizes={fontSize}
        lineHeight={lineHeights}
        excludeControls={excludeControls}
        language='en'
        className='editor'
        placeholder="Write Here..."
        onBlur={onBlur}
      />
    </Box>
  );
}

export default TextContent