import React from 'react'
import {
  Box,
  Link as MuiLink,
  Typography,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  box: {
    backgroundColor: theme.palette.primary.main,
  },
}));

const Nav = () => {
  const classes = useStyles();

  return (
    <>
      add new doc<br/>
      import exist latex( later support)<br/>
      <hr/>
      template<br/>
        all<br/>
        bookmarked<br/>
    </>
  )
}

export default Nav