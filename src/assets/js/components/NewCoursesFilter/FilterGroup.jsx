import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {NavLink, withRouter} from 'react-router-dom';
import {translate} from 'react-i18next';
import Spinner from 'js/components/Spinner';
import FilterGroupHeader from 'js/components/NewCoursesFilter/FilterGroupHeader';
import styles from './styles.sass';

@translate(['common'], {wait: true})
@withRouter
class FilterGroup extends PureComponent {
  isActive(value) {
    const {
      filter, location: {state: {filter: stateFilter = {}} = {}}
    } = this.props;

    const stateFilters = Object.values(stateFilter).filter(k => k !== undefined);

    return (!filter && !stateFilters.length) || (filter && stateFilter[filter] === value);
  }

  render() {
    const {
      t, title, separator, filter, filterField, showAll, linkTitleField, data: {items, fetching, count}, location: {state: {filter: stateFilter} = {}}
    } = this.props;

    if (fetching && !count) {
      return (
        <div>
          <FilterGroupHeader title={title} separator={separator}/>
          <Spinner size={Spinner.size.SM}/>
        </div>
      );
    } else if (!fetching && !count) {
      return null;
    }

    const itemsArray = Object.keys(items).map(key => items[key]);

    if (showAll) {
      itemsArray.unshift({[linkTitleField]: t('common:all')});
    }

    return (
      <div>
        <FilterGroupHeader title={title} separator={separator}/>
        {itemsArray.map(item => <NavLink key={`${filter}${item.id}`} exact isActive={() => this.isActive(item[filterField])} to={{
          state: {
            filter: filter ? {...stateFilter, [filter]: item[filterField]} : {}
          }
        }} className={`list-group-item list-group-item-nav ${styles.rowHeight}`}>{item[linkTitleField]}</NavLink>)}
      </div>
    );
  }
}

FilterGroup.propTypes = {
  t: PropTypes.func,
  location: PropTypes.object,
  title: PropTypes.string,
  separator: PropTypes.bool,
  data: PropTypes.shape({
    fetching: PropTypes.bool.isRequired,
    count: PropTypes.number.isRequired,
    items: PropTypes.object.isRequired,
  }.isRequired),
  linkTitleField: PropTypes.string.isRequired,
  filter: PropTypes.string,
  filterField: PropTypes.string,
  showAll: PropTypes.bool,
};

FilterGroup.defaultProps = {
  separator: true,
  showAll: true,
  filterField: 'id'
};

export default FilterGroup;