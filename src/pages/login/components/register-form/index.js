import React from 'react'
import { 
    Button,
    TextField,
    Grid,  
    makeStyles,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(5,5,5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '70%', 
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(2, 15, 2),
  },
}));

const RegForm = () => {
  const classes = useStyles();

  return (
    <div className={classes.paper}>
      <form className={classes.form} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="repeat-password"
              label="Repeat Password"
              type="password"
              id="password"
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign Up
        </Button>
      </form>
    </div>    
  )
}

export default RegForm