import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as _dictionaryActions from 'js/actions/dictionary';

const mapDispatchToProps = dispatch => ({
  dictionaryActions: bindActionCreators(_dictionaryActions, dispatch)
});

const mapStateToProps = state => ({
  englishLevels: state.dictionary.englishLevels
});

const withEnglishLevels = (WrappedComponent) => {
  @connect(mapStateToProps, mapDispatchToProps)
  class DataComponent extends PureComponent {
    componentWillMount = () => {
      const {dictionaryActions: {getEnglishLevels}} = this.props;
      getEnglishLevels();
    };

    render = () => <WrappedComponent {...this.props} />;
  }

  DataComponent.propTypes = {
    englishLevels: PropTypes.object,
    dictionaryActions: PropTypes.object
  };

  return DataComponent;
};

export default withEnglishLevels;