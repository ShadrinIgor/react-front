import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import DateTime from 'js/components/DateTime';
import {withUser} from 'js/data';

@withUser
class Timezone extends PureComponent {
  render() {
    const {
      user: {timediff}, datetime, inputFormat, outputFormat
    } = this.props;
    const time = moment(datetime, inputFormat).diff(timediff);

    return <DateTime src={moment(time).format(inputFormat)} inputFormat={inputFormat} outputFormat={outputFormat}/>;
  }
}

Timezone.propTypes = {
  user: PropTypes.object,
  datetime: PropTypes.string.isRequired,
  inputFormat: PropTypes.string,
  outputFormat: PropTypes.string
};

Timezone.defaultProps = {
  inputFormat: DateTime.inputFormats.TIME,
  outputFormat: DateTime.outputFormats.LTA
};

export default Timezone;