import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter} from 'react-router-dom';
import CourseHeader from 'js/components/CourseHeader';

describe('CourseHeader Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MemoryRouter initialEntries={['/courses/2']}>
        <CourseHeader t={key => key} publication={{}}/>
      </MemoryRouter>
      , div
    );
  });
});