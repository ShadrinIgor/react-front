import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {translate} from 'react-i18next';
import Spinner from '../Spinner';

@translate(['common'], {wait: true})
class DefaultPaymentMethod extends PureComponent {
  render() {
    const {
      t, clickHandler, inProgress, title
    } = this.props;
    return (
      <div>
        <div className="text-muted small">{t('common:payment.transferMessage', {title})}</div>
        {inProgress ? <Spinner size={Spinner.size.MD} className={'pull-left'}/> : (
          <a onClick={clickHandler} href='#' className="btn btn-warning">{t('common:payment.actionButtonLabel', {title})}</a>)}
      </div>
    );
  }
}

DefaultPaymentMethod.propTypes = {
  t: PropTypes.func,
  inProgress: PropTypes.bool,
  clickHandler: PropTypes.func,
  title: PropTypes.string.isRequired
};

export default DefaultPaymentMethod;