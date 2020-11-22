import React from 'react'
import {
  Box,
  Link as MuiLink,
  Typography,
  makeStyles,
  useTheme,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  footer: {
    height: '50px',
    width: 'calc(100vw - 100px)',
    backgroundColor: '#ffffff',
    position: 'fixed',
    bottom: '0px',
    zIndex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

const Footer = () => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Box display="flex" className={classes.footer} style={{ background: theme.palette.primary.opposite }}>
      2020/2021 CUHK CSE FYP MHW2003
    </Box>
  )
}

export default Footer