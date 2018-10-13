import {pluck} from 'underscore';
import Utils from 'js/utils/Utils';
import HTTPService from 'js/services/HTTPService';
import {
  PUBLICATIONS_GET_REQUEST,
  PUBLICATIONS_GET_SUCCESS,
  PUBLICATIONS_GET_FAIL,
  PUBLICATIONS_GET_ONE_REQUEST,
  PUBLICATIONS_GET_ONE_FAIL,
  PUBLICATIONS_GET_ONE_SUCCESS,
  PUBLICATIONS_GET_LESSONS_REQUEST,
  PUBLICATIONS_GET_LESSONS_SUCCESS,
  PUBLICATIONS_GET_LESSONS_FAIL,
  PUBLICATIONS_GET_COURSE_GROUPS_REQUEST,
  PUBLICATIONS_GET_COURSE_GROUPS_FAIL,
  PUBLICATIONS_GET_COURSE_GROUPS_SUCCESS,
  PUBLICATIONS_GET_USER_GROUPS_REQUEST,
  PUBLICATIONS_GET_USER_GROUPS_FAIL,
  PUBLICATIONS_GET_USER_GROUPS_SUCCESS,
  PUBLICATIONS_GET_COURSE_SCHEDULE_REQUEST,
  PUBLICATIONS_GET_COURSE_SCHEDULE_FAIL,
  PUBLICATIONS_GET_COURSE_SCHEDULE_SUCCESS,
  PUBLICATIONS_GET_RELATED_REQUEST,
  PUBLICATIONS_GET_RELATED_SUCCESS,
  PUBLICATIONS_GET_RELATED_FAIL,
  PUBLICATIONS_GET_COURSE_CLOSEST_LESSON_REQUEST,
  PUBLICATIONS_GET_COURSE_CLOSEST_LESSON_FAIL,
  PUBLICATIONS_GET_COURSE_CLOSEST_LESSON_SUCCESS,
  PUBLICATIONS_GET_USER_LESSONS_REQUEST,
  PUBLICATIONS_GET_USER_LESSONS_SUCCESS,
  PUBLICATIONS_GET_USER_LESSONS_FAIL,
  PUBLICATIONS_GET_COURSE_GROUP_REQUEST,
  PUBLICATIONS_GET_COURSE_GROUP_SUCCESS,
  PUBLICATIONS_GET_COURSE_GROUP_FAIL,
  PUBLICATIONS_GET_COURSES_INFO_REQUEST,
  PUBLICATIONS_GET_COURSES_INFO_SUCCESS,
  PUBLICATIONS_GET_COURSES_INFO_FAIL
} from 'js/constants/publications';
import AuthUtil from 'js/utils/AuthUtil';
import ActionUtil from 'js/utils/ActionUtil';

export function getCourseClosestLesson(courseId) {
  return (dispatch) => {
    dispatch({
      type: PUBLICATIONS_GET_COURSE_CLOSEST_LESSON_REQUEST
    });

    return HTTPService('GET', `/courses/${courseId}/lessons/closest`)
      .set({Authorization: AuthUtil.hasAuthCookie()})
      .query({
        embed: 'group'
      })
      .ok(response => ActionUtil.processError(dispatch, PUBLICATIONS_GET_COURSE_CLOSEST_LESSON_FAIL, response))
      .end((error, response) => {
        if (error) return;

        const {data: payload} = response.body;

        dispatch({
          type: PUBLICATIONS_GET_COURSE_CLOSEST_LESSON_SUCCESS,
          payload
        });
      });
  };
}

export function getCoursesInfo(courseIds) {
  return (dispatch) => {
    dispatch({
      type: PUBLICATIONS_GET_COURSES_INFO_REQUEST
    });

    return HTTPService('GET', `/courses/batch/info`)
      .query({
        courseIds,
        ...Utils.queryFilter({
          status: 5,
          type: 'course'
        })
      })
      .set({Authorization: AuthUtil.hasAuthCookie()})
      .ok(response => ActionUtil.processError(dispatch, PUBLICATIONS_GET_COURSES_INFO_FAIL, response))
      .end((error, response) => {
        if (error) return;

        const {data: payload} = response.body;

        dispatch({
          type: PUBLICATIONS_GET_COURSES_INFO_SUCCESS,
          payload
        });
      });
  };
}

