import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Redirect, Route, Switch, withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as _uiActions from 'js/actions/ui';
import * as _dictionaryActions from 'js/actions/dictionary';
import {BundleLoader} from 'js/containers/Bundle';
import newSetsLoader from 'bundle-loader?lazy!./new-sets';
import selfPlacedLearningLoader from 'bundle-loader?lazy!./self-placed-learning';
import SubHeaderMenuLeft from './components/SubHeaderMenuLeft';

const mapDispatchToProps = dispatch => ({
  uiActions: bindActionCreators(_uiActions, dispatch),
  dictionaryActions: bindActionCreators(_dictionaryActions, dispatch)
});

@connect(null, mapDispatchToProps)
@withRouter
class Words extends PureComponent {
  componentDidMount() {
    const {dictionaryActions: {getThemes, getWordSets}, uiActions: {renderSubHeader}} = this.props;

    getThemes();
    getWordSets();

    renderSubHeader(SubHeaderMenuLeft);
  }

  render() {
    return (
      <Switch>
        <Redirect exact from='/words' to='/words/new-sets'/>
        <Route path='/words/new-sets' render={BundleLoader(newSetsLoader, true)}/>
        <Route exact path='/words/self-placed-learning' render={BundleLoader(selfPlacedLearningLoader, true)}/>

        <Redirect to="/pageNotFound"/>
      </Switch>
    );
  }
}

Words.propTypes = {
  uiActions: PropTypes.any,
  dictionaryActions: PropTypes.any
};

export default Words;