import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import Panel from 'js/components/Panel';
import Avatar from 'js/components/Avatar';
import styles from './styles.sass';

class Status extends Component {
  render() {
    const {user} = this.props;

    return (
      <div className="container">

        <div className={`row ${styles['container-status']}`}>
          <div className="col-md-4">
            <Panel type={Panel.type.SIMPLE} className={styles['panel-left']}>
              <div className="row">
                <div className="col-xs-8">
                  <h3>Free</h3>
                  <div className="text-muted">Your current status</div>
                </div>
                <div className="col-xs-4 text-right">
                  <Avatar size={Avatar.size.MD} sex={user.sex} avatar={user.avatar} avatarSource={user.avatarSource}/>
                </div>
              </div>
            </Panel>
          </div>
          <div className="col-md-8">
            <Panel type={Panel.type.SIMPLE} className={styles['panel-right']}>
              <h3>VIP</h3>
              <div className="text-muted">From 40 RMB for month</div>
              <br/>
              <div>
                <NavLink className="btn btn-warning" to="/buy/vip">Buy VIP</NavLink>
              </div>
              <div>
                <NavLink className="btn btn-default" to="/buy/vip/free">Become VIP for free</NavLink>
              </div>
            </Panel>
          </div>
        </div>

        <div className={`row ${styles['container-currency']}`}>
          <div className="col-xs-12 text-center">
            <Panel type={Panel.type.SIMPLE}>
              <span className={`${styles.icon} ${styles['icon-currency']}`}/>
              Экономия 40 % по сравнению с обучением в языковой школе или у репетитора
            </Panel>
          </div>
        </div>

        <div className={`row ${styles['container-compare']}`}>
          <div className="col-xs-12">
            <h4>Compare statuses</h4>
            <Panel type={Panel.type.SIMPLE} nobody={true}>

              <table className={`table table-striped ${styles.table}`}>
                <thead>
                  <tr>
                    <th className="col-xs-6">Features</th>
                    <th className="col-xs-3 text-center">Free</th>
                    <th className="col-xs-3 text-center"> VIP</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Доступ к медиатеке</th>
                    <th className="text-center">
                      <div className={`${styles.icon} ${styles['icon-yes']}`}/>
                    </th>
                    <th className="text-center">
                      <div className={`${styles.icon} ${styles['icon-yes']}`}/>
                    </th>
                  </tr>
                  <tr>
                    <th>Уникальная система повторения слов</th>
                    <th className="text-center">
                      <div className={`${styles.icon} ${styles['icon-yes']}`}/>
                    </th>
                    <th className="text-center">
                      <div className={`${styles.icon} ${styles['icon-yes']}`}/>
                    </th>
                  </tr>
                  <tr>
                    <th>Доступ к сложным темам по грамматике</th>
                    <th className="text-center">
                      <div className={`${styles.icon} ${styles['icon-no']}`}/>
                    </th>
                    <th className="text-center">
                      <div className={`${styles.icon} ${styles['icon-yes']}`}/>
                    </th>
                  </tr>
                  <tr>
                    <th>Тренировка восприятия на слух</th>
                    <th className="text-center">
                      <div className={`${styles.icon} ${styles['icon-no']}`}/>
                    </th>
                    <th className="text-center">
                      <div className={`${styles.icon} ${styles['icon-yes']}`}/>
                    </th>
                  </tr>
                  <tr>
                    <th>Неограниченное количество слов на тренировку</th>
                    <th className="text-center">
                      <div className={`${styles.icon} ${styles['icon-no']}`}/>
                    </th>
                    <th className="text-center">
                      <div className={`${styles.icon} ${styles['icon-yes']}`}/>
                    </th>
                  </tr>
                </tbody>
              </table>

            </Panel>
          </div>
        </div>

        <div className={`row ${styles['container-prices']}`}>
          <div className="col-md-4 text-center">
            <Panel type={Panel.type.SIMPLE} className={styles.panel}>
              <div className={styles['container-badge']}/>
              <h3 className={styles.title}>Expand by 3 months</h3>
              <h3 className={styles.price}>99 RMB</h3>
              <NavLink to="/buy/vip/3" className="btn btn-warning">Buy VIP</NavLink>
            </Panel>
          </div>
          <div className="col-md-4 text-center">
            <Panel type={Panel.type.SIMPLE} className={`${styles.panel} ${styles['panel-lg']}`}>
              <div className={styles['container-badge']}>
                <div className="badge badge-lg badge-info">Most popular</div>
              </div>
              <h3 className={styles.title}>Expand by 6 months</h3>
              <h2 className={styles.price}>199 RMB</h2>
              <NavLink to="/buy/vip/6" className="btn btn-warning">Buy VIP</NavLink>
            </Panel>
          </div>
          <div className="col-md-4 text-center">
            <Panel type={Panel.type.SIMPLE} className={styles.panel}>
              <div className={styles['container-badge']}>
                <div className="badge badge-lg badge-danger">Most cost-efficient</div>
              </div>
              <h3 className={styles.title}>Expand by 12 months</h3>
              <h3 className={styles.price}>299 RMB</h3>
              <NavLink to="/buy/vip/12" className="btn btn-warning">Buy VIP</NavLink>
            </Panel>
          </div>
        </div>

        <div className={`row ${styles['container-payment']}`}>
          <div className="col-xs-12 text-center">
            <Panel type={Panel.type.SIMPLE}>
              <ul className="list-inline">
                <li>
                  <div className={`${styles.icon} ${styles['icon-verisign']}`}/>
                </li>
                <li>
                  <div className={`${styles.icon} ${styles['icon-alipay']}`}/>
                </li>
                <li>
                  <div className={`${styles.icon} ${styles['icon-visa']}`}/>
                </li>
                <li>
                  <div className={`${styles.icon} ${styles['icon-unionpay']}`}/>
                </li>
              </ul>
              <NavLink to="/pages/return-policy">Return policy</NavLink>
            </Panel>
          </div>
        </div>

      </div>
    );
  }
}

Status.propTypes = {
  user: PropTypes.object
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(Status);
