import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import Panel from 'js/components/Panel';

const SettingsMainContainer = props => (
  <div className="container">
    <div className="row">
      <div className="col-sm-8">
        {props.children}
      </div>
      <div className="col-sm-4">
        <Panel type={Panel.type.CONTAINER}>
          <ul className="list-group list-unstyled">
            <li className="list-group-item">
              <Link to="/user/profile/settings" activeClassName="active" onlyActiveOnIndex={true}>Profile</Link>
            </li>
            <li className="list-group-item">
              <Link to="/user/profile/settings/account" activeClassName="active">Account</Link>
            </li>
            <li className="list-group-item">
              <Link to="/user/profile/settings/notifications" activeClassName="active">Notifications</Link>
            </li>
            <li className="list-group-item">
              <Link to="/user/profile/settings/additional" activeClassName="active">Additional</Link>
            </li>
          </ul>
        </Panel>
      </div>
    </div>
  </div>
);

SettingsMainContainer.propTypes = {
  children: PropTypes.element
};

export default SettingsMainContainer;