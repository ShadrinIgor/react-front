import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {Link} from 'react-router-dom';
import Panel from 'js/components/Panel';
import CourseListItemStatus from 'js/components/CourseListItemStatus';
import FileModel from 'js/models/FileModel';
import styles from './styles.sass';

class CourseListItem extends PureComponent {
  render() {
    const {
      id, course, info, columns, englishLevels, title
    } = this.props;

    if (!course) return null;

    const columnsClasses = cx(columns === 2 ? ['col-sm-12', 'col-md-6'] : ['col-sm-12', 'col-md-4']);
    const level = englishLevels ? englishLevels.items[course.levelId] : {};

    return (
      <div key={id} className={columnsClasses}>
        <Link to={`/courses/real/new/${id}`} className={styles.link}>
          <Panel type={Panel.type.ITEM} nobody={true}>
            <div className={styles.cover}
              style={{backgroundImage: `url(${(new FileModel(course.cover))['340x168']})`}}/>
            <div className={styles['container-content']}>
              <div className={styles.title}>
                <h4 className="compact">{title}</h4>
              </div>
              <div className={cx(styles.info, 'clearfix')}>
                <div className={cx('text-muted', 'pull-left', styles.column)}>
                  <CourseListItemStatus {...info}/>
                </div>
                <div className={cx('text-muted', 'pull-left', styles.column)}>
                  <div className={styles.iconLanguageLevel}/>{level ? level.name : ''}
                </div>
              </div>
            </div>
          </Panel>
        </Link>
      </div>
    );
  }
}

CourseListItem.propTypes = {
  columns: PropTypes.number,
  id: PropTypes.number.isRequired,
  createdAt: PropTypes.string,
  title: PropTypes.string.isRequired,
  englishLevels: PropTypes.object,
  info: PropTypes.shape({
    courseId: PropTypes.number,
    currentGroupState: PropTypes.number,
    currentGroupProgress: PropTypes.number,
    isEnrolled: PropTypes.bool(),
    nearestGroupStartsAt: PropTypes.string
  }),
  course: PropTypes.shape({
    levelId: PropTypes.number,
    avatar: PropTypes.shape({
      status: PropTypes.string.isRequired,
      fileId: PropTypes.string.isRequired,
      urls: PropTypes.array.isRequired
    }).isRequired
  }),
  level: PropTypes.object,
  cover: PropTypes.object
};

CourseListItem.defaultProps = {
  columns: 2,
  avatar: {
    status: '',
    fileId: '',
    urls: []
  }
};

export default CourseListItem;