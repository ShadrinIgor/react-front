import React, {PureComponent} from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import FileModel from 'js/models/FileModel';
import Spinner from 'js/components/Spinner';
import styles from './styles.sass';

class VIPBadge extends PureComponent {
  render() {
    const {vip, size} = this.props;

    if (!vip) return null;

    return (
      <div className={styles.badge}>
        <div className={cx('badge', 'badge-warning', `badge-${size}`)}>VIP</div>
      </div>
    );
  }
}

VIPBadge.propTypes = {
  vip: PropTypes.bool.isRequired,
  size: PropTypes.string.isRequired,
};

class Avatar extends PureComponent {
  render() {
    const {
      size, sex, vip, avatar, avatarSource, fetching, className = ''
    } = this.props;

    let userImage;
    if (avatarSource && avatarSource.length) {
      userImage = avatarSource;
    } else {
      userImage = avatar ? new FileModel(avatar)[Avatar.sizeMap[size]] : null;
    }

    return (
      <div className={cx(styles['container-avatar'], styles[`size-${size.toLowerCase()}`], className)}>
        {fetching && <div className={styles.spinner}>
          <Spinner size={Spinner.size.SM}/>
        </div>}
        <div className={cx(styles.avatar, styles[`sex-${sex}`])} data-sex={sex} style={{
          backgroundImage: userImage ? `url(${userImage})` : ''
        }}/>
        <VIPBadge vip={vip} size={size.toLowerCase()}/>
      </div>
    );
  }
}

Avatar.sizeMap = {
  SM: '78x78',
  XSM: '78x78',
  MD: '78x78',
  LG: '78x78',
  ORIGIN: 'original'
};

Avatar.size = {
  SM: 'SM',
  XSM: 'XSM',
  MD: 'MD',
  LG: 'LG',
  ORIGIN: 'ORIGIN'
};

Avatar.propTypes = {
  avatar: PropTypes.object.isRequired,
  avatarSource: PropTypes.string, // TODO: hack for support intergation into old website version
  size: PropTypes.string,
  sex: PropTypes.number.isRequired,
  vip: PropTypes.bool,
  className: PropTypes.string,
  fetching: PropTypes.bool
};

Avatar.defaultProps = {
  size: Avatar.size.SM,
  sex: 0,
  vip: false,
  fetching: false
};

export default Avatar;