import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {translate} from 'react-i18next';
import Panel from 'js/components/Panel';
import PanelCut from 'js/components/PanelCut';
import VideoPlayer from 'js/components/VideoPlayer';
import {withLanguages, withTypesOfEnglish} from 'js/data';
import styles from './styles.sass';
import WrapperWithFullLink from '../WrapperWithFullLink';

@withTypesOfEnglish
@withLanguages
@translate(['courses'], {wait: true})
class CourseAbout extends PureComponent {
  getLanguageByCode(listLanguage, code) {
    let languageLabel;
    Object.keys(listLanguage).forEach((key) => {
      if (listLanguage[key].code === code) {
        languageLabel = listLanguage[key].label;
      }
    });
    return languageLabel;
  }

  render() {
    const {
      t,
      video,
      description,
      typeOfEnglish,
      typesOfEnglish,
      langCode,
      languages
    } = this.props;

    return (
      <PanelCut panelProps={{type: Panel.type.CONTAINER}} minHeight={542}>
        {(video && video.urls) && <div className={styles.video}><VideoPlayer src={video.urls.original}/></div>}
        <WrapperWithFullLink height={250} id={'description'}>
          {description && (
            <div className={styles.text}>
              {description}
              {langCode && <div><br/>{t('courses:about.courseLanguage')}: {this.getLanguageByCode(
                languages.items,
                langCode.toLowerCase()
              )}</div>}
              {(typeOfEnglish && langCode && typesOfEnglish.items[typeOfEnglish]) &&
              <p>{t('courses:about.englishType')}: {typesOfEnglish.items[typeOfEnglish].label}</p>}
            </div>
          )}
        </WrapperWithFullLink>
      </PanelCut>
    );
  }
}

CourseAbout.propTypes = {
  description: PropTypes.string.isRequired,
  video: PropTypes.shape({
    status: PropTypes.string,
    fileId: PropTypes.string,
    urls: PropTypes.array
  }),
  typeOfEnglish: PropTypes.string,
  typesOfEnglish: PropTypes.string,
  langCode: PropTypes.string,
  languages: PropTypes.string,
  t: PropTypes.func
};

export default CourseAbout;