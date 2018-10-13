/* eslint-disable max-nested-callbacks */
import 'core-js/es6/map';
import 'core-js/es6/set';
import React from 'react';
import ReactDOM from 'react-dom';
import Spinner from 'js/components/Spinner';

describe('Spinner Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Spinner/>, div);
  });

  describe('render with different sizes', () => {
    const div = document.createElement('div');
    it('renders SM size', () => {
      ReactDOM.render(<Spinner size={Spinner.size.SM}/>, div);
    });
    it('renders XS size', () => {
      ReactDOM.render(<Spinner size={Spinner.size.XS}/>, div);
    });
    it('renders MD size', () => {
      ReactDOM.render(<Spinner size={Spinner.size.MD}/>, div);
    });
    it('renders LG size', () => {
      ReactDOM.render(<Spinner size={Spinner.size.LG}/>, div);
    });
  });

  describe('render with different styles', () => {
    const div = document.createElement('div');
    it('renders default style', () => {
      ReactDOM.render(<Spinner/>, div);
    });
    it('renders WHITE style', () => {
      ReactDOM.render(<Spinner style={Spinner.style.WHITE}/>, div);
    });
    it('renders BLUE style', () => {
      ReactDOM.render(<Spinner style={Spinner.style.BLUE}/>, div);
    });
  });
});