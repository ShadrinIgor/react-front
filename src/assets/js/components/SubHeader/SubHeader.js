import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './styles.sass';

const SubHeader = (props) => {
  const {subHeaderMenuLeft, subHeaderMenuRight, subHeaderMenuCenter} = props;
  const renderMenu = Component => (Component ? <Component styles={styles}/> : null);

  $(window).trigger('resize');

  if ((!subHeaderMenuLeft && !subHeaderMenuRight) && !subHeaderMenuCenter) return null;

  return (
    <div className={styles.subheader} id="container-subheader">
      <nav className={classNames('navbar', 'navbar', 'navbar-default', styles.navbar)}>
        <div className="container">
          {renderMenu(subHeaderMenuCenter)}
          {renderMenu(subHeaderMenuLeft)}
          {renderMenu(subHeaderMenuRight)}
        </div>
      </nav>
    </div>
  );
};

SubHeader.propTypes = {
  subHeaderMenuLeft: PropTypes.element,
  subHeaderMenuRight: PropTypes.element,
  subHeaderMenuCenter: PropTypes.element
};

export default SubHeader;