import React from 'react';
import PropTypes from 'prop-types';
import {translate} from 'react-i18next';
import Panel from 'js/components/Panel';
import MarkDown from 'js/components/MarkDown';

const TermsOfUse = ({t}) => (
  <div className="container">
    <Panel heading={t('common:termsOfUse:title')} type={Panel.type.PAGE}>
      <MarkDown html={t('common:termsOfUse:content')}/>
    </Panel>
  </div>
);

TermsOfUse.propTypes = {
  t: PropTypes.func
};

export default translate(['common'], {wait: true})(TermsOfUse);