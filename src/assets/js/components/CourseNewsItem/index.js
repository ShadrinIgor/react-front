import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';
import styles from './style.sass';

const CourseNewsItem = (props) => {
  const m = moment(props.date, 'DD-MM-YYYY HH:mm');

  return (
    <div className={styles.container}>
      <div className={classNames('container-table', styles.item)}>
        <div className={classNames('hidden-xs', styles.cover)}>
          <div className={classNames(styles.icon, props.type)}/>
        </div>
        <div className={classNames(styles.content)}>
          <h5>{props.title}</h5>
          <p className="text-muted">{m.format('DD.MM.YY')}</p>
        </div>
      </div>
    </div>

  );
};

CourseNewsItem.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired, // 2017-07-09 10:06:19
  type: PropTypes.string.isRequired,
};

export default CourseNewsItem;