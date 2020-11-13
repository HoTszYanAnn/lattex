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

const DocumentInformationForm = ({ docInfo, setDocInfo }) => {
  const onChange = (key, val) => {
    setDocInfo({ ...docInfo, [key]: val })
  }

  return (
    <>
      <Grid container justify="center">
        <Grid item container justify="center" style={{ width: '60%' }} spacing={4}>
          <Grid item xs={12}>
            <TextField
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
          <Grid item xs={12}>
            <FormControl>
              <FormLabel component="legend">Visibility</FormLabel>
              <RadioGroup value={docInfo.visibility} onChange={(e) => onChange('visibility', e.target.value)} row>
                <FormControlLabel value="PUBLIC" control={<Radio />} label="PUBLIC" />
                <FormControlLabel value="PRIVATE" control={<Radio />} label="PRIVATE" />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default DocumentInformationForm