import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';
import cx from 'classnames';
import {translate} from 'react-i18next';
import {paySystemsType} from 'js/types';
import Panel from 'js/components/Panel';
import Utils from 'js/utils/Utils';
import {withPayments} from 'js/data';
import Spinner from 'js/components/Spinner';
import {DefaultPaymentMethod} from './index';
import styles from './styles.sass';
import Price from '../Price/Price';

const availablePaymentMethods = {
  /** CreditCard: {
    title: 'Credit card',
    component: CreditCard
  }, */
  AliPay: {
    title: 'Alipay',
    component: DefaultPaymentMethod,
    url: 'https://intl.alipay.com/'
  },
  WeChat: {
    title: 'Wechat',
    component: DefaultPaymentMethod,
    url: 'https://wechat.com'
  }
};

@withPayments
class PaymentItemWrapper extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      progress: false
    };
  }

  startPayment(e) {
    e.preventDefault();
    this.setState({progress: true});
    this.props.paymentsActions.getPaymentUrl(this.props.invoiceId, this.props.paysystemId);
  }

  render() {
    const {
      name, index, uuid, title, component: PaymentItemComponent
    } = this.props;
    return (
      <div className={cx('panel', styles.panel)}>
        <h5 role="tab" id={`heading-${index}`} className={styles.heading}>
          <a className="collapsed" role="button" data-toggle="collapse" data-parent={`#${uuid}`}
            href={`#collapse-${index}`} aria-expanded={index === 0}
            aria-controls={`collapse-${index}`}>
            <span className={styles.marker}/>{title}<span className={cx(styles.icon, styles[name])}/>
          </a>
        </h5>
        <div id={`collapse-${index}`} className={cx(`panel-collapse collapse`, {in: index === 0})}
          role="tabpanel"
          aria-labelledby={`heading-${index}`} aria-expanded={index === 0}>
          <div className={styles.content}>
            <PaymentItemComponent inProgress={this.state.progress} clickHandler={::this.startPayment} title={title}/>
          </div>
        </div>
      </div>
    );
  }
}

PaymentItemWrapper.propTypes = {
  paysystemId: PropTypes.number,
  paymentURLs: PropTypes.object,
  paymentsActions: PropTypes.object,
  name: PropTypes.string,
  index: PropTypes.number,
  uuid: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string,
  invoiceId: PropTypes.string,
  component: PropTypes.element
};

@withRouter
@withPayments
class PaymentMethodsList extends PureComponent {
  componentDidMount() {
    const {invoices, contentId, paymentsActions: {createInvoice}} = this.props;
    if (!invoices.fetching && !invoices.items[contentId]) {
      createInvoice(+contentId);
    }
  }

  render() {
    const uuid = Utils.uuid();
    const {
      methods, paySystems, invoices, contentId
    } = this.props;
    if (paySystems.fetching || invoices.fetching || !invoices.items[contentId]) {
      return <Spinner/>;
    }
    const invoiceId = invoices.items[contentId].id;
    if (paySystems.count) {
      return (
        <div id={uuid} role="tablist" aria-multiselectable="true">
          {Object.keys(paySystems.items)
            .map((key, index) => <PaymentItemWrapper invoiceId={invoiceId} key={key} index={index}
              paysystemId={paySystems.items[key].id} uuid={uuid}
              name={key.toLowerCase()} {...methods[key]}/>)}
        </div>
      );
    }

    return <div className={cx('text-center', 'text-danger', styles.error)}>Error. There are no payment methods
      found.</div>;
  }
}

PaymentMethodsList.propTypes = {
  contentId: PropTypes.number.isRequired,
  paymentsActions: PropTypes.object,
  invoices: PropTypes.object,
  methods: PropTypes.array,
  paySystems: paySystemsType
};

PaymentMethodsList.defaultProps = {
  methods: availablePaymentMethods,
};

const footerContent = t => <div className="text-center"><span className="text-muted">{t('common:enroll.footer')}</span>
  <Link to="/pages/refund-policy">{t('common:refundPolicy')}</Link></div>;

@translate(['common'], {wait: true})
@withRouter
class PaymentChooseType extends PureComponent {
  render() {
    const {
      t, price, title, contentId
    } = this.props;

    return (
      <div className="row">
        <div className="col-md-8 col-md-offset-2">
          <Panel
            className={styles.container}
            heading={<div className="text-center">{title}: <Price price={price}/></div>}
            footer={footerContent(t)}
            nobody
          >
            <PaymentMethodsList contentId={contentId}/>
          </Panel>
        </div>
      </div>
    );
  }
}

PaymentChooseType.propTypes = {
  t: PropTypes.func,
  contentId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired
};

PaymentChooseType.defaultProps = {
  price: 0
};

export default PaymentChooseType;