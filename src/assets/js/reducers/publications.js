import Utils from 'js/utils/Utils';
import {
  PUBLICATIONS_GET_REQUEST,
  PUBLICATIONS_GET_SUCCESS,
  PUBLICATIONS_GET_FAIL,
  PUBLICATIONS_GET_ONE_REQUEST,
  PUBLICATIONS_GET_ONE_SUCCESS,
  PUBLICATIONS_GET_ONE_FAIL,
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
  PUBLICATIONS_GET_COURSES_INFO_REQUEST,
  PUBLICATIONS_GET_COURSES_INFO_SUCCESS,
  PUBLICATIONS_GET_COURSES_INFO_FAIL,
  PUBLICATIONS_GET_COURSE_GROUP_FAIL,
  PUBLICATIONS_GET_COURSE_GROUP_REQUEST,
  PUBLICATIONS_GET_COURSE_GROUP_SUCCESS,
} from 'js/constants/publications';

const initialState = {
  publications: {
    fetching: false,
    count: 0,
    items: {}
  },
  courses: {
    fetching: false,
    count: 0,
    items: {}
  },
  lessons: {
    fetching: false,
    count: 0,
    items: {}
  },
  courseGroups: {
    fetching: false,
    count: 0,
    items: {}
  },
  courseGroupsInfo: {
    fetching: false,
    count: 0,
    items: {}
  },
  courseUserGroups: {
    fetching: false,
    count: 0,
    items: {}
  },
  groupSchedules: {
    fetching: false,
    count: 0,
    items: {}
  },
  related: {
    fetching: false,
    count: 0,
    items: {}
  },
  courseClosestLesson: {
    fetching: false,
    count: 0,
    items: {}
  },
  userLessons: {
    fetching: false,
    count: 0,
    items: {}
  }
};

