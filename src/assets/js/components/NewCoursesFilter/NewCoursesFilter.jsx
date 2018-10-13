import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {translate} from 'react-i18next';
import {englishLevelsType, typesOfEnglishType} from 'js/types';
import {languagesType, withEnglishLevels, withLanguages, withTypesOfEnglish} from 'js/data';
import Panel from 'js/components/Panel';
import FilterGroup from './FilterGroup';
import styles from './styles.sass';

@withEnglishLevels
@withTypesOfEnglish
@withLanguages
@translate(['common', 'courses'], {wait: true})
class NewCoursesFilter extends PureComponent {
  componentWillUpdate() {
    this.props.onUpdateCB();
  }

  render() {
    const {
      t, typesOfEnglish, englishLevels, languages
    } = this.props;
    return (
      <Panel type={Panel.type.CONTAINER} className={styles.noMarginBottom}>
        <div className="list-group">
          <FilterGroup
            data={{
              count: 1,
              fetching: false,
              items: {
                0: {label: t('common:allCourses')}
              }
            }}
            linkTitleField='label'
            linkPath={{}}
            separator={false}
            showAll={false}
          />
          <FilterGroup
            title={t('common:type')}
            data={typesOfEnglish}
            linkTitleField='label'
            filter='course.typeOfEnglish'/>
          <FilterGroup
            title={t('common:level')}
            data={englishLevels}
            linkTitleField='name'
            filter='course.levelId'/>
          <FilterGroup
            title={t('courses:courseLanguage')}
            data={languages}
            linkTitleField='label'
            filter='course.langCode'
            filterField={'code'}/>
        </div>
      </Panel>
    );
  }
}

NewCoursesFilter.propTypes = {
  typesOfEnglish: typesOfEnglishType,
  englishLevels: englishLevelsType,
  languages: languagesType,
  t: PropTypes.func,
  onUpdateCB: PropTypes.func
};

export default NewCoursesFilter;