export function getPublications(filter) {
  return (dispatch) => {
    dispatch({
      type: PUBLICATIONS_GET_REQUEST
    });

    return HTTPService('GET', '/publications')
      .set({Authorization: AuthUtil.hasAuthCookie()})
      .query({
        embed: 'course',
        limit: 500,
        ...Utils.queryFilter({
          ...filter,
          status: 5,
          type: 'course'
        })
      })
      .ok(response => ActionUtil.processError(dispatch, PUBLICATIONS_GET_FAIL, response))
      .end((error, response) => {
        if (error) return;

        const {data: payload} = response.body;

        getCoursesInfo(pluck(payload.items, 'id').join())(dispatch);

        dispatch({
          type: PUBLICATIONS_GET_SUCCESS,
          payload
        });
      });
  };
}

export function getRelated(publicationId) {
  return (dispatch) => {
    dispatch({
      type: PUBLICATIONS_GET_RELATED_REQUEST
    });

    return HTTPService('GET', `/publications/${publicationId}/related`)
      .set({Authorization: AuthUtil.hasAuthCookie()})
      .query({
        embed: 'course',
        ...Utils.queryFilter({
          status: 5,
          type: 'course'
        })
      })
      .ok(response => ActionUtil.processError(dispatch, PUBLICATIONS_GET_RELATED_FAIL, response))
      .end((error, response) => {
        if (error) return;

        const {data: payload} = response.body;

        getCoursesInfo(payload.items.join(','))(dispatch);

        return HTTPService('GET', '/publications')
          .set({Authorization: AuthUtil.hasAuthCookie()})
          .query({
            embed: 'course',
            ...Utils.queryFilter({
              id: payload.items.join(','),
              status: 5,
              type: 'course'
            })
          })
          .ok(response2 => ActionUtil.processError(dispatch, PUBLICATIONS_GET_RELATED_FAIL, response2))
          .end((error2, response2) => {
            if (error2) return;

            const {data: payload2} = response2.body;

            dispatch({
              type: PUBLICATIONS_GET_RELATED_SUCCESS,
              payload: {
                ...payload2,
                publicationId
              }
            });
          });
      });
  };
}

export function getCourseUserGroups(userId, filter) {
  return (dispatch) => {
    dispatch({
      type: PUBLICATIONS_GET_USER_GROUPS_REQUEST
    });

    const filters = {
      finished: {
        state: 3
      },
      progress: {
        state: 2
      },
      enrolled: {
        state: 1
      }
    };

    return HTTPService('GET', `/users/${userId}/groups`)
      .query({
        isPublished: true,
        embed: 'publication,lessons',
        ...Utils.queryFilter({
          ...filters[filter]
        })
      })
      .set({Authorization: AuthUtil.hasAuthCookie()})
      .ok(response => ActionUtil.processError(dispatch, PUBLICATIONS_GET_USER_GROUPS_FAIL, response))
      .end((error, response) => {
        if (error) return;

        const {data: payload} = response.body;
        const groupIds = pluck(payload.items, 'courseId');

        if (groupIds.length) getCoursesInfo(groupIds.join())(dispatch);

        dispatch({
          type: PUBLICATIONS_GET_USER_GROUPS_SUCCESS,
          payload
        });
      });
  };
}

export function getCourseGroups(publicationId, filter) {
  return (dispatch) => {
    dispatch({
      type: PUBLICATIONS_GET_COURSE_GROUPS_REQUEST
    });

    return HTTPService('GET', `/courses/${publicationId}/groups`)
      .query({
        embed: 'teacher,teacher.user,lessons',
        ...Utils.queryFilter({
          ...filter,
          state: 1
        })
      })
      .set({Authorization: AuthUtil.hasAuthCookie()})
      .ok(response => ActionUtil.processError(dispatch, PUBLICATIONS_GET_COURSE_GROUPS_FAIL, response))
      .end((error, response) => {
        if (error) return;

        const {data: payload} = response.body;

        dispatch({
          type: PUBLICATIONS_GET_COURSE_GROUPS_SUCCESS,
          payload
        });
      });
  };
}

