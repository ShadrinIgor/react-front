import {Component} from 'react';
import PropTypes from 'prop-types';

class InfoMessage extends Component {
  componentDidMount() {
  }
}

InfoMessage.propTypes = {
  id: PropTypes.number,
  text: PropTypes.string
};

export default InfoMessage;