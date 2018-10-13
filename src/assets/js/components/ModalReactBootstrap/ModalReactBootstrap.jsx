import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-bootstrap-modal';
import './styles.sass';

class ModalReactBootstrap extends PureComponent {
  state = {
    open: false
  };

  hideModal() {
    this.setState({ open: false});
    if (this.props.onClose) this.props.onClose();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({open: nextProps.open});
  }

  render() {
    const {title, children} = this.props;
    return (
      <ReactModal
        show={this.state.open}
        onHide={::this.hideModal}
        onExit={::this.hideModal}
        aria-labelledby="ModalHeader"
      >
        <ReactModal.Header closeButton>
          {title && <ReactModal.Title id="ModalHeader">{title}</ReactModal.Title>}
        </ReactModal.Header>
        <ReactModal.Body>{children}</ReactModal.Body>
        {/** <ReactModal.Footer>
          <ReactModal.Dismiss className='btn btn-default'>Cancel</ReactModal.Dismiss>
          <button className='btn btn-primary' onClick={::this.hideModal}>
            Save
          </button>
        </ReactModal.Footer> */}
      </ReactModal>
    );
  }
}

ModalReactBootstrap.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.element
};

export default ModalReactBootstrap;