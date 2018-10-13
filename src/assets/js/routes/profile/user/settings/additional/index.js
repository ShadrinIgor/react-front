import {defer} from 'underscore';
import moment from 'moment';
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {translate} from 'react-i18next';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as _userActions from 'js/actions/user';
import * as _locationsActions from 'js/actions/locations';
import Panel from 'js/components/Panel';
import Dropdown from 'js/components/Dropdown';
import styles from './styles.sass';

const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(_userActions, dispatch),
  locationsActions: bindActionCreators(_locationsActions, dispatch)
});

const mapStateToProps = state => ({
  user: state.user,
  locations: state.locations
});

@connect(mapStateToProps, mapDispatchToProps)
@translate(['common', 'profile'], {wait: true})
class SettingsAdditional extends PureComponent {
  getMonthsList = () => moment.monthsShort().map((item, index) => ({title: item, value: index}));

  constructor(props) {
    super(props);

    const {user} = this.props;

    this.state = {
      formEnabled: true,
      sex: user.sex,
      cityId: user.cityId,
      regionId: user.regionId,
      countryId: user.countryId,
      birthday: moment(moment(user.birthday).isValid() ? user.birthday : new Date()),
      date: moment(new Date())
    };
  }

  componentDidMount() {
    const {locationsActions} = this.props;
    const {getCountries, getRegions, getCities} = locationsActions;

    getCountries();
    if (this.state.countryId) getRegions(this.state.countryId);
    if (this.state.countryId && this.state.regionId) getCities(this.state.countryId, this.state.regionId);

    defer(::this.validateForm);
  }

  onChangeSex(e) {
    this.setState({sex: +e.currentTarget.value});
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

  onChangeCountry(item) {
    this.setState({
      countryId: item.value,
      regionId: null,
      cityId: null
    });

    const {locationsActions} = this.props;
    const {getRegions} = locationsActions;

    getRegions(item.value);
  }

  onChangeRegion(item) {
    this.setState({
      regionId: item.value,
      cityId: null
    });

    const {locationsActions} = this.props;
    const {getCities} = locationsActions;

    getCities(this.state.countryId, item.value);
  }

  onChangeCity(item) {
    this.setState({
      cityId: item.value,
    });
    defer(::this.validateForm);
  }

  onSubmit(e) {
    e.preventDefault();

    const {user, userActions} = this.props;
    const {updateUserFields} = userActions;

    updateUserFields(user.id, {
      birthday: this.state.birthday.format('YYYY-MM-DD HH:MM'),
      cityId: this.state.cityId,
      regionId: this.state.regionId,
      countryId: this.state.countryId,
      sex: this.state.sex
    });
  }

  validateForm() {
    this.setState({
      formValid: this.state.countryId && this.state.regionId && this.state.cityId && this.state.birthday.isValid()
    });
  }

  render() {
    const {t, locations = {}} = this.props;
    const {countries = [], regions = [], cities = []} = locations;

    return (
      <div>
        <h4 className="compact">{t('profile:settings.additional.title')}</h4>
        <Panel>

          <form className="form-horizontal" onSubmit={::this.onSubmit}>
            <fieldset disabled={!this.state.formEnabled}>

              <div className="form-group">
                <label className="col-sm-3 control-label">{t('common:dateOfBirth')}</label>
                <div className="col-sm-9 ">
                  <div className="row">

                    <div className={styles.age}>

                      <div className="col-sm-4">
                        <Dropdown caretDark={true} placeholder="Year" options={::this.getYearsList()}
                          selectedValue={this.state.birthday.year()} onChange={::this.onChangeYear}/>
                      </div>

                      <div className="col-sm-4">
                        <Dropdown caretDark={true} placeholder="Month" options={::this.getMonthsList()}
                          selectedValue={this.state.birthday.month()} onChange={::this.onChangeMonth}/>
                      </div>

                      <div className="col-sm-4">
                        <Dropdown caretDark={true} placeholder="Day" options={::this.getDaysList()}
                          selectedValue={this.state.birthday.date()} onChange={::this.onChangeDay}/>
                      </div>

                    </div>

                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="col-sm-3 control-label">{t('common:gender')}</label>
                <div className="col-sm-9">
                  <div>
                    <label className="radio-inline">
                      <input type="radio" name="sex" id="male" value={1} onChange={::this.onChangeSex}
                        checked={this.state.sex === 1}/>
                      <div className="radio"/>
                      {t('common:male')}
                    </label>
                    <label className="radio-inline">
                      <input type="radio" name="sex" id="female" value={2} onChange={::this.onChangeSex}
                        checked={this.state.sex === 2}/>
                      <div className="radio"/>
                      {t('common:female')}
                    </label>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="col-sm-3 control-label">{t('common:country')}</label>
                <div className="col-sm-9">
                  <Dropdown caretDark={true} placeholder={t('common:chooseCountry')} options={countries.items}
                    selectedValue={this.state.countryId} onChange={::this.onChangeCountry}/>
                </div>
              </div>

              <div className="form-group">
                <label className="col-sm-3 control-label">{t('common:region')}</label>
                <div className="col-sm-9">
                  <Dropdown caretDark={true} placeholder={t('common:chooseRegion')} options={regions.items}
                    selectedValue={this.state.regionId} onChange={::this.onChangeRegion}/>

                </div>
              </div>

              <div className="form-group">
                <label className="col-sm-3 control-label">{t('common:city')}</label>
                <div className="col-sm-9">
                  <Dropdown caretDark={true} placeholder={t('common:chooseCity')} options={cities.items}
                    selectedValue={this.state.cityId} onChange={::this.onChangeCity}/>
                </div>
              </div>

              <div className="form-group" style={{marginBottom: -8}}>
                <div className="col-xs-12">
                  <button type="submit" className="btn btn-primary"
                    disabled={!this.state.formValid}>{t('common:saveChanges')}</button>
                </div>
              </div>

            </fieldset>
          </form>

        </Panel>
      </div>
    );
  }
}

SettingsAdditional.propTypes = {
  user: PropTypes.object,
  locations: PropTypes.object,
  userActions: PropTypes.func,
  locationsActions: PropTypes.func,
  t: PropTypes.func
};

export default SettingsAdditional;
