import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Content from 'js/containers/Content';
import {Header} from 'js/components/Header';
import SubHeader from 'js/components/SubHeader';
import Footer from 'js/components/Footer';

class App extends PureComponent {
  renderSubHeader(subHeaderMenuLeft, subHeaderMenuRight) {
    if (!SubHeader) return null;

    return <SubHeader subHeaderMenuLeft={subHeaderMenuLeft} subHeaderMenuRight={subHeaderMenuRight}/>;
  }

  renderHeader() {
    return this.props.ui.showHeader ? <Header/> : null;
  }

  render() {
    const {ui} = this.props;

    return (
      <div>
        {this.renderHeader()}
        {this.renderSubHeader(ui.subHeaderLeftComponent, ui.subHeaderRightComponent)}
        <Content {...this.props}/>
        <Footer/>
      </div>
    );
  }
}

App.propTypes = {
  ui: PropTypes.object
};

const mapStateToProps = state => ({
  ui: state.ui
});

export default connect(mapStateToProps)(App);