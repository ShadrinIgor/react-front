import React from 'react';
import PropTypes from 'prop-types';
import {translate} from 'react-i18next';
import Panel from 'js/components/Panel';
import CourseEnroll from 'js/components/CourseEnroll';
import CourseStatistic from 'js/components/CourseStatistic';
import PlaceholderPanelNoDescription from 'js/components/PlaceholderPanelNoDescription';
import CourseSchedule from 'js/components/CourseSchedule';
import CourseAbout from 'js/components/CourseAbout';
import CourseCertificate from 'js/components/CourseCertificate';
import CourseTeachers from 'js/components/CourseTeachers/CourseTeachers';
import NewsListItem from 'js/components/NewsListItem';
import CourseNewsItems from 'js/components/CourseNews';
import {COURSE_TYPE_LESSON_MOVED_TO_NEW_TIME, COURSE_TYPE_NEW_TEACHER} from 'js/components/CourseNewsItem/constants';

const schedule = [
  {
    dayOfWeek: 1,
    startTime: '14:06:44'
  }, {
    dayOfWeek: 1,
    startTime: '13:06:19'
  }, {
    dayOfWeek: 4,
    startTime: '17:06:19'
  }
];

const teachers = [
  {
    title: 'Teacher #1',
    about: 'Morbi leo risus, porta ac consectetur ac, vestibulum at eros.',
    degree: 'degree 1'
  }, {
    title: 'Teacher #2',
    about: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Maecenas sed diam eget risus varius blandit sit amet non magna. Curabitur blandit tempus porttitor.',
    degree: 'degree 2'
  }, {
    title: 'Teacher #3',
    about: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur et.',
    degree: 'degree 3'
  }
];

const news = [
  {
    id: 1, title: 'You have new teacher for next year', date: '2010-03-12', type: COURSE_TYPE_NEW_TEACHER
  },
  {
    id: 2,
    title: 'Lesson (Sat 5, 02:00 pm) will be moved to new time (Sat 6, 02:00 pm)',
    date: '2010-03-12',
    type: COURSE_TYPE_LESSON_MOVED_TO_NEW_TIME
  }
];

const aboutText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc a pharetra eros. Proin euismod lorem in metus lobortis, eu blandit felis efficitur. Integer consectetur lacus tempus semper aliquam. Cras ultrices porttitor nibh, ut volutpat felis. Aliquam sollicitudin diam eget lectus facilisis venenatis. Ut egestas massa sit amet massa molestie, ac ornare purus tristique. Nunc nibh tellus, tempus id neque eu, sodales consequat eros. Maecenas semper imperdiet tellus, ac faucibus enim tempor sed. Morbi auctor velit vitae libero laoreet, id lobortis arcu vestibulum. \n\nIn vel orci nec mi mattis volutpat. Vivamus facilisis nibh imperdiet, volutpat orci sed, porta lorem. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin ipsum purus, varius eget mollis in, aliquam quis sapien. Aenean a nunc sit amet risus tristique elementum quis sed sem. Proin vitae nunc vel eros porta volutpat. Donec fringilla consectetur sollicitudin. Pellentesque in dui ultricies, finibus odio venenatis, varius erat. Donec mattis erat vitae est ornare placerat. Nunc mollis sagittis leo volutpat convallis. Nunc a viverra lorem. Donec porta facilisis justo, ut faucibus urna maximus vitae. Aliquam erat volutpat. Integer vehicula metus est, non feugiat ipsum imperdiet vel. Phasellus molestie interdum quam, a lacinia lacus porta eu. Duis malesuada hendrerit diam vel rhoncus.';

const CoursePreview = props => (
  <div>
    <div className="row">
      <div className="col-xs-12 text-center">
        <h2>Course</h2>
      </div>
    </div>

    <Panel nobody={true}>
      <CourseCertificate level="94" levelMax="100" url="/" t={props.t}/>
    </Panel>

    <CourseNewsItems items={news}/>
    <NewsListItem title="Title news" date="2017-06-07 10:06:19" id="1"/>

    <CourseAbout description={aboutText}/>
    <PlaceholderPanelNoDescription title="Placeholder panel title. Placeholder panel title!" link="#" buttonTitle="Button title"/>
    <CourseEnroll enrollUrl="#" t={props.t}/>

    <CourseSchedule startTime="2017-06-07 10:06:19" endTime="2017-07-09 10:06:19" totalSeats={12} availableSeats={4}
      schedule={schedule} t={props.t}/>

    <Panel nobody={true}>
      <CourseStatistic groups={2} lessons={50} level="Beginner" nextLesson="6 Sep"/>
    </Panel>

    <CourseTeachers title="Teachers" teachers={teachers}/>

  </div>
);

CoursePreview.propTypes = {
  t: PropTypes.func
};


export default translate(['courses'], {await: true})(CoursePreview);