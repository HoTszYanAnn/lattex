import React from 'react'
import { Box, Typography, Grid } from '@material-ui/core'

const TemplateChoosed = ({ template }) => {
  return (
    <>
        <Grid container style={{ height: '70vh' }}>
        <Grid xs={9}>
          <Box style={{ width: '100%', height: '85%', backgroundColor: 'rgb(82, 86, 89)' }}>
            <iframe
              src={`${template.pdf}`}
              style={{ width: '100%', height: '100%', border: 'none' }}
            />
          </Box>
        </Grid>
        <Grid xs={2} align="center">
          <Typography variant="h5" gutterBottom>Template: {template.name}</Typography>
          <Box style={{ height: '15%', width: "80%"}}>
            <Typography variant="h6">Description: </Typography>
            <Typography variant="body1">{template.description}</Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default TemplateChoosed