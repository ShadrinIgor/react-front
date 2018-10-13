import {findWhere} from 'underscore';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import classNames from 'classnames';
import styles from './styles.sass';

class Dropdown extends Component {
  refUl = null;
  refDropdown = null;

  constructor(props) {
    super(props);

    this.state = {
      selectedItem: {}
    };
  }

  onClick(e, item) {
    const {onChange} = this.props;

    e.preventDefault();

    if (onChange) {
      onChange(item);
    }
  }

  render() {
    const {
      options, placeholder, selectedValue, caretDark
    } = this.props;
    const disabled = !options.length;
    const selectedItem = findWhere(options, {value: selectedValue}) || {};

    return (
      <div className={classNames('form-group', styles.container, {disabled})}>
        {placeholder && <label className="control-label no-placeholder">{placeholder}</label>}
        <div className="dropdown" ref={(c) => { this.refDropdown = c; }}>
          <div className={classNames('dropdown-toggle', {disabled})} data-toggle="dropdown" aria-haspopup="true"
            aria-expanded="true">
            <input type="text" className="form-control dropdown-toggle" placeholder={placeholder} disabled
              value={selectedItem.title}/>
            <span className={classNames('caret', {'caret-dark': caretDark})}/>
          </div>
          {options.length > 0 &&
          <ul className="dropdown-menu" ref={(c) => { this.refUl = c; }}>
            {
              options.map((item, index) =>
                <li key={index} className={selectedValue === item.value ? 'active' : null}>
                  <NavLink to="#" onClick={(e) => {
                    ::this.onClick(e, item);
                  }}>{item.title}</NavLink>
                </li>)
            }
          </ul>
          }
        </div>
      </div>
    );
  }
}

Dropdown.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  selectedValue: PropTypes.any,
  options: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    value: PropTypes.array.isRequired,
  })).isRequired,
  caretDark: PropTypes.bool
};

Dropdown.defaultProps = {
  options: [],
  caretDark: false
};

export default Dropdown;