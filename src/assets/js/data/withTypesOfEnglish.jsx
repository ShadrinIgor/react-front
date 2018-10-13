import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as _dictionaryActions from 'js/actions/dictionary';

const mapDispatchToProps = dispatch => ({
  dictionaryActions: bindActionCreators(_dictionaryActions, dispatch)
});

const mapStateToProps = state => ({
  typesOfEnglish: state.dictionary.typesOfEnglish
});

const withTypesOfEnglish = (WrappedComponent) => {
  @connect(mapStateToProps, mapDispatchToProps)
  class DataComponent extends PureComponent {
    componentWillMount = () => {
      const {dictionaryActions: {getTypesOfEnglish}} = this.props;
      getTypesOfEnglish();
    };

    render = () => <WrappedComponent {...this.props} />;
  }

  DataComponent.propTypes = {
    typesOfEnglish: PropTypes.object,
    dictionaryActions: PropTypes.object
  };

  return DataComponent;
};

export default withTypesOfEnglish;