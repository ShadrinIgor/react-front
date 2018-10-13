import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './styles.sass';

const browsers = {
  chrome: {
    title: 'Google Chrome',
    version: 1.2
  },
  ie: {
    title: 'Internet explorer',
    version: 9
  },
  firefox: {
    title: 'Firefox',
    version: 1.2
  },
  safari: {
    title: 'Safari',
    version: 1.2
  }
};

const Browser = ({id, title, version}) => (
  <div className={styles.browser}>
    <div className={cx(styles.logo, styles[id])}/>
    <div>
      <div>{title}</div>
      <div className={styles.muted}>Ver {version}+</div>
    </div>
  </div>
);

Browser.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  version: PropTypes.number.isRequired,
};

class Check extends Component {
  render() {
    return (
      <div className={styles.container}>
        <div>
          <div className={styles.content}>
            <div className={styles.logo}/>
            <h2>Please upgrade you browser to use our platform</h2>
            <p className={styles.muted}>
              We build our platform using latest technology. It makes our platform faster and easier to use Infortunately
              your browser doesn’t support those technologies. Download one of these and youl be on your way:
            </p>
            <div className={styles.browsers}>
              {Object.keys(browsers).map(key => <Browser key={key} id={key} {...browsers[key]}/>)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Check;