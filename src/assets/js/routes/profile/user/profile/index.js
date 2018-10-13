import {range} from 'underscore';
import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import Panel from 'js/components/Panel';
import Avatar from 'js/components/Avatar';
import styles from './styles.sass';

const Profile = ({user}) => {
  const badges = range(36);

  function renderBadge(data) {
    return (
      <div className={`col-xs-4 col-sm-3 col-md-2 ${styles.badge}`} key={data.index}>
        <div/>
      </div>
    );
  }

  function renderBadges() {
    return badges.map(index => renderBadge({index}));
  }

  return (
    <div className="container">
      <div className="row">
        <div className={`col-xs-12 ${styles.main}`}>
          <Panel type={Panel.type.SIMPLE}>

            <div className="row">
              <div className="col-xs-6 col-sm-8 col-md-8">
                <div className="row">
                  <div className="col-sm-3 col-md-3 col-lg-2">
                    <Avatar vip={true} sex={user.sex} avatar={user.avatar} size={Avatar.size.LG} avatarSource={user.avatarSource}/>
                  </div>
                  <div className="col-sm-9 col-md-9 col-lg-10">
                    <h2>{user.name || user.id}</h2>
                    <div className="row">
                      <div className="col-sm-6 col-md-4">
                        <div className="text-muted">Start learning</div>
                        <div>{user.signUpDatetime}</div>
                      </div>
                      <div className="col-sm-6 col-md-4">
                        <div className="text-muted">Studying</div>
                        <div>{user.durationOfTraining} minutes per day</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xs-6 col-sm-4 col-md-4 text-right">
                <NavLink to='/user/profile/settings' className='btn btn-default'>Edit</NavLink>
              </div>
            </div>

          </Panel>
        </div>
      </div>

      <div className="row">
        <div className="col-xs-12">
          <Panel type={Panel.type.SIMPLE}>
            <div className={styles.badges}>
              <span>{badges.length}</span> badges
            </div>
            <div>
              {renderBadges()}
            </div>
          </Panel>
        </div>
      </div>

    </div>
  );
};

Profile.propTypes = {
  user: PropTypes.object
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default translate(['profile'], {wait: true})(connect(mapStateToProps)(Profile));
