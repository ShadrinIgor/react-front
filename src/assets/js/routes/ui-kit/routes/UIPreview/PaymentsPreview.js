import React from 'react';
import PropTypes from 'prop-types';
import PaymentTypeItem from 'js/components/PaymentTypeItem';
import {PaymentChooseType} from 'js/components/PaymentChooseType';
import {translate} from 'react-i18next';

const PaymentsPreview = props => (
  <div>
    <div className="row">
      <div className="col-xs-12 text-center">
        <h2>Payments</h2>
      </div>
    </div>

    <div className="row">

      <div className="col-md-8 col-md-offset-2">

        <PaymentChooseType t={props.t} title="Full course" price={400} currency="RMB" cost={0} />

        <PaymentTypeItem title="Оплатить весь курс сразу" subtitle="Разовый платеж 400$" discount={20}
          cover="111" t={props.t}/>
        <PaymentTypeItem title="Оплатить половину курса" subtitle="2 платежа по 250$" discount={10}
          cover="111" t={props.t}/>
        <PaymentTypeItem title="Оплачивать по урокам"
          subtitle="Длинное описание. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet ornare diam, et suscipit leo. Nulla in metus finibus, aliquam elit eu."
          cover="11" t={props.t}/>
        <PaymentTypeItem title="Оплатить экзамен (без картинки)" subtitle="subtitle 4" t={props.t}/>

      </div>

    </div>
  </div>
);

PaymentsPreview.propTypes = {
  t: PropTypes.func
};

export default translate(['common', 'courses'], {await: true})(PaymentsPreview);