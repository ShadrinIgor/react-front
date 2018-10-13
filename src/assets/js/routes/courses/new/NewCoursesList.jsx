import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {translate} from 'react-i18next';
import {englishLevelsType} from 'js/types';
import {withEnglishLevels, withPublications, withCoursesInfo} from 'js/data';
import Spinner from 'js/components/Spinner';
import CourseListItem from 'js/components/CourseListItem';
import EmptyPagePlaceholder from 'js/components/NoContentPlaceholder';

@withEnglishLevels
@withPublications
@withCoursesInfo
@translate(['courses'], {wait: true})
class NewCoursesList extends PureComponent {
  render() {
    const {t, publications: {count, items, fetching} = {}, englishLevels} = this.props;

    if (fetching && !count) {
      return <Spinner/>;
    } else if (!fetching && !count) {
      return <EmptyPagePlaceholder title={t('courses:new:noCoursesMessage')}/>;
    }
    return Object.keys(items).map(id => <CourseListItem key={items[id].id} {...items[id]} englishLevels={englishLevels}/>);
  }
}

NewCoursesList.propTypes = {
  t: PropTypes.func,
  publications: PropTypes.object,
  englishLevels: englishLevelsType
};

export default NewCoursesList;