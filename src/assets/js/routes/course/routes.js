import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import {withRouter} from 'react-router-dom';
import DOMUtil from 'js/utils/DOMUtil';
import * as _uiActions from 'js/actions/ui';
import Panel from 'js/components/Panel';
import Spinner from 'js/components/Spinner';
import CourseLandingHeader from 'js/components/CourseLandingHeader';
import CourseStatistic from 'js/components/CourseStatistic';
import CourseAboutSection from 'js/routes/course/containers/CourseAboutSection';
import CourseStructureSection from 'js/routes/course/containers/CourseStructureSection';
import CourseGroupsList from 'js/components/CourseGroupsList';
import CourseRelatedCourses from 'js/components/CourseRelatedCourses';
import {withCourse} from 'js/data';

const mapStateToProps = state => ({
  courseGroups: state.publications.courseGroups,
  publications: state.publications.publications,
  lessons: state.publications.lessons
});

const mapDispatchToProps = dispatch => ({
  uiActions: bindActionCreators(_uiActions, dispatch)
});

@withCourse
@translate(['common', 'courses'], {wait: true})
@connect(mapStateToProps, mapDispatchToProps)
@withRouter
class CourseRoutes extends PureComponent {
  componentWillMount() {
    const {uiActions} = this.props;

    uiActions.renderSubHeader();
    DOMUtil.scrollToTopDocument();
  }

  render() {
    const {
      t, match, publications, lessons, courseClosestLesson, courseStatistic
    } = this.props;
    const {courseId} = match.params;
    const publication = (publications.items || {})[courseId];

    if (!publication || courseClosestLesson.fetching) {
      return <Spinner/>;
    }

    return (
      <div>
        <CourseLandingHeader/>
        <Panel type={Panel.type.CONTAINER} nobody={true}>
          <div className="container">
            <CourseStatistic {...courseStatistic}/>
          </div>
        </Panel>
        {publication.course && (publication.course.video || publication.course.description) && (
          <div className="container">
            <CourseAboutSection title={t('common:about')} {...publication.course}/>
          </div>)
        }
        <div className="container">
          <a name={'groups'} id={'groups'}/>
          <h4>{t('common:groups')}</h4>
          <CourseGroupsList courseId={courseId}/>
        </div>
        <div className="container">
          <CourseStructureSection title={t('common:structure')} lessons={lessons}/>
          {/** <FeedbackListItems title={t('common:feedback.title')} t={t} comments={[]}/> */}
          <CourseRelatedCourses typeOfEnglish={publication.course.typeOfEnglish}/>
        </div>
      </div>
    );
  }
}

CourseRoutes.propTypes = {
  t: PropTypes.object,
  match: PropTypes.object,
  publications: PropTypes.object,
  lessons: PropTypes.object,
  uiActions: PropTypes.object,
  courseClosestLesson: PropTypes.object,
  courseStatistic: PropTypes.object
};

export default CourseRoutes;