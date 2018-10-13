import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CourseNews from 'js/components/CourseNews';

Enzyme.configure({ adapter: new Adapter() });

const items = [{}, {}, {}, {}];

describe('CourseNews Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<CourseNews items={items}/>, div);
  });


  describe('render', () => {
    it('should render items', () => {
      const comp = shallow(<CourseNews items={items}/>);

      expect(comp.children().length).toBe(items.length);
    });
  });
});