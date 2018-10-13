import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Panel from 'js/components/Panel';
import CourseTeacherItem from './CourseTeacherItem';
import styles from './style.sass';

class CourseTeachers extends PureComponent {
  render() {
    const {title, teachers: {count, fetching, items}} = this.props;

    if (!count || fetching) {
      return null;
    }

    return (
      <div>
        {title && <h4>{title}</h4>}
        <Panel type={Panel.type.CONTAINER} nobody={true}>
          {Object.keys(items).map(key => (
            <div key={key} className={styles.item}>
              <CourseTeacherItem {...items[key]}/>
            </div>
          ))}
        </Panel>
      </div>
    );
  }
}

CourseTeachers.propTypes = {
  title: PropTypes.string,
  teachers: PropTypes.shape({
    fetching: PropTypes.bool,
    count: PropTypes.number,
    items: PropTypes.object,
    user: PropTypes.object
  }),
};

export default CourseTeachers;