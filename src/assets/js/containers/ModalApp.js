import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Content from 'js/containers/Content';
import HeaderModal from 'js/components/HeaderModal';
import FirstStepsStatusBar from 'js/components/FirstStepsStatusBar';

class ModalApp extends PureComponent {
  render() {
    const {className, children} = this.props;
    return (
      <div className={className}>
        <HeaderModal/>
        <Content className={classNames('container', 'container-table', 'text-center')}>
          <div className="container-table-cell">
            {children}
          </div>
        </Content>
        <FirstStepsStatusBar/>
      </div>
    );
  }
}

ModalApp.propTypes = {
  className: PropTypes.string,
  children: PropTypes.element
};

export default ModalApp;