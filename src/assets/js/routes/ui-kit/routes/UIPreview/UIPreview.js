import React from 'react';
import SliderPreview from './SliderPreview';
import LabelsPreview from './LabelsPreview';
import TypographyPreview from './TypographyPreview';
import ButtonsPreview from './ButtonsPreview';
import SpinnerPreview from './SpinnerPreview';
// import PaymentsPreview from './PaymentsPreview';

const UIPreview = () => (
  <div>
    <div className="row">
      <div className="col-xs-12 text-center">
        <h2>UI Components and Styles</h2>
      </div>
    </div>

    <SpinnerPreview/>
    <TypographyPreview/>
    <SliderPreview/>
    <LabelsPreview/>
    <ButtonsPreview/>
    {/** <PaymentsPreview/> */}

    <div>
      <div className="checkbox">
        <label>
          <input type="checkbox" value="option1"/><span className="checkbox-icon"/><span className="text-muted small">checkbox</span>
        </label>
      </div>
    </div>

  </div>
);

export default UIPreview;