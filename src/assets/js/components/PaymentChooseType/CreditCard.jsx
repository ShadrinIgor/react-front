import React from 'react';
import Cleave from 'cleave.js/react';
import {Link} from 'react-router-dom';

const months = [...new Array(12).keys()];
const years = [...new Array(100).keys()];

const CreditCard = () => (
  <form>
    <div className="form-group">
      <div className="row">
        <div className="col-xs-6">
          <span className="small text-muted">Credit card number</span>
          <Cleave type="text" className="form-control" placeholder="Card number"
            options={{creditCard: true, onCreditCardTypeChanged: type => console.log(type)}}/>
        </div>
        <div className="col-xs-6">
          <div className="row">
            <div className="col-xs-9">
              <span className="small text-muted">Expiration (MM/YYYY)</span>
              <div className="row">
                <div className="col-xs-6">
                  <div className="dropdown">
                    <div className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                      <input type="text" className="form-control dropdown-toggle" placeholder=""/>
                    </div>
                    <ul className="dropdown-menu">
                      {months.map((item, index) => <li key={index}><a
                        href={`years/${item}`}>{item}</a></li>)}
                    </ul>
                  </div>
                </div>
                <div className="col-xs-6">
                  <div className="dropdown">
                    <div className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                      <input type="text" className="form-control dropdown-toggle" placeholder=""/>
                    </div>
                    <ul className="dropdown-menu">
                      {years.map((item, index) => <li key={index}><a
                        href={`years/${item}`}>{item}</a></li>)}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xs-3">
              <span className="small text-muted">CVC*</span>
              <Cleave type="text" className="form-control" placeholder="" options={{blocks: [3], delimiter: '', numericOnly: true}}/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="form-group">
      <div className="checkbox">
        <label>
          <input type="checkbox" value="1"/><span className="checkbox-icon"/><span className="text-muted small">Save my credit card for future purchase</span>
        </label>
      </div>
    </div>
    <div className="form-group">
      <Link to="" className="btn btn-warning">Enroll</Link>
    </div>
  </form>
);

export default CreditCard;