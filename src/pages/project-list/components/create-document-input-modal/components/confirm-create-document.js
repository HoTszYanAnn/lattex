import React from 'react'
import {
  Grid,
  Typography,
  Box
} from '@material-ui/core'

const ConfirmCreateDocument = ({ docInfo, template }) => {
  return (
    <>
      <Grid container style={{ height: '60vh' }} alignItems="center" alignContent="center">
        <Grid item xs={6} container justify="center">
          <Grid item style={{ maxWidth: "400px", width: '50%' }}>
            <Typography variant="h5" align="center" gutterBottom> Document Information </Typography>
            <Typography >Name:</Typography>
            <Typography align="right" >{docInfo.name}</Typography>
            <Typography >Description:</Typography>
            <Typography align="right" >{docInfo.decription ? docInfo.description : 'N/A'}</Typography>
            <Typography >Visibility:</Typography>
            <Typography align="right" >{docInfo.visibility}</Typography>
          </Grid>
        </Grid>
        <Grid item xs={6} style={{ height: '60vh' }}>
          <Typography variant="h5" align="center" gutterBottom>Chosen Template: {template.name}</Typography>
          <Box style={{ width: '100%', height: '90%', backgroundColor: 'rgb(82, 86, 89)' }}>
            <iframe
              src={`${template.pdf}`}
              style={{ width: '100%', height: '100%', border: 'none' }}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default ConfirmCreateDocument