import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter} from 'react-router-dom';
import CourseCertificate from 'js/components/CourseCertificate';

const props = {
  t: key => key,
  level: 0,
  levelMax: 0,
  url: ''
};

describe('CourseCertificate Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MemoryRouter initialEntries={['']}>
      <CourseCertificate {...props}/>
    </MemoryRouter>, div);
  });
});