import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link, NavLink} from 'react-router-dom';
import cx from 'classnames';
import FileModel from 'js/models/FileModel';
import styles from './styles.sass';

class CourseHeader extends Component {
  render() {
    const {t, publication = {}} = this.props;
    const {course = {}} = publication;

    if (!publication || !course) {
      return null;
    }

    return (
      <div className={styles.container} style={{backgroundImage: `url(${(new FileModel(course.header)).original})`}}>

        <div className="container">
          <div className="row">
            <div className={cx('col-xs-10', styles['back-block'])}>
              <NavLink to="/courses/new"><span className="text-muted">{t('common:back')}</span></NavLink>
            </div>
          </div>
          <div className={styles['text-block']}>
            <h1>{publication.title}</h1>
            <h4 className="text-muted">{course.description}</h4>
          </div>
          <div className={styles.actions}>
            <div className="pull-left dropdown">
              <div className="btn btn-info dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span className="icon icon_24 icon_24_done_gray"/>
                Enroll
                <span className="caret caret-dark"/>
              </div>
              <ul className="dropdown-menu list-group">
                <li className="list-group-item"><Link to="">Action</Link></li>
                <li className="list-group-item"><Link to="">Another action</Link></li>
                <li className="list-group-item"><Link to="">Something else here</Link></li>
              </ul>
            </div>
            {/** <Link to="#" className={cx('btn', 'btn-white', styles.mail)}><span
              className={cx('icon', 'icon_24_mail_white', styles['icon-mail'])}/> Ask a question</Link> */}
          </div>
        </div>

      </div>
    );
  }
}

CourseHeader.propTypes = {
  t: PropTypes.func.isRequired,
  publication: PropTypes.object.isRequired
};

export default CourseHeader;