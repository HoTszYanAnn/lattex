import React from 'react'
import { 
  Box,
  TextField,
 } from '@material-ui/core'
 import dict from '../../dict.json'

 
function TextBox(props) {
  const info = props.info;
  return(
    <TextField
        id="standard-input" 
        label={info.name}
        fullWidth
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

const UIEditor = (textbox) => {
  console.log(dict['section']);
  return (
    <Box>
      <TextBox info={dict['section']}/>
    </Box>
  )
}

export default UIEditor