import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import classNames from 'classnames';
import HeaderModal from 'js/components/HeaderModal';
import Content from 'js/containers/Content';
import * as _modalActions from 'js/actions/modal';
import styles from './styles.sass';

const Modal = ({modal, showCloseButton, modalActions}) => {
  if (modal.close) return null;

  const closeModal = () => {
    if (showCloseButton) {
      modalActions.close();
      if (modal.actions && modal.actions.onClose) {
        modal.actions.onClose();
      }
    }
  };

  return (
    <div className={styles.container}>
      <HeaderModal closeCallback={closeModal}/>
      <Content className={classNames('container', 'container-table')}>
        <div className="container-table-cell">
          <div className={styles.header}>
            <h2>{modal.title}</h2>
            <h4 className="text-muted">{modal.subtitle}</h4>
          </div>
          <div>{modal.content}</div>
        </div>
      </Content>
    </div>
  );
};

Modal.propTypes = {
  showCloseButton: PropTypes.bool,
  modal: PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string,
    content: PropTypes.any,
    close: PropTypes.bool
  }),
  modalActions: PropTypes.object
};

Modal.defaultProps = {
  showCloseButton: true
};

const mapDispatchToProps = dispatch => ({
  modalActions: bindActionCreators(_modalActions, dispatch)
});

const mapStateToProps = state => ({
  modal: state.modal
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
