import React, { useRef, useState} from 'react'
import {
  Box
} from '@material-ui/core'
import SunEditor from 'suneditor-react'
import 'suneditor/dist/css/suneditor.min.css'

const TableBlock = ({ id, text, setText}) => {
  const onChange = (val) => {
    console.log(val)
    setValue(val)
  }
  const onBlur = () => {
    setText(id, value)
  }
  const [value, setValue] = useState(text)
  const buttonList = [[
    'undo',
    'redo',
    'blockquote',
    /** Submenu */
    'align',
    'font',
    'fontColor',
    'fontSize',
    'formatBlock',
    'hiliteColor',
    'horizontalRule',
    'lineHeight',
    'list',
    'paragraphStyle',
    'table',
    'template',
    'textStyle',
    /** Dialog */
    'image',
    'link',
    'video',
    'audio',
  ]]
  return (
    <Box>
      <SunEditor
        setContents={value}
        onChange={onChange}
        language='en'
        className='editor'
        placeholder="Write Here..."
        onBlur={onBlur}
        setOptions={{
          mode:"inline",
          resizingBar: true,
          showPathLabel: false,
          buttonList: [['undo','redo','table']]
        }}
      />
    </Box>
  );
}

export default TableBlock