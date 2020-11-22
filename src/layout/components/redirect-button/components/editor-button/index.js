import React from 'react';
import {
  Button,
  makeStyles,
  Box,
} from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import EditIcon from '@material-ui/icons/Edit';
import { useHistory } from 'react-router';
import { APP_ROUTES } from '../../../../../config'

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: '#000000',
    color: 'white',
    display: 'grid',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem 0'
  },
  grid:{
    display: 'grid',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    writingMode: 'vertical-rl',
    textOrientation: 'sideways',
    transform: 'rotate(180deg)',
  }
}));

const EditorButton = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Button
      variant="contained"
      className={classes.button}
      onClick={() => history.push(APP_ROUTES.EDITORS)}
    >
      <span className={classes.text}> Goto Editor</span>
      <Box mb={1} />
      <span className={classes.grid}><EditIcon fontSize="small" style={{ transform:'rotate(-90deg)'}} /></span>
    </Button>
  );
}


export default EditorButton