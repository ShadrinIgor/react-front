import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import Panel from 'js/components/Panel';
import Label from 'js/components/Label';
import Spinner from 'js/components/Spinner';

const RenderThemes = ({types}) => {
  const {items, fetching} = types;

  const header = <div className="list-group-item list-group-item-separator"/>;

  if (fetching && !items.length) {
    return (
      <div>
        {header}
        <Spinner size={Spinner.size.SM}/>
      </div>
    );
  } else if (!fetching && !items.length) {
    return null;
  }
  return (
    <div>
      {header}
      {items.map((item, index) => (
        <NavLink key={index} exact to={{
          pathname: `/words/new-sets/${item.id}`,
          state: {theme: item.id}
        }} className="list-group-item list-group-item-nav">{item.name}</NavLink>
      ))}
    </div>
  );
};

RenderThemes.propTypes = {
  types: PropTypes.object
};

const WordsFilter = ({dictionary}) => (
  <Panel type={Panel.type.CONTAINER}>
    <div className="list-group">
      <NavLink exact to={{
        pathname: '/words/new-sets',
        state: {theme: 'all'}
      }} className="list-group-item list-group-item-nav">All word sets</NavLink>
      <NavLink exact to={{
        pathname: '/words/new-sets/premium',
        state: {theme: 'premium'}
      }} className="list-group-item list-group-item-nav">Premium materials <Label type={Label.type.SUCCESS}>New</Label></NavLink>

      <RenderThemes types={dictionary.themes}/>
    </div>
  </Panel>
);

WordsFilter.propTypes = {
  dictionary: PropTypes.object,
  list: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  })).isRequired
};

function mapStateToProps(state) {
  return {
    dictionary: state.dictionary
  };
}

export default connect(mapStateToProps)(WordsFilter);