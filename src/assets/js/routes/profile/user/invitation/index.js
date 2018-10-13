import React from 'react';
import {NavLink} from 'react-router-dom';
import Panel from 'js/components/Panel';
import Avatar from 'js/components/Avatar';
import ContainerWithSidebar from 'js/containers/ContainerWithSidebar';
import ShareItems from 'js/components/ShareItems';
import styles from './styles.sass';

const ContentLeft = () => (
  <div>
    <Panel type={Panel.type.ITEM}>
      <div className={styles['list-item']}>
        <div className={styles.avatar}>
          <Avatar size={Avatar.size.MD}/>
        </div>
        <div className={styles.user}>
          <div>Сергей Александров</div>
        </div>
        <div className={styles.actions}>
          <NavLink to="" className="btn btn-primary">Invite to VIP</NavLink>
        </div>
      </div>
    </Panel>
    <Panel type={Panel.type.ITEM}>
      <div className={styles['list-item']}>
        <div className={styles.avatar}>
          <Avatar size={Avatar.size.MD} vip={true}/>
        </div>
        <div className={styles.user}>
          <div>Иван Петров</div>
        </div>
      </div>
    </Panel>
    <Panel type={Panel.type.ITEM}>
      <div className={styles['list-item']}>
        <div className={styles.avatar}>
          <Avatar sex={1} size={Avatar.size.MD}/>
        </div>
        <div className={styles.user}>
          <div>Галина Иванова</div>
        </div>
        <div className={styles.actions}>
          <div className={`${styles.icon} ${styles['icon-yes']}`}/>
          invitation is send
        </div>
      </div>
    </Panel>
  </div>
);

const ContentRight = () => (
  <div className={styles.status}>
    <Panel type={Panel.type.SIMPLE} className="text-center">

      <div className={styles.note}>Free service use</div>
      <NavLink to="./status" className="btn btn-warning">You are VIP</NavLink>

    </Panel>
  </div>
);

const Invitation = () => (
  <div className="container">
    <div className="row">
      <div className={`col-xs-12 ${styles.main}`}>
        <div className="row">
          <div className="col-xs-12">

            <h4>Invite your friends and use the system for free</h4>
            <Panel type={Panel.type.SIMPLE}>
              <div className="row">
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-sm-6">
                      <h5>2 days of VIP status</h5>
                      <div>for every invited person</div>
                    </div>
                    <div className="col-sm-6">
                      <h5>2 weeks of VIP status</h5>
                      <div>for every person, who bought VIP</div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-12">
                      <div className={styles.socials}>
                        <ShareItems link="http://google.com"/>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className={styles.cover}/>
                </div>
              </div>

            </Panel>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12">
            <h4>Already use through your mediation</h4>
            <ContainerWithSidebar contentLeft={<ContentLeft/>} contentRight={<ContentRight/>}
              useContainerWrapper={false}/>
          </div>

        </div>
      </div>
    </div>

  </div>
);

export default Invitation;