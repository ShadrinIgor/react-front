import Utils from 'js/utils/Utils';
import {
  PAYMENTS_GET_PAYSYSTEMS_REQUEST,
  PAYMENTS_GET_PAYSYSTEMS_SUCCESS,
  PAYMENTS_GET_PAYSYSTEMS_FAIL,
  PAYMENTS_CREATE_INVOICE_REQUEST,
  PAYMENTS_CREATE_INVOICE_SUCCESS,
  PAYMENTS_CREATE_INVOICE_FAIL,
  PAYMENTS_GET_PAYMENT_URL_REQUEST,
  PAYMENTS_GET_PAYMENT_URL_REQUEST_SUCCESS,
  PAYMENTS_GET_PAYMENT_URL_REQUEST_FAIL,
  PAYMENTS_GET_INVOICE_REQUEST,
  PAYMENTS_GET_INVOICE_SUCCESS,
  PAYMENTS_GET_INVOICE_FAIL
} from 'js/constants/payments';

const initialState = {
  paySystems: {
    fetching: false,
    count: 0,
    items: {}
  },
  invoices: {
    fetching: false,
    count: 0,
    items: {}
  },
  paymentURLs: {
    fetching: false,
    count: 0,
    items: {}
  },
};

const payments = (state = initialState, action) => {
  switch (action.type) {
    case PAYMENTS_GET_PAYSYSTEMS_REQUEST:
      return {...state, paySystems: {fetching: true}};
    case PAYMENTS_GET_PAYSYSTEMS_SUCCESS:
      return {
        ...state,
        paySystems: {
          count: action.payload.count,
          items: Utils.normalize(action.payload.items, 'name'),
          fetching: false
        }
      };
    case PAYMENTS_GET_PAYSYSTEMS_FAIL:
      return {...state, paySystems: {...state.paySystems, fetching: false}};

    case PAYMENTS_GET_INVOICE_REQUEST:
    case PAYMENTS_CREATE_INVOICE_REQUEST:
      return {...state, invoices: {...state.invoices, fetching: true}};
    case PAYMENTS_GET_INVOICE_SUCCESS:
    case PAYMENTS_CREATE_INVOICE_SUCCESS:
      const invoices = {...state.invoices.items, [action.payload.contentId || action.payload.id]: action.payload};
      return {
        ...state,
        invoices: {
          fetching: false,
          count: Object.keys(invoices).length,
          items: invoices
        }
      };
    case PAYMENTS_GET_INVOICE_FAIL:
    case PAYMENTS_CREATE_INVOICE_FAIL:
      return {...state, invoices: {...state.invoices, fetching: true}};

    case PAYMENTS_GET_PAYMENT_URL_REQUEST:
      return {...state, paymentURLs: {...state.paymentURLs, fetching: true}};
    case PAYMENTS_GET_PAYMENT_URL_REQUEST_SUCCESS:
      const paymentURLs = {...state.paymentURLs, [action.payload.paysystemId]: action.payload};
      return {
        ...state,
        paymentURLs: {
          fetching: false,
          count: Object.keys(paymentURLs).length,
          url: paymentURLs
        }
      };
    case PAYMENTS_GET_PAYMENT_URL_REQUEST_FAIL:
      return {...state, paymentURLs: {...state.paymentURLs, fetching: true}};
    default:
      return state;
  }
};
export default payments;