import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Route, Switch} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as _uiActions from 'js/actions/ui';
import CourseGroupLandingHeader from 'js/components/CourseGroupLandingHeader';
import CourseNavBarSection from './containers/CourseNavBarSection';
import CourseGroupAbout from './about';
import CourseGroupSchedule from './schedule';

const mapDispatchToProps = dispatch => ({
  uiActions: bindActionCreators(_uiActions, dispatch),
});

@connect(null, mapDispatchToProps)
class CourseGroupLanding extends PureComponent {
  componentWillMount() {
    const {uiActions} = this.props;

    uiActions.renderSubHeader();
  }

  render() {
    return (
      <div>
        <CourseGroupLandingHeader/>
        <CourseNavBarSection/>

        <Switch>
          <Route exact path="/courses/real/my/:courseId(\d+)/:groupId(\d+)/about" component={CourseGroupAbout}/>
          <Route path="/courses/real/my/:courseId(\d+)/:groupId(\d+)" component={CourseGroupSchedule}/>
        </Switch>

      </div>
    );
  }
}

CourseGroupLanding.propTypes = {
  uiActions: PropTypes.object
};

export default CourseGroupLanding;