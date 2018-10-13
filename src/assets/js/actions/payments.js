import HTTPService from 'js/services/HTTPService';
import {
  PAYMENTS_GET_PAYSYSTEMS_REQUEST,
  PAYMENTS_GET_PAYSYSTEMS_SUCCESS,
  PAYMENTS_GET_PAYSYSTEMS_FAIL,
  PAYMENTS_CREATE_INVOICE_REQUEST,
  PAYMENTS_CREATE_INVOICE_SUCCESS,
  PAYMENTS_CREATE_INVOICE_FAIL,
  PAYMENTS_GET_PAYMENT_URL_REQUEST,
  PAYMENTS_GET_PAYMENT_URL_REQUEST_FAIL,
  PAYMENTS_GET_INVOICE_REQUEST,
  PAYMENTS_GET_INVOICE_SUCCESS,
  PAYMENTS_GET_INVOICE_FAIL
} from 'js/constants/payments';
import AuthUtil from 'js/utils/AuthUtil';
import ActionUtil from 'js/utils/ActionUtil';

export function getPaySystems() {
  return (dispatch) => {
    dispatch({
      type: PAYMENTS_GET_PAYSYSTEMS_REQUEST
    });

    return HTTPService('GET', '/paysystems')
      .set({Authorization: AuthUtil.hasAuthCookie()})
      .ok(response => ActionUtil.processError(dispatch, PAYMENTS_GET_PAYSYSTEMS_FAIL, response))
      .end((error, response) => {
        if (error) return;

        const {data: payload} = response.body;

        dispatch({
          type: PAYMENTS_GET_PAYSYSTEMS_SUCCESS,
          payload
        });
      });
  };
}

export function createInvoice(contentId) {
  if (!contentId) throw new Error('Need to set contentId for invoice creation method');
  return (dispatch) => {
    dispatch({
      type: PAYMENTS_CREATE_INVOICE_REQUEST
    });
    return HTTPService('POST', '/invoice')
      .send({
        contentType: 1,
        contentId
      })
      .set({Authorization: AuthUtil.hasAuthCookie()})
      .ok(response => ActionUtil.processError(dispatch, PAYMENTS_CREATE_INVOICE_FAIL, response))
      .end((error, response) => {
        if (error) return;
        const {data: payload} = response.body;
        payload.contentId = contentId;
        dispatch({
          type: PAYMENTS_CREATE_INVOICE_SUCCESS,
          payload
        });
      });
  };
}

export function getPaymentUrl(invoiceId, paysystemId) {
  if (!invoiceId || !paysystemId) throw new Error('Need to set invoiceId/paysystemId for getting payment url');
  return (dispatch) => {
    dispatch({
      type: PAYMENTS_GET_PAYMENT_URL_REQUEST
    });
    return HTTPService('POST', '/paysystems/pay')
      .send({
        invoiceId,
        paysystemId
      })
      .set({Authorization: AuthUtil.hasAuthCookie()})
      .ok(response => ActionUtil.processError(dispatch, PAYMENTS_GET_PAYMENT_URL_REQUEST_FAIL, response))
      .end((error, response) => {
        if (error) return;
        const {data: payload} = response.body;
        if (payload.redirectUrl) window.location.href = payload.redirectUrl;
      });
  };
}

export function getInvoice(invoiceId) {
  if (!invoiceId) throw new Error('Need to set invoiceId to get it');
  return (dispatch) => {
    dispatch({
      type: PAYMENTS_GET_INVOICE_REQUEST
    });
    return HTTPService('GET', `/invoice/${invoiceId}`)
      .set({Authorization: AuthUtil.hasAuthCookie()})
      .ok(response => ActionUtil.processError(dispatch, PAYMENTS_GET_INVOICE_FAIL, response))
      .end((error, response) => {
        if (error) return;
        const {data: payload} = response.body;
        dispatch({
          type: PAYMENTS_GET_INVOICE_SUCCESS,
          payload
        });
      });
  };
}

export function lintPlaceholder() {
}