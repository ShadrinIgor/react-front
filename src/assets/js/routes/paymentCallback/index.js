import queryString from 'query-string';
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as _uiActions from 'js/actions/ui';
import Content from 'js/containers/Content';
import PaymentStatus from 'js/components/PaymentStatuses';

const mapDispatchToProps = dispatch => ({
  uiActions: bindActionCreators(_uiActions, dispatch)
});

@connect(null, mapDispatchToProps)
@withRouter
class PaymentCallback extends PureComponent {
  componentWillMount() {
    const {uiActions} = this.props;
    uiActions.renderSubHeader();
  }

  render() {
    const {location} = this.props;
    const queryParams = queryString.parse(location.search);
    return (
      <Content className="container container-table text-center">
        <div className="container-table-cell">
          <div className="col-md-8 col-md-offset-2">
            <PaymentStatus invoiceId={queryParams.invoice} contentId={queryParams.contentId}
              amount={queryParams.total_amount}/>
          </div>
        </div>
      </Content>
    );
  }
}

PaymentCallback.propTypes = {
  location: PropTypes.object,
  uiActions: PropTypes.object
};

export default PaymentCallback;