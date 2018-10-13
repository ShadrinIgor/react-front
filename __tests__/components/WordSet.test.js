import React from 'react';
import ReactDOM from 'react-dom';
import WordSet from 'js/components/WordSet';
import {MemoryRouter} from 'react-router-dom';

describe('WordSet Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MemoryRouter initialEntries={['/users/2']}>
      <WordSet/>
    </MemoryRouter>, div);
  });
});