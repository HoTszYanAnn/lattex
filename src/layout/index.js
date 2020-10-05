import React from "react";
import clsx from "clsx";
import { Container, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Footer, Header, InternalHeader } from "./components";


const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    // marginTop: theme.spacing(20),
    marginBottom: theme.spacing(3),
    minHeight: "60vh",
  },
  paddingTop: {
    paddingTop: theme.spacing(2),
  },
  paddingBottom: {
    paddingBottom: theme.spacing(2),
  },
  noPaddingX: {
    // <Container> has default padding
    paddingLeft: 0,
    paddingRight: 0,
  },
}));

export const MainLayout = ({
  children,
  layoutComponent = Box,
  layoutMaxWidth = "lg",
  layoutPaddingTop = true,
  layoutPaddingBottom = true,
  noPaddingX = false,
}) => {
  const classes = useStyles();

  return (
    <>
      <Header />
      <Container
        component={layoutComponent}
        maxWidth={layoutMaxWidth}
        className={clsx({
          [classes.root]: true,
          [classes.paddingTop]: layoutPaddingTop,
          [classes.paddingBottom]: layoutPaddingBottom,
          [classes.noPaddingX]: noPaddingX,
        })}
      >
        {children}
      </Container>
      <Footer />
    </>
  )
}