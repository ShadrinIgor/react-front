
import 'jquery-ui/ui/widget';
import 'jquery-ui/ui/widgets/mouse';
import React from 'react';
import ReactDOM from 'react-dom';
import Slider from 'js/components/Slider';

describe('Slider Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Slider min={0} max={50} steps={5}/>, div);
  });
});