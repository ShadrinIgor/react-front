import request from 'superagent';
import {
  FILES_CREATE_SLOT_FAIL,
  FILES_CREATE_SLOT_REQUEST,
  FILES_CREATE_SLOT_SUCCESS,
  FILES_UPLOAD_FAIL,
  FILES_UPLOAD_PROGRESS,
  FILES_UPLOAD_REQUEST,
  FILES_UPLOAD_SUCCESS
} from 'js/constants/files';
import ActionUtil from 'js/utils/ActionUtil';
import AuthUtil from 'js/utils/AuthUtil';

function uploadToUrl({
  uuid, payload, dispatch, uploadUrl, file
}) {
  dispatch({
    type: FILES_UPLOAD_REQUEST,
    uuid,
    payload: payload[0]
  });

  request
    .post(uploadUrl)
    .set({Authorization: AuthUtil.hasAuthCookie()})
    .field('file', file)
    .on('progress', (event) => {
      dispatch({
        type: FILES_UPLOAD_PROGRESS,
        uuid,
        payload: {progress: event.percent}
      });
    })
    .ok(response => ActionUtil.processError(dispatch, FILES_UPLOAD_FAIL, response))
    .end((error, response) => {
      if (error) {
        dispatch({
          type: FILES_UPLOAD_FAIL,
          uuid,
          payload: error
        });
      } else {
        const {body} = response;
        const {data} = body;

        dispatch({
          type: FILES_UPLOAD_SUCCESS,
          uuid,
          payload: data
        });
      }
    });
}

function createSlot({
  uuid, dispatch, domain, resource, field, file
}) {
  dispatch({
    type: FILES_CREATE_SLOT_REQUEST,
    uuid,
    payload: {domain, resource, field}
  });

  return request
    .post(`${CONFIG.apiURL}/files/${domain}`)
    .set({Authorization: AuthUtil.hasAuthCookie()})
    .send({
      resource,
      fields: [field]
    })
    .end((error, response) => {
      if (error) {
        dispatch({
          type: FILES_CREATE_SLOT_FAIL,
          uuid,
          payload: error
        });
      } else {
        const {body} = response;
        const {data: payload} = body;
        const {uploadUrl} = payload[0];

        dispatch({
          type: FILES_CREATE_SLOT_SUCCESS,
          uuid,
          payload: payload[0]
        });

        uploadToUrl({
          uuid, payload, dispatch, uploadUrl, file
        });
      }
    });
}

export function uploadFile(uuid, file, domain, resource, field) {
  return (dispatch) => {
    createSlot({
      uuid, dispatch, domain, resource, field, file
    });
  };
}

export function remove() {
  return (dispatch) => {
    dispatch({
      type: 'FILES_DELETE_TEST'
    });
  };
}