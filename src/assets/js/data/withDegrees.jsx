import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import degreesType from 'js/types';
import * as _dictionaryActions from 'js/actions/dictionary';

const mapDispatchToProps = dispatch => ({
  dictionaryActions: bindActionCreators(_dictionaryActions, dispatch)
});

const mapStateToProps = state => ({
  degrees: state.dictionary.degrees
});

const withDegrees = (WrappedComponent) => {
  @connect(mapStateToProps, mapDispatchToProps)
  class DataComponent extends PureComponent {
    componentWillMount = () => {
      const {dictionaryActions: {getDegrees}} = this.props;
      getDegrees();
    };

    render = () => <WrappedComponent {...this.props} />;
  }

  DataComponent.propTypes = {
    degrees: degreesType,
    dictionaryActions: PropTypes.object
  };

  return DataComponent;
};

export default withDegrees;