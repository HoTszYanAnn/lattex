import React from "react";
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Avatar,
  Menu,
  MenuItem,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import { Link, withRouter } from "react-router-dom";
import { APP_PATHS } from "../../../config";
import { connect } from "react-redux";
import { withApollo } from "react-apollo";
import { logout } from "../../../store/actions/";
import LoginButton from './components/login-button'

const useStyles = makeStyles((theme) => ({
  header: {
    height: '56px',
  }
}));

const HeaderMenu = ({ USER_PROFILE, client, dispatch }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogoutClick = async () => {
    localStorage.removeItem("lattex-token");
    await client.stop();
    await client.clearStore();
    dispatch(logout());
  };

  return (
    <>
      <Button size="small" 
        onClick={handleMenu} 
        startIcon={<Avatar src={USER_PROFILE.avatarUrl} />}
        >
          {USER_PROFILE.name}
      </Button>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem button onClick={onLogoutClick}>
          <Typography color="inherit">
            logout
          </Typography>
        </MenuItem>
      </Menu>
    </>
  )
}

const Header = ({ AUTHORIZED, USER_PROFILE, client, dispatch }) => {
  const classes = useStyles();

  return (
    <>
      <AppBar position="static" className={classes.header}>
        <Toolbar>
          <Typography variant="h5">LätTeX</Typography>
          <Box flexGrow={1} />
          {AUTHORIZED
            ? <HeaderMenu USER_PROFILE={USER_PROFILE} client={client} dispatch={dispatch}/>
            : <LoginButton />
          }
        </Toolbar>
      </AppBar>
    </>
  );
};

export default connect(({ AUTHORIZED, USER_PROFILE }) => ({
  AUTHORIZED,
  USER_PROFILE,
}))(withApollo(withRouter(Header)));
