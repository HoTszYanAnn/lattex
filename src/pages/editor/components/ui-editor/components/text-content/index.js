import React, { PropTypes, useState } from 'react'
import 'braft-editor/dist/index.css'
import BraftEditor from 'braft-editor'
import {
  Box
} from '@material-ui/core'

const TextContent = () => {
  const [value, setValue] = useState(BraftEditor.createEditorState(null))


  return (
    <Box style={{ height: 300, backgroundColor: 'white' }}>
      <BraftEditor value={value} onChange={setValue} language="en"
        contentStyle={{ height: 210, boxShadow: 'inset 0 1px 3px rgba(0,0,0,.1)' }} />
    </Box>
  );
}

export default TextContent