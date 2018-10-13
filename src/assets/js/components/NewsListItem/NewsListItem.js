import React from 'react';
import PropTypes from 'prop-types';
import {translate} from 'react-i18next';
import classNames from 'classnames';
import moment from 'moment';
import Panel from 'js/components/Panel';
import styles from './style.sass';

const NewsListItem = (props) => {
  const m = moment(props.date, 'YYYY-MM-DD HH:mm', 'en');

  return (
    <Panel type={Panel.type.CONTAINER} nobody={true}>
      <div className={classNames('container-table', styles.container, {[styles.muted]: props.muted})}>
        <div className={styles.startTime}>
          <h6>{m.format('D MMM')}</h6>
          <p className="text-muted">{m.format('HH:mm a')}</p>
        </div>
        <div className={styles.content}>
          <h5>{props.title}</h5>
        </div>
      </div>
    </Panel>
  );
};

NewsListItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired, // 2017-07-09 10:06:19
  muted: PropTypes.bool
};

export default translate(['common'], {await: true})(NewsListItem);