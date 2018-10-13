import {defer} from 'underscore';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as _userActions from 'js/actions/user';
import * as _locationsActions from 'js/actions/locations';
import Dropdown from 'js/components/Dropdown';
import stylesGlobal from '../styles.sass';

class InputLocation extends Component {
  constructor(props) {
    super(props);

    const {user} = this.props;

    this.state = {
      formValid: false,
      cityId: user.cityId,
      regionId: user.regionId,
      countryId: user.countryId
    };
  }

  componentDidMount() {
    const {locationsActions} = this.props;
    const {getCountries} = locationsActions;

    getCountries();

    defer(::this.validateForm);
  }

  onSubmit(e) {
    e.preventDefault();

    const {user, userActions} = this.props;
    const {updateUserFields} = userActions;

    updateUserFields(user.id, {
      registrationStep: 6,
      cityId: this.state.cityId,
      regionId: this.state.regionId,
      countryId: this.state.countryId
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

  validateForm() {
    this.setState({
      formValid: this.state.countryId && this.state.regionId && this.state.cityId
    });
  }

  render() {
    const {countries, regions, cities} = this.props.locations;

    return (
      <div className={`container ${stylesGlobal['container-modal-blue']}`}>
        <h2>Your location</h2>
        <div className="row">
          <div className="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3">
            <form method="post" onSubmit={this.onSubmit.bind(this)}>

              <div className="form-group ">
                <Dropdown placeholder="Chose country" options={countries.items} selectedValue={this.state.countryId}
                  onChange={::this.onChangeCountry}/>
              </div>

              <div className="form-group">
                <Dropdown placeholder="Chose region" options={regions.items} selectedValue={this.state.regionId}
                  onChange={::this.onChangeRegion}/>
              </div>

              <div className="form-group">
                <Dropdown placeholder="Chose city" options={cities.items} selectedValue={this.state.cityId}
                  onChange={::this.onChangeCity}/>
              </div>

              <button type="submit" className={`btn ${stylesGlobal.btn} ${stylesGlobal['btn-extra']}`}
                disabled={!this.state.formValid}>
                Finish profile
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

InputLocation.propTypes = {
  user: PropTypes.object,
  locations: PropTypes.object,
  userActions: PropTypes.object,
  locationsActions: PropTypes.object
};

function mapStateToProps(state) {
  return {
    user: state.user,
    locations: state.locations
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(_userActions, dispatch),
    locationsActions: bindActionCreators(_locationsActions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InputLocation));