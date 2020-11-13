import React, { PropTypes, useState } from 'react'
import RichTextEditor from 'react-rte'
 
const TextContent = () => {
    const [value, setValue] = useState(RichTextEditor.createEmptyValue())
    
    const onValueChange = (value) => {
        setValue(value);
        const markdown = value.toString("markdown");
        console.log(markdown);
    }
  return(
    <RichTextEditor 
        value={value}
        onChange={onValueChange} 
    />
  );
}

export default TextContent