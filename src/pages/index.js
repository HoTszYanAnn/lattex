import React from 'react'
import { AppBar } from '@material-ui/core'
import Router from '../Router'
import ReactNotification from "react-notifications-component";
import { connect } from "react-redux";

import "react-notifications-component/dist/theme.css";

const Layout = ({ dispatch, TOKEN, ERROR }) => {
  return (
    <>
      <ReactNotification />
      <Router key={TOKEN} />
    </>
  )
}

const mapStateToProps = ({ ERROR, TOKEN }) => ({ ERROR, TOKEN });

export default connect(mapStateToProps)(Layout);