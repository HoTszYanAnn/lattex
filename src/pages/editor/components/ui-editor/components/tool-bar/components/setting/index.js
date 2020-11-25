import React, { useState } from 'react'
import {
  FormControlLabel,
  FormControl,
  Box,
  Grid,
  IconButton,
  Tooltip,
  TextField,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
  Typography,
} from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save';
import { difference } from '../../../../../../../../function'
import _ from 'lodash'

// change document type, title, have content, etc... 
// (edit the latexcode before /begin)
const classList = ['article', 'report']
const titleList = ['title', 'date', 'author', 'always_today']
const commentBoolLineList = ['haveTitle', 'haveContentPage']

const Setting = ({ doc, pushAndCompile }) => {
  const [open, setOpen] = useState(false)
  const origSetting = _(doc.latex).pick(['haveTitle', 'haveContentPage', 'titles', 'documentclass']).value()

  const [setting, setSetting] = useState(origSetting)

  const onSettingChange = (key, val) => {
    if (titleList.includes(key)) {
      let titles = {
        ...setting.titles,
        [key]: val
      }
      setSetting({ ...setting, titles })
    } else {
      setSetting({ ...setting, [key]: val })
    }
  }

  const handleChange = (val) => {
    setOpen(val)
  }

  const onSave = () => {
    const diff = difference(setting, origSetting)

    pushAndCompile(diff)
    setOpen(false)
  }

  return (
    <>
      <Box display='flex' style={{ width: '30vw' }}>
        <Box flexGrow={1} />
        <Tooltip title="Save" placement="top">
          <IconButton onClick={onSave}>
            <SaveIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Typography variant="h5" align="center">Setting</Typography>
      <Box style={{ height: '50vh', padding: '2rem 5rem' }}>
        <Grid container spacing={4} alignItems="flex-end">
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel >Document Type</InputLabel>
              <Select
                value={setting.documentclass}
                onChange={(e) =>
                  onSettingChange('documentclass', e.target.value)
                }
              >
                {classList.map((val) =>
                  <MenuItem value={val} key={val}>{val}</MenuItem>
                )}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="title"
              fullWidth
              value={setting.titles.title}
              required
              onChange={(e) => onSettingChange('title', e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="author"
              fullWidth
              value={setting.titles.author}
              onChange={(e) => onSettingChange('author', e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="date"
              fullWidth
              disabled={setting.titles.always_today}
              value={setting.titles.date}
              onChange={(e) => onSettingChange('date', e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={setting.titles.always_today}
                  onChange={(e) => onSettingChange('always_today', e.target.checked)
                  }
                />
              }
              label="Always 'Today'"
            />
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default Setting