import React from 'react'
import { withRouter } from 'react-router-dom';
const { APP_ROUTES } = require("../../config");

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    this.props.history.push(APP_ROUTES.NOT_FOUND);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      {this.props.history.push(APP_ROUTES.NOT_FOUND);}
    }

    return this.props.children; 
  }
}

export default withRouter(ErrorBoundary);