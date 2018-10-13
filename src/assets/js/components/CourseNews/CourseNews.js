import React from 'react';
import PropTypes from 'prop-types';
import Panel from 'js/components/Panel';
import CourseNewsItem from 'js/components/CourseNewsItem';

const CourseNews = props => (
  <Panel type={Panel.type.CONTAINER} nobody={true}>
    {props.items.map((item, index) => <CourseNewsItem key={index} {...item} />)}
  </Panel>
);

CourseNews.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired, // 2017-07-09 10:06:19
    type: PropTypes.string.isRequired,
  })).isRequired
};

export default CourseNews;