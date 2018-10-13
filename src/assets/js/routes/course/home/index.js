import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Panel from 'js/components/Panel';
import * as _dictionaryActions from 'js/actions/dictionary';
import * as _publicationActions from 'js/actions/publications';
// import CourseCertificate from 'js/components/CourseCertificate';
// import CourseNews from 'js/components/CourseNews';
import CourseStatistic from 'js/components/CourseStatistic';
import Spinner from 'js/components/Spinner/Spinner';

const mapStateToProps = state => ({
  courseGroups: state.publications.courseGroups,
  users: state.publications.users,
  englishLevels: state.dictionary.englishLevels,
  publications: state.publications.publications,
  lessonGroups: state.publications.lessonGroups,
  lessons: state.publications.lessons
});

function mapDispatchToProps(dispatch) {
  return {
    dictionaryActions: bindActionCreators(_dictionaryActions, dispatch),
    publicationsActions: bindActionCreators(_publicationActions, dispatch)
  };
}

@connect(mapStateToProps, mapDispatchToProps)
@withRouter
class CourseHome extends Component {
  componentDidMount() {
    const {
      match, publicationsActions, dictionaryActions
    } = this.props;
    const {getEnglishLevels} = dictionaryActions;
    const {courseId} = match.params;
    const {
      getPublication, getLessons, getLessonGroups
    } = publicationsActions;

    getPublication(courseId);
    getEnglishLevels();
    getLessons(courseId);
    getLessonGroups(courseId);
  }

  render() {
    const {
      match, publications, lessons, englishLevels
    } = this.props;
    const {courseId} = match.params;
    const publication = publications.items[courseId];

    if (!publication) {
      return <Spinner/>;
    }

    const englishLevel = (englishLevels.items[publication.course.levelId] || {}).name;

    return (
      <div className="container">

        <Panel nobody={true}>
          <CourseStatistic nextLesson={' '} lessons={lessons.count} level={englishLevel}/>
        </Panel>

        {/** <div>
          <h4>Course news</h4>
          <CourseNews items={courseNews}/>
        </div>

         <Panel>
         <CourseCertificate t={t} level={55} levelMax={100}/>
         </Panel> */}

      </div>
    );
  }
}

CourseHome.propTypes = {
  t: PropTypes.func,
  match: PropTypes.object,
  lessons: PropTypes.object,
  courseGroups: PropTypes.object,
  lessonGroups: PropTypes.object,
  publications: PropTypes.object,
  englishLevels: PropTypes.object,
  dictionaryActions: PropTypes.object,
  publicationsActions: PropTypes.object
};

export default CourseHome;