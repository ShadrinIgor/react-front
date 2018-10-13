import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {translate} from 'react-i18next';
import Panel from 'js/components/Panel';
import VacanciesItem from 'js/components/VacanciesItem';
import styles from './styles.sass';

const renderVacanciesList = list => list.map((value, index) => <VacanciesItem key={index} {...{id: index, ...value}}/>);

const Vacancies = ({t}) => {
  const list = t('vacancies:vacancies', {returnObjects: true});

  return (
    <div className="container">
      <Panel type={Panel.type.CONTAINER} nobody={true}>
        <div className={styles.header}>
          <div>
            <h1>{t('common:footer:vacancies')}</h1>
          </div>
        </div>
        <div className={styles.content}>
          {list.length > 0 ? (
            <div className={cx(['panel-group', styles.vacancies])} id="accordion" role="tablist">
              {renderVacanciesList(list)}
            </div>
          ) : (
            <div className="text-center">
              <h4>{t('vacancies:noVacancies')}</h4>
            </div>
          )}
        </div>
      </Panel>
    </div>
  );
};

Vacancies.propTypes = {
  t: PropTypes.func
};

export default translate(['common', 'vacancies'], {wait: true})(Vacancies);