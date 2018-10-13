import React from 'react';
import ReactDOM from 'react-dom';
import Panel from 'js/components/Panel/index';

describe('Panel Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Panel/>, div);
  });

  describe('render', () => {
    it('render without crashing with heading', () => {
      const div = document.createElement('div');
      ReactDOM.render(<Panel heading="heading"/>, div);
    });

    it('render without crashing with footer', () => {
      const div = document.createElement('div');
      ReactDOM.render(<Panel footer="footer"/>, div);
    });

    it('render without crashing with nobody', () => {
      const div = document.createElement('div');
      ReactDOM.render(<Panel nobody={true}/>, div);
    });
  });
});