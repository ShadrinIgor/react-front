import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {withPayments, withCourseGroup} from 'js/data';
import {translate} from 'react-i18next';
import {Link} from 'react-router-dom';
import {
  INVOICE_STATUS_IN_PROGRESS,
  INVOICE_STATUS_SUCCESS,
  INVOICE_STATUS_FAILED
} from 'js/constants/payments';
import styles from './styles.sass';
import Spinner from '../Spinner';
import Price from '../Price';
import successImg from './img/success.svg';
import failImg from './img/fail.svg';

const successStyle = {
  backgroundImage: `url(${successImg})`
};
const failStyle = {
  backgroundImage: `url(${failImg})`
};

@translate(['common', 'courses'], {wait: true})
@withPayments
@withCourseGroup
class PaymentStatus extends PureComponent {
  componentWillMount() {
    const {
      invoiceId, paymentsActions, publicationsActions, contentId
    } = this.props;
    paymentsActions.getInvoice(invoiceId);
    publicationsActions.getCourseGroup(contentId);
    this.timeout = setTimeout(() => {
      this.invoiceUpdateTimeout();
    }, 5000);
  }

  invoiceUpdateTimeout() {
    const {invoices, invoiceId, paymentsActions} = this.props;
    const currentInvoice = invoices.items[invoiceId];
    if (!currentInvoice || currentInvoice.paymentStatus === INVOICE_STATUS_IN_PROGRESS) {
      paymentsActions.getInvoice(invoiceId);
      this.timeout = setTimeout(() => {
        this.invoiceUpdateTimeout();
      }, 5000);
    }
  }

  componentWillUnmount() {
    if (this.timeout) clearTimeout(this.timeout);
  }

  renderSuccess() {
    const {t, courseGroups, contentId} = this.props;
    if (!courseGroups.items[contentId]) return null;
    return <div>
      <div style={successStyle} className={styles.icon}/>
      <h4>{t('common:payment.completed')}</h4>
      <Link to={`/courses/real/new/${courseGroups.items[contentId].courseId}`}>
        <button className={`btn btn-primary ${styles.btn}`}>{t('courses:courses.view')}</button>
      </Link>
    </div>;
  }

  renderError() {
    const {t, contentId, courseGroups} = this.props;
    if (!courseGroups.items[contentId]) return null;
    return <div>
      <div style={failStyle} className={styles.icon}/>
      <h4>{t('common:payment.wrong')}…</h4>
      <Link to={`/courses/real/new/${courseGroups.items[contentId].courseId}`}>
        <button className={`btn btn-primary ${styles.btn}`}>{t('common:again')}</button>
      </Link>
    </div>;
  }

  renderPending() {
    const {t} = this.props;
    return <div>
      <div className={styles.spinner}>
        <Spinner size="lg"/>
      </div>
      <h4>{t('common:payment.inprogress')} ...</h4>
      <p>{t('common:payment.materialAvailable')}</p>
    </div>;
  }

  render() {
    const {
      t, invoices, invoiceId, amount, courseGroups, contentId
    } = this.props;
    if (!invoices.items[invoiceId]) return <Spinner/>;
    const currentInvoice = invoices.items[invoiceId];
    const currentGroup = courseGroups.items[contentId];
    if (!currentGroup) return <Spinner/>;
    return (
      <div>
        <h2 className={styles.centerHeader}>{t('courses:enroll.enrolling')} “{currentGroup.publication.title}” </h2>
        <div className={`panel ${styles.panel}`}>
          <div className={`panel-heading ${styles.heading}`}>
            <h3>{t('common:payment.price')}: <Price price={+amount}/></h3>
          </div>
          {currentInvoice.paymentStatus === INVOICE_STATUS_IN_PROGRESS && this.renderPending()}
          {currentInvoice.paymentStatus === INVOICE_STATUS_SUCCESS && this.renderSuccess()}
          {currentInvoice.paymentStatus === INVOICE_STATUS_FAILED && this.renderError()}
        </div>
      </div>
    );
  }
}

PaymentStatus.propTypes = {
  t: PropTypes.object,
  courseGroups: PropTypes.object,
  publicationsActions: PropTypes.object,
  paymentsActions: PropTypes.object,
  invoices: PropTypes.object,
  amount: PropTypes.number.required,
  invoiceId: PropTypes.string.required,
  contentId: PropTypes.string.required
};

export default PaymentStatus;
