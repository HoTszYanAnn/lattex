import React from 'react'
import {
  TextField,
  Grid,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  FormControlLabel
} from '@material-ui/core'

const DocumentInformationForm = ({ docInfo, setDocInfo, filename }) => {
  const onChange = (key, val) => {
    setDocInfo({ ...docInfo, [key]: val })
  }

  return (
    <>
      <Grid container justify="center">
        <Grid item container justify="center" style={{ width: '60%' }} spacing={4}>
          <Grid item xs={12}>
            <TextField
              error={filename.includes(docInfo.name) || !docInfo.name || docInfo.name.includes(' ')}
              helperText={filename.includes(docInfo.name) ? 'Repeated' : !docInfo.name ? 'cannot be empty' : docInfo.name.includes(' ') ? 'cannot include space or special character' : ''}
              fullWidth
              value={docInfo.name}
              onChange={(e) => onChange('name', e.target.value)}
              label="Name"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              value={docInfo.description}
              onChange={(e) => onChange('description', e.target.value)}
              label="Description"
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default DocumentInformationForm