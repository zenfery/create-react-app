import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// Store
const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

class AuthRoute extends React.Component {
  render() {
    const component = this.props.component;
    const user = this.props.user;
    if (user && user.id) {
      return <Route {...this.props} />;
    } else {
      return (
        <Redirect
          to={{
            pathname: '/login',
          }}
        />
      );
    }
  }
}

export default connect(mapStateToProps)(AuthRoute);
