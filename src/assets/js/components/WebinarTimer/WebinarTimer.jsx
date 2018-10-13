import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import DateTime from 'js/components/DateTime';
import {withUser} from 'js/data';

@withUser
class WebinarTimer extends PureComponent {
  state = {
    status: null,
    label: null
  };

  calculateRemainingTime() {
    const {user: {timediff}, lessonStartDateTime, lessonEndDateTime} = this.props;
    const lessonStartDateTimeUnix = moment(lessonStartDateTime, DateTime.inputFormats.DATE).diff(timediff);
    const lessonEndDateTimeUnix = moment(lessonEndDateTime, DateTime.inputFormats.DATE).diff(timediff);
    const userTimeUnix = moment();

    if (userTimeUnix > lessonStartDateTimeUnix && userTimeUnix < lessonEndDateTimeUnix) {
      // in progress
      this.setState({
        status: 0,
        label: 'In progress'
      });
    } else if (userTimeUnix > lessonEndDateTimeUnix) {
      // finished
      this.setState({
        status: 1,
        label: 'Finished'
      });
    } else if (userTimeUnix < lessonStartDateTimeUnix && (lessonStartDateTimeUnix - userTimeUnix) < (10 * 60 * 1000)) {
      // 10 minutes
      this.setState({
        status: 2,
        label: moment(userTimeUnix).to(lessonStartDateTimeUnix)
      });
    } else {
      this.setState({
        status: null,
        label: moment(userTimeUnix).to(lessonStartDateTimeUnix)
      });
    }
  }

  componentDidMount() {
    clearInterval(this.refresher);
    this.refresher = setInterval(::this.timerHandel, 1000);
    this.timerHandel();
  }

  componentWillUnmount() {
    clearInterval(this.refresher);
  }

  timerHandel() {
    this.calculateRemainingTime();
    this.props.callBack(this.state);
  }

  render() {
    return null;
  }
}

WebinarTimer.propTypes = {
  user: PropTypes.object,
  callBack: PropTypes.func.isRequired,
  lessonStartDateTime: PropTypes.string,
  lessonEndDateTime: PropTypes.string
};

export default WebinarTimer;