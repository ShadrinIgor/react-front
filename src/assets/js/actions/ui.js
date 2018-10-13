import moment from 'moment';
import i18n from 'i18next';
import LocaleUtil from 'js/utils/LocaleUtil';
import {UI_HEADER_TOGGLE, UI_SUBHEADER_RENDER, UI_SWITCH_LANGUAGE} from 'js/constants/ui';

export function toggleHeader(flag = true) {
  return (dispatch) => {
    dispatch({
      type: UI_HEADER_TOGGLE,
      payload: {showHeader: flag}
    });
  };
}

export function renderSubHeader(leftComponent = null, rightComponent = null) {
  return (dispatch) => {
    dispatch({
      type: UI_SUBHEADER_RENDER,
      payload: {subHeaderLeftComponent: leftComponent, subHeaderRightComponent: rightComponent}
    });
  };
}

export function switchLanguage(locale) {
  return (dispatch) => {
    const relativeTime = {
      s: i18n.t('common:moment.s'),
      m: i18n.t('common:moment.m'),
      h: i18n.t('common:moment.h'),
      d: i18n.t('common:moment.d'),
      M: i18n.t('common:moment.M'),
      y: i18n.t('common:moment.y'),
    };
    moment.locale(LocaleUtil.mapLocaleForMoment(locale), {relativeTime});

    dispatch({
      type: UI_SWITCH_LANGUAGE,
      payload: {locale}
    });
  };
}