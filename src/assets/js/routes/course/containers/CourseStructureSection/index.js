import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import PanelCut from 'js/components/PanelCut';
import LessonStructure from 'js/components/LessonStructure';
import {lessonsType} from 'js/types';
import Panel from 'js/components/Panel';
import WrapperWithFullLink from 'js/components/WrapperWithFullLink';
import styles from './styles.sass';

class CourseStructureSection extends PureComponent {
  render() {
    const {title, lessons: {count, fetching, items}} = this.props;

    if (fetching || !count) {
      return null;
    }

    return (
      <div>
        {title && <h4>{title}</h4>}
        <PanelCut panelProps={{type: Panel.type.CONTAINER}}>
          <WrapperWithFullLink height={250} id={'structure'}>
            <div className={styles.padding}>
              <LessonStructure items={items} id={'lessonStructure'} />
            </div>
          </WrapperWithFullLink>
        </PanelCut>
      </div>
    );
  }
}

CourseStructureSection.propTypes = {
  title: PropTypes.string,
  lessons: lessonsType
};

export default CourseStructureSection;