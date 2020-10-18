import React, { useState } from 'react'
import {
  FormControlLabel,
  FormControl,
  Button,
  Box,
  Grid,
  IconButton,
  Tooltip,
  Dialog,
  TextField,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
  DialogTitle,
  Typography
} from '@material-ui/core'
import DateFnsUtils from '@date-io/date-fns';
import { format } from 'date-fns'
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import SettingsIcon from '@material-ui/icons/Settings';
import SaveIcon from '@material-ui/icons/Save';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { difference } from '../../../../../../function'

// change document type, title, have content, etc... 
// (edit the latexcode before /begin)
const classList = ['article', 'report', 'book']
const titleList = ['title', 'date', 'author']
const commentBoolLineList = ['haveTitle', 'haveContentPage']
const wording = {
  'haveTitle': 'maketitle',
  'haveContentPage': 'tableofcontents'
}

const Setting = ({ packedLatexCode, setPackedLatexCode }) => {
  const defaultSetting = () => {
    const documentType = classList.find((val) => packedLatexCode.documentType.includes(val))
    const split = packedLatexCode.titles.split('\n')
    const titles = titleList.reduce((map, key) => {
      return {
        ...map,
        [key]: split.find((val) => val.includes(key))?.replace(`\\${key}{`, '').slice(0, -1) || null
      }
    }, {})

    const commentBoolLine = commentBoolLineList.reduce((map, key) => {
      return {
        ...map,
        [key]: !packedLatexCode[key].includes('%')
      }
    }, {})

    return {
      titles,
      documentType,
      ...commentBoolLine
    }
  }

  const [open, setOpen] = useState(false)
  const origSetting = defaultSetting()
  const [setting, setSetting] = useState(defaultSetting())

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

  const saveCode = () => {
    const diff = difference(setting, origSetting)
    for (const key in diff) {
      if (commentBoolLineList.includes(key)) {
        diff[key] = `${diff[key] ? '' : '%'}\\${wording[key]}\n`
      } else if (key === "documentType") {
        diff[key] = `\\document{${diff[key]}}\n`
      } else if (key === "titles") {
        diff[key] = titleList.reduce((map, deepkey) => {
          return map = map + `\\${deepkey}{${diff.titles[deepkey] || ''}}\n`
        }, '') 
      }
    }

    const newCode = {
      ...packedLatexCode,
      ...diff
    }
    setPackedLatexCode(newCode)
    setOpen(false)
  }

  return (
    <>
      <Tooltip title='Setting' aria-label='Setting' placement="top">
        <IconButton
          onClick={() => {
            setSetting(defaultSetting)
            handleChange(true)
          }}
        >
          <SettingsIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        onClose={() => handleChange(false)}
        open={open}
        fullWidth
        maxWidth='lg'
        disableBackdropClick={true}
        disableEscapeKeyDown={true}
      >
        <Box display='flex'>
          <Tooltip title="Back" placement="top">
            <IconButton
              onClick={() => {
                handleChange(false)
                setSetting(origSetting)
              }}>
              <ArrowBackIcon />
            </IconButton>
          </Tooltip>
          <Box flexGrow={1} />
          <Tooltip title="Save" placement="top">
            <IconButton onClick={saveCode}>
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
                  value={setting.documentType}
                  onChange={(e) =>
                    onSettingChange('documentType', e.target.value)
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
            <Grid item xs={9}>
              <TextField
                label="date"
                fullWidth
                disabled={setting.titles.date === '\\today'}
                value={setting.titles.date}
                onChange={(e) => onSettingChange('date', e.target.value)}
              />
            </Grid>
            <Grid item xs={3}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={setting.titles.date === '\\today'}
                    onChange={(e) => onSettingChange('date', e.target.checked ? '\\today' : null)
                    }
                  />
                }
                label="Always 'Today'"
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={setting.haveTitle}
                    onChange={(e) => {
                      onSettingChange('haveTitle', e.target.checked)
                    }
                    }
                  />
                }
                label="Have title?"
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={setting.haveContentPage}
                    onChange={(e) => onSettingChange('haveContentPage', e.target.checked)
                    }
                  />
                }
                label="Have Content Page?"
              />
            </Grid>
          </Grid>
        </Box>
      </Dialog>
    </>
  )
}

export default Setting