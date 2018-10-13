import React from 'react';
import ReactDOM from 'react-dom';
import CourseNewsItem from 'js/components/CourseNewsItem';

const props = {
  date: '',
  title: '',
  type: ''
};

describe('CourseNewsItem Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<CourseNewsItem {...props}/>, div);
  });
});