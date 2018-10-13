import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Panel from 'js/components/Panel';
import styles from './styles.sass';

class PlaceholderPanelNoDescription extends PureComponent {
  render() {
    const {title, buttonTitle, link} = this.props;
    return (
      <Panel type={Panel.type.CONTAINER} nobody={true} className={styles.panel}>
        <div className="row">
          <div className="col-xs-12 text-center">
            <h4>{title}</h4>
          </div>
          {link && (
            <div className="col-xs-12 text-center">
              <Link className="btn btn-warning" to={link}>{buttonTitle}</Link>
            </div>
          )
          }
        </div>
      </Panel>
    );
  }
}

PlaceholderPanelNoDescription.propTypes = {
  title: PropTypes.string,
  buttonTitle: PropTypes.string,
  link: PropTypes.string
};

export default PlaceholderPanelNoDescription;