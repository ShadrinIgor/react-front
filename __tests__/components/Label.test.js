import React from 'react';
import ReactDOM from 'react-dom';
import Label from 'js/components/Label';

describe('Label Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Label/>, div);
  });
});