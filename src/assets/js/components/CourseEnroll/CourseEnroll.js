import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Panel from 'js/components/Panel';
import styles from './styles.sass';

const CourseEnroll = props => (
  <Panel type={Panel.type.CONTAINER} nobody={true} className={styles.panel}>
    <div className="row">
      <div className="col-xs-12 col-sm-8">
        <h4 className="compact">{props.t('courses:enroll.title')}</h4>
        <h5>{props.t('courses:enroll.description')}</h5>
      </div>
      <div className="col-xs-12 col-sm-4 text-right">
        <Link className="btn btn-warning" to={props.enrollUrl}>{props.t('courses:enroll.buttonTitle')}</Link>
      </div>
    </div>
  </Panel>
);

CourseEnroll.propTypes = {
  enrollUrl: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired
};

CourseEnroll.defaultProps = {
  enrollUrl: '',
  t: key => key
};

export default CourseEnroll;