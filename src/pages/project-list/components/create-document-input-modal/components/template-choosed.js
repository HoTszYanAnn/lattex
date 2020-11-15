import React from 'react'
import { Box, Typography } from '@material-ui/core'

const TemplateChoosed = ({ template }) => {
  return (
    <>
      <Typography variant="h5" align="center" gutterBottom>Template: {template.name}</Typography>
      <Box style={{ width: '100%', height: '85%', backgroundColor: 'rgb(82, 86, 89)' }}>
        <iframe
          src={`${template.pdf}`}
          style={{ width: '100%', height: '100%', border: 'none' }}
        />
      </Box>
      <Box style={{ height: '15%' }}>
        <Typography variant="h6">Description: </Typography>
        <Typography variant="body1">{template.description}</Typography>
      </Box>
    </>
  )
}

export default TemplateChoosed