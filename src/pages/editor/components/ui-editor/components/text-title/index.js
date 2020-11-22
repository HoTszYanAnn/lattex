import React, {useState}from 'react'
import { 
  TextField,
} from '@material-ui/core'
 
const TextTitle = ({info, text}) => {
  const [value, setValue] = useState(text)
  return(
    <TextField
        id="standard-input" 
        label={info.name}
        fullWidth
        style={{
          marginLeft: info.left,
          marginTop: info.top,
          marginBottom: info.bottom,
        }}
        inputProps={{
          style: {
              fontSize: info.size,
              fontFamily: info.family,
              fontWeight: info.weight,
          },
          value: value,
          onChange: (e) => setValue(e.target.value)                   
        }}
    />
  )
}

export default TextTitle