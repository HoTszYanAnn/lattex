import React from "react";
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  IconButton,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import { APP_PATHS } from "../../../config";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  header: {
    height: '5vh'
  }
}));

const Header = ({ AUTHORIZED, USER_PROFILE }) => {
  const classes = useStyles();

  return (
    <>
      <AppBar position="static" className={classes.header}> 
        <Toolbar>
            <Typography>Lattex</Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default connect(({ AUTHORIZED, USER_PROFILE }) => ({
  AUTHORIZED,
  USER_PROFILE,
}))(withRouter(Header));
