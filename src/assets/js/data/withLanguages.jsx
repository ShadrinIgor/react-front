import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as _dictionaryActions from 'js/actions/dictionary';

const mapDispatchToProps = dispatch => ({
  dictionaryActions: bindActionCreators(_dictionaryActions, dispatch)
});

const mapStateToProps = state => ({
  languages: state.dictionary.languages
});

const withLanguages = (WrappedComponent) => {
  @connect(mapStateToProps, mapDispatchToProps)
  class DataComponent extends PureComponent {
    componentWillMount = () => {
      const {dictionaryActions: {getLanguages}} = this.props;
      getLanguages();
    };

    render = () => <WrappedComponent {...this.props} />;
  }

  DataComponent.propTypes = {
    languages: PropTypes.object,
    dictionaryActions: PropTypes.object
  };

  return DataComponent;
};

export default withLanguages;