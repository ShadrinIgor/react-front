import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as _paymentsActions from 'js/actions/payments';
import {paySystemsType} from 'js/types';

const mapDispatchToProps = dispatch => ({
  paymentsActions: bindActionCreators(_paymentsActions, dispatch)
});

const mapStateToProps = state => ({
  paySystems: state.payments.paySystems,
  invoices: state.payments.invoices,
  paymentURLs: state.payments.paymentURLs
});

const withPayments = (WrappedComponent) => {
  @connect(mapStateToProps, mapDispatchToProps)
  class DataComponent extends PureComponent {
    componentWillMount = () => {
      const {paymentsActions: {getPaySystems}} = this.props;
      getPaySystems();
    };
    render = () => <WrappedComponent {...this.props} />;
  }

  DataComponent.propTypes = {
    paySystems: paySystemsType,
    paymentsActions: PropTypes.object
  };

  return DataComponent;
};

export default withPayments;