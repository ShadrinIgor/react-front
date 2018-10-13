import React from 'react';
import PropTypes from 'prop-types';
import CourseEnroll from 'js/components/CourseEnroll';
import CourseSchedule from 'js/components/CourseSchedule';
import styles from './styles.sass';

const schedules = [
  {
    startTime: '2017-06-07 10:06:19',
    endTime: '2017-07-09 10:06:19',
    totalSeats: 12,
    availableSeats: 4,
    schedule: [
      {
        dayOfWeek: 1,
        startTime: '14:06:44'
      }, {
        dayOfWeek: 1,
        startTime: '13:06:19'
      }, {
        dayOfWeek: 4,
        startTime: '17:06:19'
      }
    ]
  }, {
    startTime: '2017-06-07 10:06:19',
    endTime: '2017-07-09 10:06:19',
    totalSeats: 12,
    availableSeats: 4,
    schedule: [
      {
        dayOfWeek: 1,
        startTime: '14:06:44'
      }, {
        dayOfWeek: 1,
        startTime: '13:06:19'
      }, {
        dayOfWeek: 4,
        startTime: '17:06:19'
      }
    ]
  }
];
const PaymentSchedule = props => (
  <div className={styles.container}>
    <div className="row">
      <div className="col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2">

        {schedules.map((schedule, index) => <CourseSchedule key={index} {...schedule} t={props.t}/>)}
        <CourseEnroll t={props.t}/>

      </div>
    </div>
  </div>
);

PaymentSchedule.propTypes = {
  discount: PropTypes.number,
  cover: PropTypes.string,
  t: PropTypes.func
};

PaymentSchedule.defaultProps = {
  discount: 0
};

export default PaymentSchedule;
