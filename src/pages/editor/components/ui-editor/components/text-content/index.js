import React, { PropTypes, useState } from 'react'
import 'braft-editor/dist/index.css'
import BraftEditor from 'braft-editor'
import {
  Box
} from '@material-ui/core'

const TextContent = ({ id, text, setText }) => {

  const onChange = (val) => {
    setValue(val)
  }
  const onBlur = () => {
    setText(id, value.toHTML())
  }
  const [value, setValue] = useState(BraftEditor.createEditorState(text))
  const controls = [
    'undo', 'redo', 'remove-styles', 'clear', 
    'bold', 'italic', 'underline', 
    'superscript', 'subscript',
    'list-ul', 'list-ol', 'blockquote', 'code',
    'link',  'hr', 
    // 'separator', 'font-family','font-size', 'line-height', 'text-color', 
    // 'strike-through',  
    // 'text-indent', 'text-align',
    //'media', 
    
]
  const fontSize = []
  const lineHeights = []
  const fontFamilies = [
    {
        name: 'Araial',
        family: 'Arial, Helvetica, sans-serif'
    }, {
        name: 'Georgia',
        family: 'Georgia, serif'
    },  {
        name: 'Monospace',
        family: '"Courier New", Courier, monospace'
    },
]
  return (
    <Box>
      <BraftEditor
        value={value}
        onChange={onChange}
        //fontSizes={fontSize}
        //lineHeight={lineHeights}
        //fontFamilies={fontFamilies}
        controls={controls}
        language='en'
        className='editor'
        placeholder="Write Here..."
        onBlur={onBlur}
      />
    </Box>
  );
}

export default TextContent