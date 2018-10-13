import HTTPService from 'js/services/HTTPService';
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
import AuthUtil from 'js/utils/AuthUtil';
import ActionUtil from 'js/utils/ActionUtil';

export function getCountries() {
  return (dispatch) => {
    dispatch({
      type: LOCATIONS_GET_COUNTRIES_REQUEST
    });

    return HTTPService('GET', '/countries', ['Authorization'])
      .set({Authorization: AuthUtil.hasAuthCookie()})
      .ok(response => ActionUtil.processError(dispatch, LOCATIONS_GET_COUNTRIES_FAIL, response))
      .end((error, response) => {
        if (error) return;

        const {data: payload} = response.body;

        dispatch({
          type: LOCATIONS_GET_COUNTRIES_SUCCESS,
          payload
        });
      });
  };
}

export function getRegions(countryId) {
  return (dispatch) => {
    dispatch({
      type: LOCATIONS_GET_REGIONS_REQUEST
    });

    return HTTPService('GET', `/countries/${countryId}/regions`, {pruneHeaders: ['Authorization']})
      .set({Authorization: AuthUtil.hasAuthCookie()})
      .ok(response => ActionUtil.processError(dispatch, LOCATIONS_GET_REGIONS_FAIL, response))
      .end((error, response) => {
        if (error) return;

        const {data: payload} = response.body;

        dispatch({
          type: LOCATIONS_GET_REGIONS_SUCCESS,
          payload
        });
      });
  };
}

export function getCities(countryId, regionsId) {
  return (dispatch) => {
    dispatch({
      type: LOCATIONS_GET_CITIES_REQUEST
    });

    return HTTPService('GET', `/countries/${countryId}/regions/${regionsId}/cities`, {pruneHeaders: ['Authorization']})
      .set({Authorization: AuthUtil.hasAuthCookie()})
      .ok(response => ActionUtil.processError(dispatch, LOCATIONS_GET_CITIES_FAIL, response))
      .end((error, response) => {
        if (error) return;

        const {data: payload} = response.body;

        dispatch({
          type: LOCATIONS_GET_CITIES_SUCCESS,
          payload
        });
      });
  };
}

