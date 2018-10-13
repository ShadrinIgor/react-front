import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {translate} from 'react-i18next';
import DateTime from 'js/components/DateTime';
import styles from './styles.sass';

@translate(['courses'], {wait: true})
class CourseStatistic extends PureComponent {
  render() {
    const {
      t, nextLesson, lessons, lessonsCompleted, groups, level
    } = this.props;
    return (
      <div className={cx('container-table', 'text-center', styles.container)}>
        {nextLesson && (
          <div className={styles.item}>
            <div className={cx(styles.icon, styles['icon-date'])}/>
            <h3><DateTime src={nextLesson} outputFormat={DateTime.outputFormats.DATE_DAY_MONTH}/></h3>
            <p>{t('courses:statistic:nextSession')}</p>
          </div>
        )}
        <div className={styles.item}>
          <div className={cx(styles.icon, styles['icon-lessons'])}/>
          <h3>{lessonsCompleted && (<span><span>{lessonsCompleted}</span><span> \ </span></span>)}{lessons}</h3>
          <p>{lessonsCompleted ? t('courses:statistic:lessonsCompleted') : t('courses:statistic:lessons')}</p>
        </div>
        <div className={styles.item}>
          <div className={cx(styles.icon, styles['icon-groups'])}/>
          <h3>{groups}</h3>
          <p>{t('courses:statistic:groups')}</p>
        </div>
        <div className={styles.item}>
          <div className={cx(styles.icon, styles['icon-level'])}/>
          <h3>{level}</h3>
          <p>{t('courses:statistic:level')}</p>
        </div>
      </div>
    );
  }
}

CourseStatistic.propTypes = {
  t: PropTypes.func,
  lessonsCompleted: PropTypes.number,
  nextLesson: PropTypes.string.isRequired,
  lessons: PropTypes.number.isRequired,
  groups: PropTypes.number,
  level: PropTypes.string.isRequired,
};

CourseStatistic.defaultProps = {
  lessons: '—',
  level: '—',
  groups: '—'
};

export default CourseStatistic;