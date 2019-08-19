import React, { PureComponent } from 'react';
import { Provider, connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader/root';
import Routes from './routes';

class App extends PureComponent {
  static propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </Provider>
    );
  }
}

const mapStateToProps = state => ({
  state,
});

const mapDispatchToProps = () => ({});

export default hot(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
