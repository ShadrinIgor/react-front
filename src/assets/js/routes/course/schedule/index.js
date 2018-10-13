import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {LessonsSchedule} from 'js/components/LessonsSchedule';
import CourseScheduleFilter from 'js/components/CourseScheduleFilter';

const schedule = [
  {
    title: 'Mattis Fermentum Tortor Amet',
    date: '2017-09-05 10:00:19',
    completed: true,
    booked: true,
    homework: {
      completed: true
    }
  }, {
    title: 'Maecenas faucibus mollis interdum.',
    booked: true,
    date: '2017-09-07 10:06:19',
    missed: true,
    homework: {
      completed: false
    }
  }, {
    title: 'Purus Vulputate',
    date: '2017-09-08 10:06:19',
    personal: true,
    missed: true
  }, {
    title: 'Etiam porta sem malesuada magna mollis euismod. Nulla vitae elit libero, a pharetra augue.',
    date: '2017-09-10 10:06:19',
    booked: true
  }, {
    title: 'Mollis Dolor',
    date: '2017-09-14 10:06:19'
  }, {
    title: 'Porta Pharetra Purus Lorem',
    date: '2017-09-16 10:06:19',
    booked: true,
    completed: true,
    homework: {
      completed: true
    }
  }, {
    title: 'Final exam',
    date: '2017-09-16 10:06:19',
    booked: true,
    completed: true,
    exam: true
  }
];

@withRouter
class CourseSchedule extends Component {
  componentDidMount() {
    // const {coursesActions} = this.props;
    // const {getCourseSchedule} = coursesActions;

    // getCourseSchedule(match.params.id);
  }

  render() {
    return (
      <div className="container">
        <div>
          <h4>Lessons schedule</h4>
          <div className="row">

            <CourseScheduleFilter title="Sep 5 — Oct 10 (Group 1)"/>

          </div>

          <div className="row">

            <LessonsSchedule items={schedule}/>

          </div>
        </div>
      </div>
    );
  }
}

CourseSchedule.propTypes = {
  courseSchedule: PropTypes.object,
  coursesActions: PropTypes.object,
  match: PropTypes.object
};

export default CourseSchedule;