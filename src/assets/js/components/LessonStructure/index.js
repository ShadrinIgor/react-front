import React, {PureComponent} from 'react';
import cx from 'classnames';
import lessonType from 'js/types/lessonType';
import styles from './style.sass';

class LessonStructure extends PureComponent {
  render() {
    const {items} = this.props;
    return (
      <div>
        {Object.keys(items).map(key => (
          <div className={styles.item} key={key}>
            <div className={styles.icon}/>
            <div className={styles.content}>
              <h6 className={cx(styles.title, 'compact')}>{items[key].title}</h6>
              {items[key].description && <p>{items[key].description}</p>}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

LessonStructure.propTypes = {
  ...lessonType
};

export default LessonStructure;