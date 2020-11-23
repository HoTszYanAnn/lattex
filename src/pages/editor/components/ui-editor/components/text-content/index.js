import React, { PropTypes, useState } from 'react'
import 'braft-editor/dist/index.css'
import BraftEditor from 'braft-editor'
import {
  Box
} from '@material-ui/core'

const TextContent = ({ id, text, setText }) => {

 const onChange = (val) => {
  setValue(val)
  setText(id, val)
}
  const [value, setValue] = useState(BraftEditor.createEditorState(`<p>${text}</p>`))
  const excludeControls = ['headings', 'emoji','hr','blockquote', 'separator', 'letter-spacing']
  const fontSize = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 19, 23, 27, 33]
  const lineHeights = [1, 1.2, 1.5, 1.75, 2]
  return (
    <Box>
      <BraftEditor style={{height: 200, overflow: 'auto', backgroundColor: 'white'}} 
        value={value} 
        onChange={onChange} 
        fontSizes={fontSize}
        lineHeight={lineHeights}
        excludeControls={excludeControls} 
        language='en'
        contentStyle={{ height: 50, boxShadow: 'inset 0 1px 3px rgba(0,0,0,.1)' }} 
        />
    </Box>
  );
}

export default TextContent