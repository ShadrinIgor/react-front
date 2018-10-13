import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {translate} from 'react-i18next';
import i18n from 'i18next';
import currencyFormatter from 'currency-formatter';
import LocaleUtil from 'js/utils/LocaleUtil';

/**
 * http://trigeminal.fmsinc.com/samples/setlocalesample2.asp
 *
 * Chinese - Simplified (2052): ¥1,234.56
 * English - United Kingdom (2057): £1,234.56
 * Russian (1049): 1 234,56р.
 */

@translate(['common'], {wait: true})
class Price extends PureComponent {
  render() {
    const {t, price} = this.props;
    if (!price) return <span>{t('common:free')}</span>;

    const currency = currencyFormatter.format(price, {
      locale: LocaleUtil.mapLocaleForMoment(i18n.language)[0],
      symbol: t('common:currency.rmb')
    });

    return <span>{currency}</span>;
  }
}

Price.propTypes = {
  t: PropTypes.func,
  price: PropTypes.number.isRequired
};

Price.defaultPtops = {
  price: 0
};

export default Price;