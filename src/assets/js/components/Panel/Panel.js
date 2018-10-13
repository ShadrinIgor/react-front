import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './styles.sass';

class Panel extends Component {
  refContainer = null;
  state = {
    close: false
  };

  closePanel() {
    this.setState({
      close: true
    });
  }

  getTemplateForHeading() {
    if (this.props.heading) {
      return (
        <div className={cx('panel-heading', styles.heading)}>
          <h3>{this.props.heading}</h3>
        </div>
      );
    }
  }

  getTemplateForFooter() {
    if (this.props.footer) {
      return <div className={cx('panel-footer', styles.footer)}>{this.props.footer}</div>;
    }
  }

  getTemplateForBody() {
    if (this.props.nobody) {
      return this.props.children;
    }

    return <div className={cx('panel-body', styles.body)}>{this.props.children}</div>;
  }

  render() {
    const {type, className, close} = this.props;

    if (this.state.close) {
      return null;
    }

    return (
      <div className={cx('panel', styles[type], styles.panel, className)} ref={(c) => { this.refContainer = c; }}>
        {::this.getTemplateForHeading()}
        {::this.getTemplateForBody()}
        {::this.getTemplateForFooter()}
        {close && <div className={styles.close} onClick={::this.closePanel}/>}
      </div>
    );
  }
}

Panel.type = {
  DEFAULT: null,
  SIMPLE: 'panel-simple',
  PAGE: 'panel-page',
  CONTAINER: 'panel-container',
  ITEM: 'panel-item'
};

Panel.propTypes = {
  key: PropTypes.string,
  type: PropTypes.string,
  nobody: PropTypes.bool,
  close: PropTypes.bool,
  heading: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  footer: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  children: PropTypes.element,
  className: PropTypes.string
};

Panel.defaultProps = {
  type: Panel.type.DEFAULT,
  nobody: false
};

export default Panel;