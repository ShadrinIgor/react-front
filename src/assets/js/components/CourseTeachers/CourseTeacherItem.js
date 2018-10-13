import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {withDegrees} from 'js/data';
import Avatar from 'js/components/Avatar';
import styles from './style.sass';

@withDegrees
class CourseTeacherItem extends PureComponent {
  render() {
    const {
      about, degreeId, degrees, user: {name, avatar, avatarSource}
    } = this.props;

    if (degrees.fetching) return null;

    return (
      <div className={styles.container}>
        <div className={styles.coverBox}>
          <Avatar avatar={avatar} size={Avatar.size.LG} avatarSource={avatarSource} className={styles.cover}/>
        </div>
        <div className={styles.content}>
          <h4>{name}</h4>
          {degrees.items[degreeId] && <p className={styles.degree}>{degrees.items[degreeId].name}</p>}
          {about && <p>{about}</p>}
        </div>
      </div>
    );
  }
}

CourseTeacherItem.propTypes = {
  about: PropTypes.string.isRequired,
  degreeId: PropTypes.string.isRequired,
  degrees: PropTypes.object,
  user: PropTypes.object,
  avatarSource: PropTypes.string // TODO: hack for old site
};

export default CourseTeacherItem;