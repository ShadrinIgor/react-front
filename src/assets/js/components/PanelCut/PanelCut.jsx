import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Panel from 'js/components/Panel';
import styles from './styles.sass';

class PanelCut extends PureComponent {
  state = {
    collapsed: true
  };

  toggle() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  componentDidMount() {

  }

  render() {
    const {panelProps, minHeight, enabled} = this.props;
    const collapsedStyle = {height: minHeight};
    const collapsed = !this.state.collapsed ? styles.collapsed : null;
    const collapsedInline = !this.state.collapsed ? collapsedStyle : null;
    if (!enabled) {
      return (
        <Panel {...panelProps}>{this.props.children}</Panel>
      );
    }
    return (
      <Panel {...panelProps}>
        <div className={cx(styles.container, collapsed)} style={collapsedInline}>
          {this.props.children}
        </div>
        <div className={cx(styles.button, collapsed)} onClick={::this.toggle}>
          Title will be here<span className={cx('icon', 'icon_24', styles.icon)}/>
        </div>
      </Panel>
    );
  }
}

PanelCut.propTypes = {
  title: PropTypes.string,
  children: PropTypes.element,
  minHeight: PropTypes.number,
  panelProps: PropTypes.object,
  enabled: PropTypes.bool
};

PanelCut.defaultProps = {
  minHeight: 200,
  enabled: false
};

export default PanelCut;