import React from 'react'
import { 
  TextField,
} from '@material-ui/core'
 
const TextTitle = ({info}) => {
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
          }
        }}
    />
  )
}

export default TextTitle