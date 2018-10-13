import React from 'react';
import Panel from 'js/components/Panel';
import styles from './styles.sass';

const ColorsPreview = () => (
  <div>

    <div className="row">
      <div className="col-xs-12 text-center">
        <h2>Colors</h2>
      </div>
    </div>

    <Panel heading="Colors">
      <div className="container-fluid">
        <div className={`row ${styles['ui-kit-color-scheme']}`}>
          <div>
            <div className="col-sm-3">
              <div className="row">
                <div className="col-xs-12">
                  <div className="container-color color-primary">#347bd4</div>
                </div>
                <div className="container-fluid">
                  <div className="col-sm-6">
                    <div className="container-color color-primary-light">#3284ea</div>
                  </div>
                  <div className="col-sm-6">
                    <div className="container-color color-primary-dark">#2469bf</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="row">
                <div className="col-xs-12">
                  <div className="container-color color-success">#81bd00</div>
                </div>
                <div className="container-fluid">
                  <div className="col-sm-6">
                    <div className="container-color color-success-light">#8ac900</div>
                  </div>
                  <div className="col-sm-6">
                    <div className="container-color color-success-dark">#78b000</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="row">
                <div className="col-xs-12">
                  <div className="container-color color-info">#e4edf8</div>
                </div>
                <div className="container-fluid">
                  <div className="col-sm-6">
                    <div className="container-color color-info-light">#f2f7fc</div>
                  </div>
                  <div className="col-sm-6">
                    <div className="container-color color-info-dark">#d6e1ee</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="row">
                <div className="col-xs-12">
                  <div className="container-color color-warning">#ffcc33</div>
                </div>
                <div className="container-fluid">
                  <div className="col-sm-6">
                    <div className="container-color color-warning-light">#ffd35b</div>
                  </div>
                  <div className="col-sm-6">
                    <div className="container-color color-warning-dark">#fdbe14</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row ui-kit-color-scheme">
          <div>
            <div className="col-sm-2">
              <div className="container-color color-gray-base">100 black (#000000)</div>
            </div>
            <div className="col-sm-2">
              <div className="container-color color-gray-darker">30 black (#4d4d4d)</div>
            </div>
            <div className="col-sm-2">
              <div className="container-color color-gray-dark">50 black (#808080)</div>
            </div>
            <div className="col-sm-2">
              <div className="container-color color-gray">60 black (#999999)</div>
            </div>
            <div className="col-sm-2">
              <div className="container-color color-gray-light">80 black (#cccccc)</div>
            </div>
            <div className="col-sm-2">
              <div className="container-color color-gray-lighter">95 black (#f2f2f2)</div>
            </div>
          </div>
        </div>
      </div>
    </Panel>
  </div>
);

export default ColorsPreview;