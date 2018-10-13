import React from 'react';
import ReactDOM from 'react-dom';
import MarkDown from 'js/components/MarkDown';

const props = {
  html: <div>html content</div>
};

describe('MarkDown Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MarkDown {...props}/>, div);
  });
});