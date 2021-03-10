import React, { useState} from 'react'
import {
  Box
} from '@material-ui/core'
import DraftJS from "draft-js"
import 'braft-editor/dist/index.css'
import BraftEditor from 'braft-editor'

//listul <ul><li>
//listol <ol><li>
//quote <blockquote>
//code <pre><code>
const ContentBlock = ({ id, text, setText, htmlcode = false }) => {

  const onChange = (val) => {
    console.log(val.toHTML())
    if (!htmlcode || val.toHTML().startsWith(htmlcode.codeStart)) {
      setValue(val)
    } else {
      setValue(DraftJS.EditorState.undo(val))
    }
  }
  const onBlur = () => {
    setText(id, value.toHTML())
  }
  const [value, setValue] = useState(BraftEditor.createEditorState(text))
  const controls = [
    'undo', 'redo',
    'remove-styles', 'clear',
    'bold', 'italic', 'underline',
    'superscript', 'subscript',
    //'list-ul', 'list-ol', 'blockquote', 'code',
    //'link',  'hr', 
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
    }, {
      name: 'Monospace',
      family: '"Courier New", Courier, monospace'
    },
  ]
  return (
    <Box>
      <BraftEditor
        value={value}
        onChange={onChange}
        controls={controls}
        language='en'
        className='editor'
        placeholder={htmlcode ? '' : "Write Here..."}
        onBlur={onBlur}
      />
    </Box>
  );
}

export default ContentBlock