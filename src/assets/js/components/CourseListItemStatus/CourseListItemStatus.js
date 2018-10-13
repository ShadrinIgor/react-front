import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import DateTime from '../DateTime/DateTime';
import styles from './styles.sass';

/**
 * currentGroupState
 * const NEW = 1;
 * const IN_PROGRESS = 2;
 * const COMPLETED = 3;
 */
class CourseListItemStatus extends PureComponent {
  render() {
    const {
      currentGroupState, isEnrolled, nearestGroupStartsAt
    } = this.props;

    return (
      <span>
        {(currentGroupState !== 3 && !isEnrolled && nearestGroupStartsAt.length) ? <span><div className={styles.iconStartCourse}/><DateTime src={nearestGroupStartsAt} outputFormat={DateTime.outputFormats.DATE}/></span> : null}
        {(currentGroupState !== 3 && isEnrolled) ? <span><div className={styles.iconEnrolledCourse}/>Enrolled</span> : null}
        {currentGroupState === 3 ? <span><div className={styles.iconFinishedCourse}/>Finished</span> : null}
        {(!isEnrolled && !nearestGroupStartsAt.length) ? <span><div className={styles.iconStartCourse}/>No groups</span> : null}
      </span>
    );
  }
}

CourseListItemStatus.propTypes = {
  currentGroupState: PropTypes.number,
  currentGroupProgress: PropTypes.number,
  isEnrolled: PropTypes.bool,
  nearestGroupStartsAt: PropTypes.string
};

CourseListItemStatus.defaultProps = {
  currentGroupState: null,
  currentGroupProgress: null,
  isEnrolled: false,
  nearestGroupStartsAt: ''
};

export default CourseListItemStatus;