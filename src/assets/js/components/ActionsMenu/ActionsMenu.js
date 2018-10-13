import Utils from 'js/utils/Utils';
import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import classNames from 'classnames';
import styles from './styles.sass';

const ActionsMenu = (props) => {
  const uuid = Utils.uuid();

  function itemOnClick(e, action) {
    e.preventDefault();

    if (props.callback) props.callback(action);
  }

  return (
    <div className={classNames('dropdown', styles.container)}>
      <div className="dropdown-toggle" id={uuid} data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
        <span/>
        <span/>
        <span/>
      </div>
      <ul className="dropdown-menu" aria-labelledby={uuid}>
        {props.actions.map((item, index) => <li key={index}><Link to="#"
          onClick={e => itemOnClick(e, item.action)}>{item.title}</Link>
        </li>)}
      </ul>
    </div>
  );
};

ActionsMenu.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.shape({
    action: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  })).isRequired,
  callback: PropTypes.func
};

ActionsMenu.defaultProps = {
  actions: []
};

export default ActionsMenu;