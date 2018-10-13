import React from 'react';
import Panel from 'js/components/Panel/index';
import Label from 'js/components/Label/index';

const LabelsPreview = () => (
  <Panel heading="Labels">
    <div className="row">
      <div className="col-xs-12">
        <Label type={Label.type.DEFAULT}>Default</Label>
        <Label type={Label.type.PRIMARY}>Primary</Label>
        <Label type={Label.type.SUCCESS}>Success</Label>
        <Label type={Label.type.INFO}>Info</Label>
        <Label type={Label.type.WARNING}>Warning</Label>
        <Label type={Label.type.DANGER}>Danger</Label>
        <br/><br/>
      </div>
    </div>
    <div className="row">
      <div className="col-xs-12">
        <Label type={Label.type.SUCCESS}>NEW</Label>
        <Label type={Label.type.WARNING}>VIP</Label>
        <Label type={Label.type.DEFAULT}>On hold</Label>
        <br/><br/>
      </div>
    </div>
    <div className="row">
      <div className="col-xs-12">
        <Label round={true} type={Label.type.WARNING} extended={true}>Overdue</Label>
        <Label round={true} type={Label.type.SUCCESS} extended={true}>Overdue in 2 days</Label>
        <Label round={true} type={Label.type.DEFAULT}>Completed</Label>
        <Label round={true} type={Label.type.DEFAULT}>Missed</Label>
        <Label round={true} type={Label.type.DEFAULT}>Not booked</Label>
        <Label round={true} type={Label.type.DEFAULT}>Booked</Label>
      </div>
    </div>
  </Panel>
);

export default LabelsPreview;