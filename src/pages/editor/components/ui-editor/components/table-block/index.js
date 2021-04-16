import React, { useEffect, useRef, useState} from 'react'
import {
  Box
} from '@material-ui/core'
import SunEditor from 'suneditor-react'
import 'suneditor/dist/css/suneditor.min.css'

const TableBlock = ({ id, text, setText}) => {
  const [value, setValue] = useState(text)
  const onChange = (val) => {
    console.log(val)
    setValue(val)
  }
  const onBlur = (val) => {
    console.log("blur")
    console.log(val.target.innerHTML)
    setText(id, val.target.innerHTML)
  }
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
        height = 'auto'
        setContents={value}
        onChange={onChange}
        language='en'
        className='editor'
        //placeholder="Write Here..."
        onBlur={onBlur}
        setOptions={{
          mode:"balloon-always",
          buttonList: [['undo','redo']],
          placeholder: "Please Insert Table..."
        }}
      />
    </Box>
  );
}

export default TableBlock