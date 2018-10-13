import {sortBy} from 'underscore';
import {
  LOCATIONS_GET_CITIES_FAIL,
  LOCATIONS_GET_CITIES_REQUEST,
  LOCATIONS_GET_CITIES_SUCCESS,
  LOCATIONS_GET_COUNTRIES_FAIL,
  LOCATIONS_GET_COUNTRIES_REQUEST,
  LOCATIONS_GET_COUNTRIES_SUCCESS,
  LOCATIONS_GET_REGIONS_FAIL,
  LOCATIONS_GET_REGIONS_REQUEST,
  LOCATIONS_GET_REGIONS_SUCCESS
} from 'js/constants/locations';

const initialState = {
  countries: {
    fetching: false,
    count: 0,
    items: []
  },
  regions: {
    fetching: false,
    count: 0,
    items: []
  },
  cities: {
    fetching: false,
    count: 0,
    items: []
  }
};

const locations = (state = initialState, action) => {
  switch (action.type) {
    case LOCATIONS_GET_COUNTRIES_REQUEST:
      return {...state, countries: {...state.countries, fetching: true}};
    case LOCATIONS_GET_COUNTRIES_SUCCESS:
      const countriesItems = sortBy(action.payload.items.map(item => ({
        value: item.id,
        title: item.name
      })), 'title');
      return {...state, countries: {...action.payload, items: countriesItems, fetching: false}};
    case LOCATIONS_GET_COUNTRIES_FAIL:
      return {...state, countries: {...state.payload, fetching: false}};

    case LOCATIONS_GET_REGIONS_REQUEST:
      return {...state, regions: {...state.regions, fetching: true}};
    case LOCATIONS_GET_REGIONS_SUCCESS:
      const regionsItems = sortBy(action.payload.items.map(item => ({
        value: item.id,
        title: item.name
      })), 'title');
      return {...state, regions: {...action.payload, items: regionsItems, fetching: false}};
    case LOCATIONS_GET_REGIONS_FAIL:
      return {...state, regions: {...state.regions, fetching: false}};

    case LOCATIONS_GET_CITIES_REQUEST:
      return {...state, cities: {...state.cities, fetching: true}};
    case LOCATIONS_GET_CITIES_SUCCESS:
      const citiesItems = sortBy(action.payload.items.map(item => ({
        value: item.id,
        title: item.name
      })), 'title');
      return {...state, cities: {...action.payload, items: citiesItems, fetching: false}};
    case LOCATIONS_GET_CITIES_FAIL:
      return {...state, cities: {...state.cities, fetching: false}};

    default:
      return state;
  }
};

export default locations;