const publications = (state = initialState, action) => {
  switch (action.type) {
    case PUBLICATIONS_GET_COURSES_INFO_REQUEST:
      return {...state, courseGroupsInfo: {...state.courseGroupsInfo, fetching: true}};
    case PUBLICATIONS_GET_COURSES_INFO_SUCCESS:
      const courseGroupsInfoItems = {...state.courseGroupsInfo.items, ...Utils.normalize(action.payload.items, 'courseId')};
      return {
        ...state,
        courseGroupsInfo: {
          count: Object.keys(courseGroupsInfoItems).length,
          items: courseGroupsInfoItems,
          fetching: false
        }
      };
    case PUBLICATIONS_GET_COURSES_INFO_FAIL:
      return {...state, courseGroupsInfo: {...state.courseGroupsInfo, fetching: false}};

    case PUBLICATIONS_GET_USER_LESSONS_REQUEST:
      return {...state, userLessons: {...state.userLessons, fetching: true}};
    case PUBLICATIONS_GET_USER_LESSONS_SUCCESS:
      return {
        ...state,
        userLessons: {
          count: action.payload.count,
          items: Utils.normalize(action.payload.items),
          fetching: false
        }
      };
    case PUBLICATIONS_GET_USER_LESSONS_FAIL:
      return {...state, courses: {...state.course, fetching: false}};

    case PUBLICATIONS_GET_COURSE_CLOSEST_LESSON_REQUEST:
      return {...state, courseClosestLesson: {...state.courseClosestLesson, fetching: true}};
    case PUBLICATIONS_GET_COURSE_CLOSEST_LESSON_SUCCESS:
      const {items: courseClosestLessonItems} = state.courseClosestLesson;
      courseClosestLessonItems[(action.payload.group || {}).courseId] = {...action.payload};
      return {
        ...state,
        courseClosestLesson: {
          count: Object.keys(courseClosestLessonItems).length,
          items: courseClosestLessonItems,
          fetching: false
        }
      };
    case PUBLICATIONS_GET_COURSE_CLOSEST_LESSON_FAIL:
      return {...state, nearestCourseGroups: {...state.nearestCourseGroups, fetching: false}};

    case PUBLICATIONS_GET_REQUEST:
      return {...state, publications: {fetching: true}};
    case PUBLICATIONS_GET_SUCCESS:
      return {
        ...state,
        publications: {
          count: action.payload.count,
          items: Utils.normalize(action.payload.items),
          fetching: false
        }
      };
    case PUBLICATIONS_GET_FAIL:
      return {...state, publications: {...state.course, fetching: false}};

    case PUBLICATIONS_GET_RELATED_REQUEST:
      return {...state, related: {fetching: true}};
    case PUBLICATIONS_GET_RELATED_SUCCESS:
      return {
        ...state,
        related: {
          count: action.payload.count,
          items: Utils.normalize(action.payload.items.filter(item => item.id !== action.payload.publicationId)
            .slice(0, 3)),
          fetching: false
        }
      };
    case PUBLICATIONS_GET_RELATED_FAIL:
      return {...state, related: {...state.course, fetching: false}};

    case PUBLICATIONS_GET_ONE_REQUEST:
      return {...state};
    case PUBLICATIONS_GET_ONE_SUCCESS:
      const items = {...state.publications.items};
      items[action.payload.id] = action.payload;
      return {...state, publications: {...state.publications, items, fetching: false}};
    case PUBLICATIONS_GET_ONE_FAIL:
      return {...state, publications: {...state, fetching: false}};

    case PUBLICATIONS_GET_LESSONS_REQUEST:
      return {...state, lessons: {fetching: true}};
    case PUBLICATIONS_GET_LESSONS_SUCCESS:
      return {
        ...state,
        lessons: {
          count: action.payload.count,
          items: Utils.normalize(action.payload.items),
          fetching: false
        }
      };
    case PUBLICATIONS_GET_LESSONS_FAIL:
      return {...state, lessons: {...state.lessons, fetching: false}};

    case PUBLICATIONS_GET_COURSE_GROUPS_REQUEST:
      return {...state, courseGroups: {fetching: true}};
    case PUBLICATIONS_GET_COURSE_GROUPS_SUCCESS:
      return {
        ...state,
        courseGroups: {
          count: action.payload.count,
          items: Utils.normalize(action.payload.items),
          fetching: false
        }
      };
    case PUBLICATIONS_GET_COURSE_GROUPS_FAIL:
      return {...state, courseGroups: {...state.courseUserGroups, fetching: false}};

    case PUBLICATIONS_GET_USER_GROUPS_REQUEST:
      return {...state, courseUserGroups: {fetching: true}};
    case PUBLICATIONS_GET_USER_GROUPS_SUCCESS:
      return {
        ...state,
        courseUserGroups: {
          count: action.payload.count,
          items: Utils.normalize(action.payload.items),
          fetching: false
        }
      };
    case PUBLICATIONS_GET_USER_GROUPS_FAIL:
      return {...state, courseUserGroups: {...state.courseUserGroups, fetching: false}};

    case PUBLICATIONS_GET_COURSE_SCHEDULE_REQUEST:
      return {...state, groupSchedules: {...state.groupSchedules, fetching: true}};
    case PUBLICATIONS_GET_COURSE_SCHEDULE_SUCCESS:
      const groupSchedulesItems = {...state.groupSchedules.items, ...Utils.normalize(action.payload.items)};
      return {
        ...state,
        groupSchedules: {
          ...state.groupSchedules,
          count: Object.keys(groupSchedulesItems).length,
          items: groupSchedulesItems,
          fetching: false
        }
      };
    case PUBLICATIONS_GET_COURSE_SCHEDULE_FAIL:
      return {...state, groupSchedules: {...state.groupSchedules, fetching: false}};

    case PUBLICATIONS_GET_COURSE_GROUP_REQUEST:
      return {...state, courseGroups: {...state.courseGroups, fetching: true}};
    case PUBLICATIONS_GET_COURSE_GROUP_SUCCESS:
      const courseGroups = {...state.courseGroups.items, [action.payload.id]: action.payload};
      return {...state, courseGroups: { count: Object.keys(courseGroups).length, items: courseGroups, fetching: false}};
    case PUBLICATIONS_GET_COURSE_GROUP_FAIL:
      return {...state, courseGroups: {...state.courseUserGroups, fetching: false}};

    default:
      return state;
  }
};

export default publications;