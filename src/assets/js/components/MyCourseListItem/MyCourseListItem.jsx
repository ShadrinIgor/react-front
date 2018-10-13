import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {Link} from 'react-router-dom';
import {translate} from 'react-i18next';
import Panel from 'js/components/Panel';
import CourseListItemStatus from 'js/components/CourseListItemStatus';
import {
  LESSON_CANCELED,
} from './constants';
import styles from './styles.sass';

const CoverHelper = (props) => {
  const {status, avatar} = props;
  const muted = status === LESSON_CANCELED;

  if (!avatar.urls) return null;

  return <div className={cx(styles.cover, {[styles.muted]: muted})}
    style={{backgroundImage: `url(${avatar.urls.original})`}}/>;
};

CoverHelper.propTypes = {
  status: PropTypes.string.isRequired,
  avatar: PropTypes.object.isRequired
};

@translate(['common', 'courses'], {wait: true})
class MyCourseListItem extends PureComponent {
  constructor() {
    super();
    this.state = {status: null};
  }

  componentWillMount() {
    if (!this.state.status) {
      this.setState({...this.state, status: this.props.status});
    }
  }

  render() {
    const {
      name, t, publication, id, info = {}, lessons
    } = this.props;

    return (
      <Link to={`/courses/real/my/${publication.id}/${id}`} className={styles.link}>
        <Panel type={Panel.type.ITEM} nobody={true}>
          <div className="container-table">
            <CoverHelper {...publication.course}/>
            <div className={styles.content}>
              <h4 className={'compact'}>{publication.title}</h4>
              <h6 className={`small ${styles.colorGray}`}>{name}</h6>
              <div className={styles.info}>
                <div className="row">
                  <div className="col-xs-5">
                    <CourseListItemStatus {...info} styles={'pull-left'}/>
                  </div>
                  <div className="col-xs-7">
                    <div className="text-muted">
                      <span className='small'>{(info.currentGroupProgress || 0) * lessons.count} {t('courses:myLessons.from')} {lessons.count} {t('courses:myLessons.lessonCompleted')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Panel>
      </Link>
    );
  }
}

MyCourseListItem.propTypes = {
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  course: PropTypes.object,
  nextLessonDate: PropTypes.string,
  countLessons: PropTypes.number,
  countFinishLessons: PropTypes.number,
  requestNumber: PropTypes.number,
  requestDate: PropTypes.string,
  publication: PropTypes.object,
  t: PropTypes.func,
  info: PropTypes.object,
  lessons: PropTypes.object
};

export default MyCourseListItem;