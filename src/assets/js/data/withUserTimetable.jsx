import {sortBy, groupBy} from 'underscore';
import Utils from 'js/utils/Utils';
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as _publicationsActions from 'js/actions/publications';
import {withUser} from 'js/data';
import withPublications from './withPublications';

const mapDispatchToProps = dispatch => ({
  publicationsActions: bindActionCreators(_publicationsActions, dispatch)
});

const mapStateToProps = (state) => {
  const userLessonsItems = state.publications.userLessons.items;
  const d = sortBy(Object.values(userLessonsItems), 'startTime');
  const nextLesson = d.shift();
  const groupedLessons = groupBy(d, item => item.startTime.split(' ')[0]);

  return {
    nextLesson,
    groupedLessons,
    userLessons: {
      ...state.publications.userLessons,
      count: d.length,
      items: Utils.normalize(d)
    },
    publications: {
      ...state.publications.publications
    }
  };
};

const withUserTimetable = (WrappedComponent) => {
  @withUser
  @withPublications
  @connect(mapStateToProps, mapDispatchToProps)
  class DataComponent extends PureComponent {
    componentWillMount = () => {
      this.refreshTimetable();
    };

    render = () => <WrappedComponent {...this.props} refreshTimetable={::this.refreshTimetable}/>;

    refreshTimetable() {
      const {user: {id: userId}, publicationsActions: {getUserLessons}} = this.props;

      if (userId) getUserLessons(userId);
    }
  }

  DataComponent.propTypes = {
    user: PropTypes.object,
    publications: PropTypes.object,
    publicationsActions: PropTypes.object
  };

  return DataComponent;
};

export default withUserTimetable;