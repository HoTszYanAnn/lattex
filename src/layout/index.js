import React from "react";
import clsx from "clsx";
import { Container, Box, useTheme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Footer, Header, RedirectButton, HomeHeader, HomeFooter } from "./components";


const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(0),
    height: "90vh",
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

export const noPaddingLayout = ({ children }) => (
  <MainLayout layoutMaxWidth={false} layoutPaddingTop={false} layoutPaddingBottom={false} noPaddingX={true}>{children}</MainLayout>
);

export const HomeLayout = ({
  children,
  layoutComponent = Box,
  layoutMaxWidth = "lg",
  layoutPaddingTop = true,
  layoutPaddingBottom = true,
  noPaddingX = false,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <>
      <Box style={{ width: 'calc(100vw - 100px - 16px)', padding: '0 50px'}}>
        <HomeHeader />
        <RedirectButton />
        <Box style={{ width: '50px', height: '100vh', left: 0, position: 'fixed', backgroundColor: theme.palette.primary.opposite, zIndex: 500}} />
        {children}
        <Box style={{ width: '50px', height: '100vh', right: 16, position: 'fixed', backgroundColor: theme.palette.primary.opposite, zIndex: 999}} />
        <HomeFooter />
      </Box>
    </>
  )
}