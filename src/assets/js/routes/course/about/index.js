import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import DOMUtil from 'js/utils/DOMUtil';
import {withCourseGroup} from 'js/data';
import * as _uiActions from 'js/actions/ui';
import Spinner from 'js/components/Spinner';
import CourseRelatedCourses from 'js/components/CourseRelatedCourses';
import CourseTeachers from 'js/components/CourseTeachers';
import CourseAboutSection from '../containers/CourseAboutSection';
import CourseStructureSection from '../containers/CourseStructureSection';

const mapStateToProps = state => ({
  courseGroups: state.publications.courseGroups,
  publications: state.publications.publications,
  lessons: state.publications.lessons
});

const mapDispatchToProps = dispatch => ({
  uiActions: bindActionCreators(_uiActions, dispatch)
});

@translate(['common'], {wait: true})
@withCourseGroup
@connect(mapStateToProps, mapDispatchToProps)
class CourseAbout extends Component {
  componentDidMount() {
    const {uiActions} = this.props;

    uiActions.renderSubHeader();
    DOMUtil.scrollToTopDocument();
  }

  render() {
    const {
      t, lessons, courseGroup, courseGroup: {publication, teacher} = {}
    } = this.props;

    if (!courseGroup || !publication) {
      return <Spinner/>;
    }

    return (
      <div>
        {publication.course && (publication.course.video || publication.course.description) && (
          <div className="container">
            <CourseAboutSection title={t('common:about')} {...publication.course}/>
          </div>)
        }
        <div className="container">
          <CourseStructureSection title={t('common:structure')} lessons={lessons}/>
          <CourseTeachers title={t('common:teacher')} teachers={{count: 1, items: {[teacher.id]: teacher}}}/>
          <CourseRelatedCourses typeOfEnglish={publication.course.typeOfEnglish}/>
        </div>
        <div>
          {/** <CourseAboutSection title={t('common:about')} video={publication.course.video} description={publication.course.description}/>
          <CourseStructureSection title={t('common:structure')} structure={structure}/>
          <CourseTeachers title={t('common:teachers')} teachers={teachers}/>
          <CourseFeedbackSection/> */}
          {/** <CourseRelatedSection/> */}
        </div>
      </div>
    );
  }
}

CourseAbout.propTypes = {
  t: PropTypes.func,
  match: PropTypes.object,
  lessons: PropTypes.object,
  teachers: PropTypes.object,
  courseGroup: PropTypes.object,
  uiActions: PropTypes.object
};

export default CourseAbout;