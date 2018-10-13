import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Panel from 'js/components/Panel';
import * as _modalActions from 'js/actions/modal';
import Label from '../Label';
import PaymentSchedule from '../PaymentSchedule/PaymentSchedule';
import styles from './styles.sass';

class PaymentTypeItem extends Component {
  openPayment(e) {
    e.preventDefault();

    this.props.modalActions.open({
      title: 'Modal sample title',
      subtitle: 'Modal sample subtitle',
      content: <PaymentSchedule t={this.props.t}/>
    });
  }

  render() {
    let labelType = Label.type.WARNING;
    if (this.props.discount >= 20) labelType = Label.type.SUCCESS;

    return (
      <Panel type={Panel.type.ITEM} nobody={true} className={styles.container}>
        <Link to="" onClick={::this.openPayment}>
          <div className="container-table">
            <div className={styles.content}>
              <h4>{this.props.title}</h4>
              <h5 className="text-muted">{this.props.subtitle}</h5>
              {this.props.discount > 0 && <Label type={labelType}>{this.props.discount}% discount</Label>}
            </div>
            {this.props.cover && (
              <div className={styles.cover}>
                <span/>
              </div>
            )}
          </div>
        </Link>

      </Panel>
    );
  }
}

PaymentTypeItem.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  discount: PropTypes.number,
  cover: PropTypes.string,
  modalActions: PropTypes.object,
  t: PropTypes.func
};

PaymentTypeItem.defaultProps = {
  discount: 0
};

const mapDispatchToProps = dispatch => ({
  modalActions: bindActionCreators(_modalActions, dispatch)
});

export default connect(null, mapDispatchToProps)(PaymentTypeItem);
