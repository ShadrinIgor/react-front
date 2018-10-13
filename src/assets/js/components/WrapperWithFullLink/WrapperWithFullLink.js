import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {translate} from 'react-i18next';
import styles from './styles.sass';

@translate(['courses'], {wait: true})
class WrapperWithFullLink extends PureComponent {
  constructor() {
    super();
    this.state = {needMoreLink: false, showMore: false};
  }

  showFullInformation() {
    this.setState({...this.state, showMore: true});
  }

  componentDidMount() {
    const bockHeight = $(this[this.props.id]).height();
    if (bockHeight > this.props.height) {
      this.setState({...this.state, needMoreLink: true});
    }
  }

  render() {
    const {id, t} = this.props;

    return (
      <div>
        <div ref={(c) => {
          this[id] = c;
        }} className={this.state.needMoreLink && !this.state.showMore ? styles.smallBlock : ''}>
          {this.props.children}
        </div>
        {this.state.needMoreLink && !this.state.showMore && <div className={styles.showFull}>
          <div className={styles.showFullBG}></div>
          <h6 className={styles.showFullTitle} onClick={() => this.showFullInformation()}>{t('courses:about.showFullInformation')}</h6>
        </div>}
      </div>
    );
  }
}

WrapperWithFullLink.propTypes = {
  height: PropTypes.number,
  id: PropTypes.string,
  children: PropTypes.object,
  t: PropTypes.func
};

export default WrapperWithFullLink;