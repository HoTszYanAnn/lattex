import React from 'react'
import {
  Box,
  Link as MuiLink,
  Typography,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  section: {
    paddingTop: '0.3rem',
    textAlign: "center",
  },
  footer: {
    height: '4vh',
    width: '100%',
    backgroundColor: '#ffe7bd',
    position: 'sticky',
    bottom: '0px'
  }
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Box className={classes.section}>
        2020/2021 CUHK CSE FYP MHW2003
      </Box>
    </footer>
  )
}

export default Footer