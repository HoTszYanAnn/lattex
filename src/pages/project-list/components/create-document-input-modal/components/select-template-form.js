import React from 'react'
import { Grid } from '@material-ui/core'
import TemplateList from './template-list'
import TemplateChoosed from './template-choosed'

const SelectTemplateForm = ({ template, setTemplate }) => {
  return (
    <>
      <Grid container style={{ height: '60vh' }}>
        <Grid xs={3}>
          <TemplateList template={template} setTemplate={setTemplate} />
        </Grid>
        <Grid xs={9}>
          <TemplateChoosed template={template} key={template.key}/>
        </Grid>
      </Grid>
    </>
  )
}

export default SelectTemplateForm