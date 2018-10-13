import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import {Link} from 'react-router-dom';
import * as _uiActions from 'js/actions/ui';
import App from 'js/containers/App';
import Content from 'js/containers/Content';
import styles from './styles.sass';

class PageNotFound extends Component {
  componentWillMount() {
    const {uiActions} = this.props;

    uiActions.renderSubHeader();
  }

  render() {
    const {t} = this.props;

    return (
      <App>
        <Content className="container container-table text-center">
          <div className="container-table-cell">
            <div className={styles['container-error-404']}/>
            <h3>{t('common:pageNotFound:message')} {<Link to="/">{t('common:pageNotFound:link')}</Link>}</h3>
          </div>
        </Content>
      </App>
    );
  }
}

PageNotFound.propTypes = {
  uiActions: PropTypes.object,
  t: PropTypes.func
};

const mapDispatchToProps = dispatch => ({
  uiActions: bindActionCreators(_uiActions, dispatch)
});

export default translate(['common'], {wait: true})(connect(null, mapDispatchToProps)(PageNotFound));