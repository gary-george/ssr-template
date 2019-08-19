import React, { Component } from 'react';
import { connect } from 'react-redux';

class AppWrapper extends Component {
  render() {
    return <div className="wrapper">{this.props.children}</div>;
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppWrapper);
