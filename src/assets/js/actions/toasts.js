import {TOAST_ADD, TOAST_REMOVE, TOAST_REMOVE_ALL} from 'js/constants/toasts';

export const add = props => ({type: TOAST_ADD, payload: props});
export const remove = id => ({type: TOAST_REMOVE, payload: {id}});
export const removeAll = () => ({type: TOAST_REMOVE_ALL});