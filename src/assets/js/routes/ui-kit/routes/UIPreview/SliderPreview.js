import React from 'react';
import Panel from 'js/components/Panel/Panel';
import Slider from 'js/components/Slider';

const SliderPreview = () => (
  <Panel heading="Slider">
    <div className="row">
      <div className="col-xs-12">
        <Slider value={2} min={0} max={5} steps={6}/>
      </div>
    </div>
    <br/>
    <div className="row">
      <div className="col-xs-8">
        <Slider value={1} min={0} max={5} steps={6}/>
      </div>
      <div className="col-xs-4">
        <Slider value={3} min={0} max={5} steps={6}/>
      </div>
    </div>
  </Panel>
);

export default SliderPreview;