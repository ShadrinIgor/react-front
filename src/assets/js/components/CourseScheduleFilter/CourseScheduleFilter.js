import React from 'react';
import PropTypes from 'prop-types';
import {NavLink, withRouter} from 'react-router-dom';
import classNames from 'classnames';
import Panel from 'js/components/Panel';
import styles from './styles.sass';

const CourseScheduleFilter = ({match, title}) => {
  const courseId = match.params.id;
  const link = `/courses/${courseId}/schedule`;

  return (
    <Panel nobody={true} className={styles.container}>
      <div className="row">
        <div className="col-xs-6">

          <h4><span className={classNames(styles.icon, styles.calendar)}/>{title}</h4>

        </div>
        <div className="col-xs-6 text-right">

          {/** <Link to="/" className="btn btn-warning">Book all lessons</Link>
           <Link to="/" className="btn btn-default">Change Group</Link> */}

        </div>
      </div>
      <div className={classNames('container-table', styles.filter)}>
        <div className={styles.left}>
          <span className="text-muted">Show:</span>
        </div>
        <div>

          <div className={styles.links}>
            <NavLink exact to={link}><span>All (5)</span></NavLink>
            <NavLink exact to={`${link}/upcoming`}><span>Upcoming (3)</span></NavLink>
            <NavLink exact to={`${link}/missed`}><span>Missed (1)</span></NavLink>
            <NavLink exact to={`${link}/completed`}><span>Completed (1)</span></NavLink>
            {/** <NavLink exact to={`${link}/notbooked`}><span>Not booked (2)</span></NavLink> */}
          </div>

        </div>
      </div>

    </Panel>
  );
};

CourseScheduleFilter.propTypes = {
  title: PropTypes.string.isRequired,
  match: PropTypes.object
};

export default withRouter(CourseScheduleFilter);