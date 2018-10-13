import React from 'react';
import PropTypes from 'prop-types';
import Panel from 'js/components/Panel';
import {translate} from 'react-i18next';
import MarkDown from 'js/components/MarkDown/MarkDown';
import styles from './styles.sass';

const AboutUs = ({t}) => (
  <div className="container">
    <Panel type={Panel.type.CONTAINER} nobody={true}>
      <div className={styles.header}>
        <div>
          <h1>{t('common:footer:about_us')}</h1>
        </div>
      </div>
      <div>
        <div className={styles.content}>
          <MarkDown html={t('pages:about.part_1')}/>
        </div>
        <div className={styles.images}>
          <div className={styles.left}/>
          <div className={styles.right}/>
        </div>
        <div className={styles.content}>
          <MarkDown html={t('pages:about.part_2')}/>
        </div>
      </div>
    </Panel>
  </div>
);

AboutUs.propTypes = {
  t: PropTypes.func
};

export default translate(['common', 'pages'], {wait: true})(AboutUs);