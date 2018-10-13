import classNames from 'classnames';
import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import * as _toastActions from 'js/actions/toasts';
import Toast from 'js/components/Toasts/Toast';
import styles from './toasts.sass';

const Toasts = (props) => {
  const {toasts, toastActions} = props;
  const hiddenStyle = toasts.length ? '' : 'hidden';

  return (
    <div className={classNames(styles.toasts, hiddenStyle)}>
      {toasts.map(toast => <Toast key={toast.id} toast={toast} actions={toastActions}/>)}
    </div>
  );
};

Toasts.propTypes = {
  toasts: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    value: PropTypes.array.isRequired,
  })).isRequired,
  toastActions: PropTypes.func
};

Toasts.defaultProps = {
  toasts: []
};

const mapDispatchToProps = dispatch => ({
  toastActions: bindActionCreators(_toastActions, dispatch)
});

const mapStateToProps = state => ({
  toasts: state.toasts
});

export default connect(mapStateToProps, mapDispatchToProps)(Toasts);