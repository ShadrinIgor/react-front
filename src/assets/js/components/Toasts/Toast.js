import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from './toast.sass';

class Toast extends Component {
  componentDidMount() {
    if (this.props.toast.autoClose) setTimeout(::this.handleClose, 5000);
  }

  handleClose() {
    const {toast, actions} = this.props;

    if (actions) actions.remove(toast.id);
  }

  renderIcon(toast) {
    if (!toast.icon) return null;

    const iconStyle = {
      backgroundImage: `url(${toast.icon})`,
    };

    return (
      <div className={styles.photo}>
        <div className={styles.avatar} style={iconStyle}/>
      </div>
    );
  }

  renderCloseButton(showCloseButton) {
    if (!showCloseButton) return null;

    return (
      <div className={styles.closeButton}>
        <div className={`icon ${styles.close}`} onClick={::this.handleClose}/>
      </div>
    );
  }

  renderActions(actions) {
    if (!actions) return null;

    return (
      <div className={styles.actions}>
        <div className="button btn btn-primary">Action title</div>
      </div>
    );
  }

  render() {
    const {toast} = this.props;

    return (
      <div className={styles.toast} key={toast.id}>
        <div className={`${styles.table} ${styles[`level-${toast.level}`]}`}>
          <div className={styles.level}/>
          {this.renderIcon(toast)}
          <div className={styles.content}>
            <div className={styles.title}>{toast.title}</div>
            <div className={styles.message}>{toast.message}</div>
            {this.renderActions(toast.actions)}
          </div>
          {this.renderCloseButton(toast.showCloseButton)}
        </div>
      </div>
    );
  }
}

Toast.propTypes = {
  toast: PropTypes.object,
  actions: PropTypes.object
};

export default Toast;