import 'core-js/es6/map';
import 'core-js/es6/set';
import React from 'react';
import ReactDOM from 'react-dom';
import {BadgeCurrency, BadgeRibbon} from 'js/components/Badge';

describe('Badges Component', () => {
  describe('BadgeRibbon Component', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<BadgeRibbon/>, div);
    });
  });

  describe('BadgeCurrency Component', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<BadgeCurrency/>, div);
    });
  });
});