import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import MarkDown from 'js/components/MarkDown';
import cx from 'classnames';
import styles from './styles.sass';

const VacanciesItem = props => (
  <div className={cx(['panel', styles.container])}>
    <div className={`panel-heading ${styles.heading}`} role="tab" id={`heading${props.id}`}>
      <h5 className="panel-title h">
        <NavLink className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion"
          to={`#collapse${props.id}`} aria-expanded="false" aria-controls={`collapse${props.id}`}>
          {props.title}
        </NavLink>
      </h5>
    </div>
    <div id={`collapse${props.id}`} className={`panel-collapse collapse`} role="tabpanel" aria-labelledby={`heading${props.id}`}>
      <div className={`panel-body ${styles.content}`}>
        <div className="row">
          <div className="col-md-9 markdown">
            <MarkDown html={props.text}/>
          </div>
        </div>
      </div>
    </div>
  </div>
);

VacanciesItem.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  text: PropTypes.string
};

export default VacanciesItem;