import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import classNames from 'classnames';
import moment from 'moment';
import Panel from 'js/components/Panel';
import Label from 'js/components/Label';
import styles from './styles.sass';

const LessonScheduleItem = (props) => {
  const m = moment(props.date, 'YYYY-MM-DD HH:mm', 'en');

  return (
    <div className="col-xs-12">
      <Panel type={Panel.type.ITEM} nobody={true} className={styles.item}>
        <div className="container-table">
          {props.date && <div className={styles.date}>
            <h6 className="compact">{m.format('D MMM')}</h6>
            <p className="text-muted">{m.format('HH:mm a')}</p>
          </div>}
          <div className={styles.content}>
            <h5 className="compact">
              {props.exam && <span className={classNames(styles.icon, styles.exam)}/>}
              {props.title}
            </h5>
            <div>
              {props.completed &&
              <Label type={Label.type.INFO} round={true}><span className={classNames(styles.icon, styles.done)}/>Completed</Label>}
              {props.missed &&
              <Label type={Label.type.INFO} round={true}><span className={classNames(styles.icon, styles.warning)}/>Missed</Label>}
              {props.booked &&
              <Label type={Label.type.INFO} round={true}><span className={classNames(styles.icon, styles.done)}/>Booked</Label>}
              {!props.booked && <Label type={Label.type.INFO} round={true}><span
                className={classNames(styles.icon, styles.done, styles.muted)}/>Not booked</Label>}
            </div>
            {props.homework &&
            <div className={styles.homework}>
              <span className={classNames('text-muted', styles.title)}><span
                className={classNames(styles.icon, styles.book)}/> Homework:</span>
              <Label type={Label.type.SUCCESS} extended={true} round={true}>Due in 2 days</Label>
              <Label type={Label.type.INFO} round={true}>Completed</Label>
            </div>
            }
          </div>
          {!props.booked &&
          <div className={styles.actions}>
            {props.personal ?
              <NavLink to="#" className="btn btn-gray">Book personal lesson</NavLink>
              :
              <NavLink to="#" className="btn btn-warning">Book lesson</NavLink>
            }
          </div>
          }
          {/** <<div className={styles.menu}>
           ActionsMenu actions={actionsMenu}/>
           </div> */}
        </div>
      </Panel>
    </div>
  );
};

LessonScheduleItem.propTypes = {
  date: PropTypes.string, // 2017-07-09 10:06:19
  title: PropTypes.string,
  completed: PropTypes.bool,
  booked: PropTypes.bool,
  missed: PropTypes.bool,
  upcoming: PropTypes.bool,
  homework: PropTypes.object,
  exam: PropTypes.bool,
  personal: PropTypes.bool
};

LessonScheduleItem.defaultProps = {};

export default LessonScheduleItem;