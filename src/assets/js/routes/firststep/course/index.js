import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Panel from 'js/components/Panel';
import * as _uiActions from 'js/actions/ui';
import * as _userActions from 'js/actions/user';
import styles from './styles.sass';

class ChooseTypeOfCourse extends Component {
  componentDidMount() {
    this.props.uiActions.renderSubHeader();
  }

  processData() {
    const {user, userActions} = this.props;
    const {updateUserFields} = userActions;

    updateUserFields(user.id, {
      registrationStep: 8
    });
  }

  skip(e) {
    e.preventDefault();

    this.processData();
  }

  chooseCourse(e) {
    e.preventDefault();

    //  TODO: implement some action
  }

  render() {
    return (
      <div className="container">
        <div className={classNames('row', styles.header)}>
          <div className="col-md-8">
            <h3>Chose type of courses you are interested in:</h3>
          </div>
          <div className="col-md-4">
            <Link to="" className="btn btn-default" onClick={::this.skip}>Skip</Link>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <Link to="" className={classNames(styles.course, styles.individual)} onClick={::this.chooseCourse}>
              <Panel type={Panel.type.ITEM}>
                <div className={styles.cover}/>
                <h4>Enroll to individual course</h4>
                <p>You can leave request and we will make a special cource for you</p>
              </Panel>
            </Link>
          </div>
          <div className="col-md-4">
            <Link to="/courses" className={classNames(styles.course, styles.group)} onClick={::this.chooseCourse}>
              <Panel type={Panel.type.ITEM}>
                <div className={styles.cover}/>
                <h4>Group courses</h4>
                <p>Catalogue with different group courses </p>
              </Panel>
            </Link>
          </div>
          <div className="col-md-4">
            <Link to="" className={classNames(styles.course, styles.teacher)} onClick={::this.chooseCourse}>
              <Panel type={Panel.type.ITEM}>
                <div className={styles.cover}/>
                <h4>Virtual teacher</h4>
                <p>Our test section of studying with virtual teacher</p>
              </Panel>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

ChooseTypeOfCourse.propTypes = {
  user: PropTypes.object,
  uiActions: PropTypes.object,
  userActions: PropTypes.object
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    uiActions: bindActionCreators(_uiActions, dispatch),
    userActions: bindActionCreators(_userActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseTypeOfCourse);