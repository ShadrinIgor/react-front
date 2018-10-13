import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {LessonsScheduleItem} from 'js/components/LessonsSchedule';
import styles from './styles.sass';

const LessonsSchedule = props => (
  <div className={classNames('row', styles.list)}>
    {props.items.map((item, index) => <LessonsScheduleItem key={index} {...item}/>)}
  </div>
);

LessonsSchedule.propTypes = {
  items: PropTypes.array,
};

export default LessonsSchedule;