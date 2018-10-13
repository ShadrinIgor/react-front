import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class ContainerWithSidebar extends PureComponent {
  render() {
    const {contentLeft, contentRight, useContainerWrapper} = this.props;
    return (
      <div className={classNames({container: useContainerWrapper})}>
        <div className="row">
          <div className="col-xs-12 col-sm-8 col-md-8">
            {contentLeft}
          </div>
          <div className="col-xs-12 col-sm-4 col-md-4">
            {contentRight}
          </div>
        </div>
      </div>
    );
  }
}

ContainerWithSidebar.propTypes = {
  contentLeft: PropTypes.element.isRequired,
  contentRight: PropTypes.element.isRequired,
  useContainerWrapper: PropTypes.bool
};

ContainerWithSidebar.defaultProps = {
  useContainerWrapper: true
};

export default ContainerWithSidebar;