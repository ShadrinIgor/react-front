import React, {PureComponent} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {BundleLoader} from 'js/containers/Bundle';
import * as _uiActions from 'js/actions/ui';
import CoursesSubHeaderMenuLeft from 'js/components/CoursesSubHeaderMenuLeft';
import timetableLoader from 'bundle-loader?lazy!./timetable';
import myCoursesLoader from 'bundle-loader?lazy!./my';
import enrollLoader from 'bundle-loader?lazy!js/routes/enroll';
import newCoursesLoader from 'bundle-loader?lazy!./new';
import courseLoader from 'bundle-loader?lazy!js/routes/course/routes';
import myCourseLoader from 'bundle-loader?lazy!js/routes/course/CourseGroupLanding';

const mapDispatchToProps = dispatch => ({
  uiActions: bindActionCreators(_uiActions, dispatch)
});

@connect(null, mapDispatchToProps)
class CoursesRoutes extends PureComponent {
  componentDidMount() {
    const {uiActions} = this.props;

    uiActions.renderSubHeader(CoursesSubHeaderMenuLeft);
  }

  render() {
    return (
      <Switch>
        <Redirect exact from='/courses/real/' to='/courses/real/timetable'/>
        <Route exact path='/courses/real/timetable' render={BundleLoader(timetableLoader, true)}/>

        <Route exact path="/courses/real/my/:courseId(\d+)/:groupId(\d+)/:route(schedule|about)?" render={BundleLoader(myCourseLoader, true)}/>
        <Route exact path='/courses/real/my/:filter(progress|finished|enrolled)' render={BundleLoader(myCoursesLoader, true)}/>
        <Route exact path='/courses/real/my' render={BundleLoader(myCoursesLoader, true)}/>

        <Route exact path="/courses/real/new/:courseId(\d+)/enroll/:groupId(\d+)" render={ ({match}) => <div className="container text-center">Enrolling group {match.params.groupId} of course {match.params.courseId}...</div>}/>
        <Route exact path="/courses/real/new/:courseId(\d+)/enroll" component={BundleLoader(enrollLoader, true)}/>
        <Route exact path="/courses/real/new/:courseId(\d+)" component={BundleLoader(courseLoader, true)}/>
        <Route exact path="/courses/real/enroll" component={BundleLoader(enrollLoader, true)}/>

        <Route path='/courses/real/new' render={BundleLoader(newCoursesLoader, true)}/>

        <Redirect to="/pageNotFound"/>
      </Switch>
    );
  }
}

CoursesRoutes.propTypes = {
  uiActions: PropTypes.object
};

export default CoursesRoutes;