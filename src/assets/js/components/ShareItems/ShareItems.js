import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {Link} from 'react-router-dom';
import styles from './styles.sass';

const ShareItems = props => (
  <div>
    {props.items.map((item, index) => <Link key={index} to={props.link} target="_blank"
      className={classNames(styles.item, styles[item])}/>)}
  </div>
);

ShareItems.type = {
  ALIPAY: 'alipay',
  QQ: 'qq',
  RENREN: 'renren',
  WEIBO: 'weibo',
  WECHAT: 'wechat'
};

ShareItems.propTypes = {
  link: PropTypes.string.isRequired(),
  items: PropTypes.array
};

ShareItems.defaultProps = {
  items: Object.values(ShareItems.type)
};

export default ShareItems;