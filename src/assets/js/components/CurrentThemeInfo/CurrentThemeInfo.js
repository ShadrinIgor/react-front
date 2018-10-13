import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Panel from 'js/components/Panel';
import {BadgeCurrency, BadgeRibbon} from 'js/components/Badge';
import styles from './styles.sass';

const CurrentThemeInfo = (props) => {
  const {
    name, description, sets, words, premium
  } = props;

  return (
    <Panel className={styles.container}>
      <div className="row">
        <div className="col-xs-8">
          <h4 className="compact">{name}</h4>
          {description && <p className="small text-muted">{description}</p>}
        </div>
        <div className="col-xs-4">
          <div className="row">
            <div className={classNames('col-xs-7', 'col-xs-offset-5', styles.stat)}>
              {sets > 0 && <h3 className="compact">{sets}
                <small>sets</small>
              </h3>}
              {words > 0 && <h3 className="compact">{words}
                <small>words</small>
              </h3>}
            </div>
          </div>
          {premium &&
          <div className="row">
            <div className="col-xs-12">
              <BadgeRibbon direction={BadgeRibbon.direction.LEFT}
                style={{marginRight: -21}}><BadgeCurrency style={{marginTop: -3}}/>
                <small style={{position: 'relative', top: -1}}>Include premium materials</small>
              </BadgeRibbon>
            </div>
          </div>
          }
        </div>
      </div>
    </Panel>
  );
};

CurrentThemeInfo.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  sets: PropTypes.number,
  words: PropTypes.number,
  premium: PropTypes.bool
};

CurrentThemeInfo.defaultProps = {
  sets: 0,
  words: 0
};

export default CurrentThemeInfo;