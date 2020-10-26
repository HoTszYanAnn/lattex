import React from "react"
import {Typography, makeStyles} from '@material-ui/core'
import lattex from './lätTex.png';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(15),
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
}));

const Home = () => {
  const classes = useStyles();
  return (
    <div className={classes.paper}>
      <img src={lattex} />
      <Typography variant="h3">An LaTeX Document Processor</Typography>
    </div>
  )
}

export default Home