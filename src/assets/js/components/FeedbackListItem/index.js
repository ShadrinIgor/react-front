import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './style.sass';

const FeedbackListItem = props => (
  <div className="row">
    <div className={classNames(styles['container-cover'], 'col-xs-12', 'col-sm-4', 'col-md-2')}>
      <div className={styles.cover} style={{backgroundImage: props.cover ? `url('${props.cover}')` : ''}}/>
    </div>
    <div className={classNames(styles['container-content'], 'col-xs-12', 'col-sm-8', 'col-md-10')}>
      <p>{props.comment}</p>
      <h6>{props.author}</h6>
    </div>
  </div>
);

FeedbackListItem.propTypes = {
  comment: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  cover: PropTypes.string
};

export default FeedbackListItem;