import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Home extends React.Component {
  render() {
    return (
      <div className="home">
        <p className="home__title">
          Home
          <br />
          <br /> {this.props.testData}
        </p>
      </div>
    );
  }
}

const mapStateToProps = ({ home }) => ({
  testData: home.data,
});
const mapDispatchToProps = () => ({});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home)
);
