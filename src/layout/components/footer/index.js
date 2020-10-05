import React from 'react'
import {
  Box,
  Container,
  Link as MuiLink,
  Typography,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  section: {
    "&:not(:last-child)": {
      marginBottom: theme.spacing(2),
    },
    textAlign: "center",
  },
  footer: {
    height: '5vh',
    backgroundColor: "red"
  }
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container>
        <Box className={classes.section}>
          2020/2021 FYP
        </Box>
      </Container>
    </footer>
  )
}

export default Footer