import React from 'react';
import Panel from 'js/components/Panel/index';

const ButtonsPreview = () => (
  <Panel heading="Buttons">

    <div className="row">
      <div className="col-xs-12">
        <h5>Misc</h5>
        <div className="row">
          <div className="col-xs-12">
            <button className="btn btn-default">Normal</button>
            <button className="btn btn-primary">Normal</button>
            <button className="btn btn-success">Normal</button>
            <button className="btn btn-info">Normal</button>
            <button className="btn btn-warning">Normal</button>
            <button className="btn btn-danger">Normal</button>
            <button className="btn btn-gray">Normal</button>
            <div style={{backgroundColor: '#445469', padding: '2px 3px', display: 'inline-block'}}>
              <button className="btn btn-white">Normal</button>
            </div>
          </div>
        </div>
        <h5>Default button</h5>
        <div className="row">
          <div className="col-xs-12">
            <button className="btn btn-default">Normal</button>
            <button className="btn btn-default active">Active</button>
            <button className="btn btn-default disabled" disabled="disabled">Disabled</button>
          </div>
        </div>
        <h5>Primary button</h5>
        <div className="row">
          <div className="col-xs-12">
            <button className="btn btn-primary">Normal</button>
            <button className="btn btn-primary active">Active</button>
            <button className="btn btn-primary disabled" disabled="disabled">Disabled</button>
          </div>
        </div>
        <h5>Success button</h5>
        <div className="row">
          <div className="col-xs-12">
            <button className="btn btn-success">Normal</button>
            <button className="btn btn-success active">Active</button>
            <button className="btn btn-success disabled" disabled="disabled">Disabled</button>
          </div>
        </div>
        <h5>Info button</h5>
        <div className="row">
          <div className="col-xs-12">
            <button className="btn btn-info">Normal</button>
            <button className="btn btn-info active">Active</button>
            <button className="btn btn-info disabled" disabled="disabled">Disabled</button>
          </div>
        </div>
        <h5>Warning button</h5>
        <div className="row">
          <div className="col-xs-12">
            <button className="btn btn-warning">Normal</button>
            <button className="btn btn-warning active">Active</button>
            <button className="btn btn-warning disabled" disabled="disabled">Disabled</button>
          </div>
        </div>
        <h5>Danger button</h5>
        <div className="row">
          <div className="col-xs-12">
            <button className="btn btn-danger">Normal</button>
            <button className="btn btn-danger active">Active</button>
            <button className="btn btn-danger disabled" disabled="disabled">Disabled</button>
          </div>
        </div>
        <h5>Gray button</h5>
        <div className="row">
          <div className="col-xs-12">
            <button className="btn btn-gray">Normal</button>
            <button className="btn btn-gray active">Active</button>
            <button className="btn btn-gray disabled" disabled="disabled">Disabled</button>
          </div>
        </div>
        <h5>White button</h5>
        <div className="row" style={{backgroundColor: '#445469', padding: '2px 3px', display: 'inline-block'}}>
          <div className="col-xs-12">
            <button className="btn btn-white">Normal</button>
            <button className="btn btn-white active">Active</button>
            <button className="btn btn-white disabled" disabled="disabled">Disabled</button>
          </div>
        </div>
        <h5>Link button</h5>
        <div className="row">
          <div className="col-xs-12">
            <button className="btn btn-link">Normal</button>
            <button className="btn btn-link active">Active</button>
            <button className="btn btn-link disabled" disabled="disabled">Disabled</button>
          </div>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-xs-12">
        <h6>Extra (Primary)
          <button className="btn btn-primary btn-extra">Normal</button>
          <button className="btn btn-primary btn-extra active">Active</button>
          <button className="btn btn-primary btn-extra disabled" disabled="disabled">Disabled</button>
        </h6>
      </div>
    </div>
    <div className="row">
      <div className="col-xs-12">
        <p>
          <a className="btn btn-default" href="#" role="button">Link</a>
          <button className="btn btn-default" type="submit">Button</button>
          <input className="btn btn-default" type="button" value="Input"/>
          <input className="btn btn-default" type="submit" value="Submit"/>
        </p>
      </div>
    </div>
    <div className="row">
      <div className="col-xs-12">
        <p>
          <button className="btn btn-primary btn-lg" type="button">Large button</button>
          <button className="btn btn-default btn-lg" type="button">Large button</button>
        </p>
        <p>
          <button className="btn btn-primary" type="button">Default button</button>
          <button className="btn btn-default" type="button">Default button</button>
        </p>
        <p>
          <button className="btn btn-primary btn-sm" type="button">Small button</button>
          <button className="btn btn-default btn-sm" type="button">Small button</button>
        </p>
        <p>
          <button className="btn btn-primary btn-xs" type="button">Extra small button</button>
          <button className="btn btn-default btn-xs" type="button">Extra small button</button>
        </p>
      </div>
    </div>
    <div className="row">
      <div className="col-xs-12">
        <h2>Button groups</h2>
        <div className="row">
          <div className="col-xs-12">
            <div className="btn-group" role="group">
              <div className="btn btn-default">Label</div>
              <div className="btn btn-default active">Label</div>
              <div className="btn btn-default">Label</div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </Panel>
);

export default ButtonsPreview;