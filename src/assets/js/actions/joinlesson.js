import HTTPService from 'js/services/HTTPService';
import {
  USER_JOIN_LESSON_REQUEST,
  USER_JOIN_LESSON_SUCCESS,
  USER_JOIN_LESSON_FAIL
} from 'js/constants/user';
import AuthUtil from 'js/utils/AuthUtil';
import ActionUtil from 'js/utils/ActionUtil';

export function joinLesson(groupId, lessonId) {
  if (!groupId || !lessonId) throw new Error('Need to set groupId/lessonId for getting payment url');
  return (dispatch) => {
    dispatch({
      type: USER_JOIN_LESSON_REQUEST
    });
    return HTTPService('POST', `/courses/groups/${groupId}/lessons/${lessonId}/join`)
      .send(JSON.stringify({}))
      .set({Authorization: AuthUtil.hasAuthCookie()})
      .ok(response => ActionUtil.processError(dispatch, USER_JOIN_LESSON_FAIL, response))
      .end((error, response) => {
        if (response && response.body.status === 200) {
          const {
            data: {url}
          } = response.body;
          const win = window.open(url, '_blank');
          win.focus();
          dispatch({
            type: USER_JOIN_LESSON_SUCCESS
          });
        } else {
          dispatch({
            type: USER_JOIN_LESSON_FAIL
          });
        }
      });
  };
}

export function forLint() {}