export function getPublication(publicationId) {
  return (dispatch) => {
    dispatch({
      type: PUBLICATIONS_GET_ONE_REQUEST
    });

    return HTTPService('GET', `/publications/${publicationId}`)
      .query({
        embed: 'course'
      })
      .set({Authorization: AuthUtil.hasAuthCookie()})
      .ok(response => ActionUtil.processError(dispatch, PUBLICATIONS_GET_ONE_FAIL, response))
      .end((error, response) => {
        if (error) return;

        const {data: payload} = response.body;

        dispatch({
          type: PUBLICATIONS_GET_ONE_SUCCESS,
          payload
        });
      });
  };
}

export function getLessons(publicationId) {
  return (dispatch) => {
    dispatch({
      type: PUBLICATIONS_GET_LESSONS_REQUEST
    });

    return HTTPService('GET', `/publications/${publicationId}/lessons`)
      .set({Authorization: AuthUtil.hasAuthCookie()})
      .ok(response => ActionUtil.processError(dispatch, PUBLICATIONS_GET_LESSONS_FAIL, response))
      .end((error, response) => {
        if (error) return;

        const {data: payload} = response.body;

        dispatch({
          type: PUBLICATIONS_GET_LESSONS_SUCCESS,
          payload
        });
      });
  };
}

export function getUserLessons(userId) {
  return (dispatch) => {
    dispatch({
      type: PUBLICATIONS_GET_USER_LESSONS_REQUEST
    });

    return HTTPService('GET', `/users/${userId}/lessons`)
      .query({
        limit: 10,
        embed: 'group_lesson,course',
        ...Utils.queryFilter({
          startTime: 'ASC'
        }, 'order'),
        ...Utils.queryFilter({
          status: '1,2,3',
        })
      })
      .set({Authorization: AuthUtil.hasAuthCookie()})
      .ok(response => ActionUtil.processError(dispatch, PUBLICATIONS_GET_USER_LESSONS_FAIL, response))
      .end((error, response) => {
        if (error) return;

        const {data: payload} = response.body;

        dispatch({
          type: PUBLICATIONS_GET_USER_LESSONS_SUCCESS,
          payload
        });
      });
  };
}

export function getGroupSchedules(groupId) {
  return (dispatch) => {
    dispatch({
      type: PUBLICATIONS_GET_COURSE_SCHEDULE_REQUEST
    });

    return HTTPService('GET', `/courses/groups/${groupId}/schedules`)
      .set({Authorization: AuthUtil.hasAuthCookie()})
      .ok(response => ActionUtil.processError(dispatch, PUBLICATIONS_GET_COURSE_SCHEDULE_FAIL, response))
      .end((error, response) => {
        if (error) return;

        const {data: payload} = response.body;

        dispatch({
          type: PUBLICATIONS_GET_COURSE_SCHEDULE_SUCCESS,
          payload
        });
      });
  };
}

export function getCourseGroup(groupId) {
  return (dispatch) => {
    dispatch({
      type: PUBLICATIONS_GET_COURSE_GROUP_REQUEST
    });
    return HTTPService('GET', `/courses/groups/${groupId}`)
      .query({
        embed: 'publication,teacher,teacher.user,lessons'
      })
      .set({Authorization: AuthUtil.hasAuthCookie()})
      .ok(response => ActionUtil.processError(dispatch, PUBLICATIONS_GET_COURSE_GROUP_FAIL, response))
      .end((error, response) => {
        if (error) return;
        const {data: payload} = response.body;
        dispatch({
          type: PUBLICATIONS_GET_COURSE_GROUP_SUCCESS,
          payload
        });
      });
  };
}
