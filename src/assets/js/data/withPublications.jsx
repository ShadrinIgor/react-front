import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import * as _publicationsActions from 'js/actions/publications';
import {withCoursesInfo} from 'js/data';

const mapDispatchToProps = dispatch => ({
  publicationsActions: bindActionCreators(_publicationsActions, dispatch)
});

const mapStateToProps = state => ({
  publications: state.publications.publications
});

const withPublications = (WrappedComponent) => {
  @withCoursesInfo
  @connect(mapStateToProps, mapDispatchToProps)
  @withRouter
  class DataComponent extends PureComponent {
    componentWillMount = () => {
      const {publicationsActions: {getPublications}, location} = this.props;

      getPublications((location.state || {}).filter);
    };

    render = () => <WrappedComponent {...this.props} />;
  }

  DataComponent.propTypes = {
    location: PropTypes.object,
    publications: PropTypes.object,
    publicationsActions: PropTypes.object
  };

  return DataComponent;
};

export default withPublications;