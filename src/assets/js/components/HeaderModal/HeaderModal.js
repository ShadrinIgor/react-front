import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.sass';

const HeaderModal = props => (
  <nav className={styles.navbar}>
    <div className="container-fluid">
      <div className="row">
        <div className="col-xs-6">
          <div className="navbar-header"/>
        </div>
        <div className="col-xs-6">
          {props.closeCallback && <div className={styles.close} onClick={e => props.closeCallback(e)}/>}
        </div>
      </div>
    </div>
  </nav>
);

HeaderModal.propTypes = {
  closeCallback: PropTypes.func
};

HeaderModal.defaultProps = {};

export default HeaderModal;