import React from 'react';
import styles from './styles.sass';

const People = () => (
  <div className={styles.container}>
    <div className="container">
      <div className="row">
        <div className="col-xs-8 col-xs-offset-2">
          <div className={styles.people}/>
        </div>
      </div>
    </div>
  </div>
);

export default People;