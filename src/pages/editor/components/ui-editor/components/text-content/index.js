import React, { PropTypes, useState } from 'react'
import 'braft-editor/dist/index.css'
import BraftEditor from 'braft-editor'
import {
  Box
} from '@material-ui/core'

const TextContent = ({text}) => {
  const [value, setValue] = useState(BraftEditor.createEditorState(`<p>${text}</p>`))
  const excludeControls = ['headings', 'emoji','media','hr','blockquote', 'separator', 'letter-spacing']

  return (
    <Box>
      <BraftEditor style={{height: 200, overflow: 'auto', backgroundColor: 'white'}} 
        value={value} onChange={setValue} excludeControls={excludeControls} language='en'
        contentStyle={{ height: 210, boxShadow: 'inset 0 1px 3px rgba(0,0,0,.1)' }} />
    </Box>
  );
}

export default TextContent