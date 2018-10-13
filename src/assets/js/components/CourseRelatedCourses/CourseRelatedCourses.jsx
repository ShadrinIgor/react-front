import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {withRelatedCourses, withEnglishLevels} from 'js/data';
import CourseListItem from 'js/components/CourseListItem';
import Spinner from 'js/components/Spinner';

@withEnglishLevels
@withRelatedCourses
class CourseRelatedCourses extends PureComponent {
  render() {
    const {related: {fetching, items}, englishLevels} = this.props;

    if (fetching) return <Spinner/>;
    if (!Object.keys(items).length) return null;

    return (
      <div>
        <h4>Related courses</h4>
        <div className="row">
          {Object.keys(items).map(key => <CourseListItem key={items[key].id} {...{...items[key], columns: 3}} englishLevels={englishLevels}/>)}
        </div>
      </div>
    );
  }
}

CourseRelatedCourses.propTypes = {
  related: PropTypes.object,
  englishLevels: PropTypes.object,
  typeOfEnglish: PropTypes.number.isRequired
};

export default CourseRelatedCourses;