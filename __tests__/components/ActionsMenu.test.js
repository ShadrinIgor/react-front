import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ActionsMenu from 'js/components/ActionsMenu';

Enzyme.configure({ adapter: new Adapter() });

const actions = [{
  title: 'Add',
  action: 'add'
}, {
  title: 'Remove',
  action: 'remove'
}];

describe('ActionsMenu Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ActionsMenu/>, div);
  });

  describe('render', () => {
    it('should render the menu', () => {
      const comp = shallow(<ActionsMenu actions={actions}/>);

      comp.find('.dropdown-toggle').simulate('click');

      expect(comp.find('.dropdown-menu > li').length).toBe(actions.length);
    });
  });
});