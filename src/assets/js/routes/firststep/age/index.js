import {defer} from 'underscore';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import moment from 'moment';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as _userActions from 'js/actions/user';
import Dropdown from 'js/components/Dropdown';
import stylesGlobal from '../styles.sass';

class SetAge extends Component {
  getMonthsList = () => moment.monthsShort().map((item, index) => ({title: item, value: index}));

  constructor(props) {
    super(props);

    const {user} = this.props;

    this.state = {
      birthday: moment(moment(user.birthday).isValid() ? user.birthday : new Date()),
      date: moment(new Date()),
      formValid: false
    };
  }

  componentDidMount() {
    defer(::this.validateForm);
  }

  getYearsList() {
    const years = [];
    const year = this.state.date.year();

    for (let i = year; i > year - 100; i--) {
      years.push({title: i, value: i});
    }

    return years;
  }

  getDaysList() {
    const days = [];
    const daysInMonth = this.state.birthday.daysInMonth();

    for (let i = 1; i < daysInMonth + 1; i++) {
      days.push({title: i, value: i});
    }

    return days;
  }

  onChangeYear(item) {
    this.setState({
      birthday: this.state.birthday.year(item.value)
    });
  }

  onChangeMonth(item) {
    this.setState({
      birthday: this.state.birthday.month(item.value)
    });
  }

  onChangeDay(item) {
    this.setState({
      birthday: this.state.birthday.date(item.value)
    });
  }

  validateForm() {
    this.setState({
      formValid: this.state.birthday.isValid()
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const {user, userActions} = this.props;
    const {updateUserFields} = userActions;

    updateUserFields(user.id, {
      registrationStep: 4,
      birthday: this.state.birthday.format('YYYY-MM-DD HH:MM')
    });
  }

  render() {
    return (
      <div className={`container ${stylesGlobal['container-modal-blue']}`}>
        <h2>When was your born?</h2>
        <div className="row">
          <div className="col-sm-6 col-sm-offset-3 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4">

            <form method="post" className={stylesGlobal.form} onSubmit={::this.onSubmit}>
              <div className="row">

                <div className="col-sm-4">
                  <Dropdown placeholder="Year" options={::this.getYearsList()}
                    selectedValue={this.state.birthday.year()} onChange={::this.onChangeYear}/>
                </div>

                <div className="col-sm-4">
                  <Dropdown placeholder="Month" options={::this.getMonthsList()}
                    selectedValue={this.state.birthday.month()} onChange={::this.onChangeMonth}/>
                </div>

                <div className="col-sm-4">
                  <Dropdown placeholder="Day" options={::this.getDaysList()} selectedValue={this.state.birthday.date()}
                    onChange={::this.onChangeDay}/>
                </div>

              </div>
              <button type="submit" className={`btn ${stylesGlobal.btn} ${stylesGlobal['btn-extra']}`}
                disabled={!this.state.formValid}>Next
              </button>
            </form>

          </div>
        </div>
      </div>
    );
  }
}

SetAge.propTypes = {
  user: PropTypes.object,
  userActions: PropTypes.object
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(_userActions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SetAge));