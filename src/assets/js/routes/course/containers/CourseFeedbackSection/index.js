import React from 'react';
import PropTypes from 'prop-types';
import FeedbackListItems from 'js/components/FeedbackListItems';

const comments = [
  {
    author: 'author',
    comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam viverra, ex sit amet vehicula rhoncus, purus nisi ullamcorper mi, sed commodo mauris odio et neque. Nam id diam luctus, mollis lectus vitae, commodo velit. Praesent sodales, risus et vestibulum euismod, nunc nulla venenatis odio, ut aliquet tellus erat vitae ligula. Fusce fermentum ligula quis pharetra ornare. Aliquam at erat iaculis, hendrerit turpis non, fermentum nulla. Praesent purus ligula, suscipit id dignissim nec, ultricies sed risus. Etiam ipsum turpis, porttitor sed lobortis quis, placerat placerat libero. Proin est nunc, vehicula ut efficitur non, sagittis quis dolor. Donec a pulvinar est. Donec nec augue iaculis, auctor urna et, commodo purus. Quisque vulputate mattis eleifend. Sed consectetur aliquet enim, at dictum metus facilisis non. Aliquam lacinia non orci eu laoreet. Aenean interdum nisi eros, id pretium nisl rutrum nec. Aliquam quis gravida tellus.'
  }, {
    author: 'author',
    comment: 'comment'
  }
];

const CourseFeedbackSection = () => (
  <div>
    <h4>Feedback</h4>
    <FeedbackListItems comments={comments}/>
  </div>
);

CourseFeedbackSection.propTypes = {
  comments: PropTypes.array
};

export default CourseFeedbackSection;