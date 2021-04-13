import React, { useEffect, useRef, useState} from 'react'
import {
  Box
} from '@material-ui/core'
import SunEditor from 'suneditor-react'
import 'suneditor/dist/css/suneditor.min.css'

const TableBlock = ({ id, text, setText}) => {
  const ref1 = useRef(text);
  useEffect(() => {
      // Get underlining core object here
      // Notice that useEffect is been used because you have to make sure the editor is rendered.
      console.log(ref1)
  }, []);
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
        height = 'auto'
        setContents={value}
        onChange={onChange}
        ref={ref1}
        language='en'
        className='editor'
        //placeholder="Write Here..."
        onBlur={onBlur}
        setOptions={{
          mode:"balloon-always",
          buttonList: [['undo','redo','table']]
        }}
      />
    </Box>
  );
}

export default TableBlock