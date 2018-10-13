import React from 'react';
import Panel from 'js/components/Panel/index';
import Spinner from 'js/components/Spinner/Spinner';

const SpinnerPreview = () => (
  <Panel heading="Spinner">
    <div className="row">
      <div className="col-md-3">
        <Spinner size={Spinner.size.LG}/>
      </div>
      <div className="col-md-3">
        <Spinner/>
      </div>
      <div className="col-md-3">
        <Spinner size={Spinner.size.SM}/>
      </div>
      <div className="col-md-3">
        <Spinner size={Spinner.size.XS}/>
      </div>
    </div>
  </Panel>
);

export default SpinnerPreview;