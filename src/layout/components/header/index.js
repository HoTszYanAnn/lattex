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
  useTheme
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import { Link, withRouter } from "react-router-dom";
import { APP_PATHS } from "../../../config";
import { connect } from "react-redux";
import { withApollo } from "react-apollo";
import { logout } from "../../../store/actions/";
import lattexSvg from '../../../assets/logo/lattex-header-logo-orange.svg'

const useStyles = makeStyles((theme) => ({
  header: {
    height: '50px',
    width: '100%',
    position: 'fixed',
    top: 0,
    boxShadow: '0 2px 5px 0 rgba(184,134,11,.3)',
    zIndex: 9999
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
  const theme = useTheme();

  return (
    <>
      <Box className={classes.header} style={{ background: theme.palette.primary.opposite }}>
        <Box display="flex" style={{ padding: '0 30px', height: '100%', alignItems: 'center'}}>
          <Link to={APP_PATHS.EDITORS} style={{ height: "70%" }}><img src={lattexSvg} height="100%" /></Link>
          <Box flexGrow={1} />
          {AUTHORIZED
            ? <HeaderMenu USER_PROFILE={USER_PROFILE} client={client} dispatch={dispatch} />
            : <></> //not possible
          }
        </Box>
      </Box>
    </>
  );
};

export default connect(({ AUTHORIZED, USER_PROFILE }) => ({
  AUTHORIZED,
  USER_PROFILE,
}))(withApollo(withRouter(Header)));
