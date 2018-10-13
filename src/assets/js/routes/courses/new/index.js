import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {translate} from 'react-i18next';
import ContainerWithSidebar from 'js/containers/ContainerWithSidebar';
import FixingFilter from 'js/components/FixingFilter';
import NewCoursesList from './NewCoursesList';
import styles from './styles.sass';

@translate(['courses'], {wait: true})
class NewCourses extends PureComponent {
  render() {
    const {t} = this.props;

    return (
      <div className="container">
        <div className="clearfix">
          <div className={styles.arrowBack}>
            <a href={`${CONFIG.serverURL}/courses`} className={styles.arrowBackLink}></a>
          </div>
          <div className="pull-left">
            <h3 className="compact">{t('courses:new.title')}</h3>
          </div>
        </div>
        <ContainerWithSidebar useContainerWrapper={false}
          contentLeft={<div className="row"><NewCoursesList/></div>}
          contentRight={<FixingFilter/>}/>

      </div>
    );
  }
}

NewCourses.propTypes = {
  t: PropTypes.func
};

export default NewCourses;