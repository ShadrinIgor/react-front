import {PureComponent} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const OurServerDefaultDateFormat = 'YYYY-MM-DD HH:mm';

class DateTime extends PureComponent {
  render() {
    const {
      inputFormat, outputFormat, src
    } = this.props;

    return moment(src, inputFormat).format(outputFormat);
  }
}

//  https://momentjs.com/docs/#/displaying/format/
DateTime.outputFormats = {
  TIME: 'HH:mm',
  DATE: 'MMM D',
  DATE_DAY_MONTH: 'D MMM',
  DATE_DAY_MONTH_FULL: 'D MMMM',
  DATE_TIME: 'MMM D HH:mm',
  LT: 'LT',
  L: 'L',
  L_LT: 'L LT',
  LTA: 'h:mma',
};

DateTime.inputFormats = {
  DATE: OurServerDefaultDateFormat,
  TIME: 'HH:mm:ss'
};

DateTime.propTypes = {
  src: PropTypes.string.isRequired,
  inputFormat: PropTypes.string,
  outputFormat: PropTypes.string
};

DateTime.defaultProps = {
  inputFormat: DateTime.inputFormats.DATE,
  outputFormat: DateTime.inputFormats.DATE
};

export default DateTime;