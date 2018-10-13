import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {Link} from 'react-router-dom';
import Panel from 'js/components/Panel';
import FileModel from 'js/models/FileModel';
import {BadgeCurrency, BadgeRibbon} from 'js/components/Badge';
import styles from './styles.sass';

const AddButton = () => <div className="btn btn-primary btn-extra"><span
  className={classNames(styles.icon, styles.add)}/>ADD</div>;
const AddedButton = () => <div className="btn btn-primary btn-extra" disabled><span
  className={classNames(styles.icon, styles.added)}/>ADDED</div>;
const PremiumBadge = ({price}) => (price ? <BadgeCurrency/> : null);

PremiumBadge.propTypes = {
  price: PropTypes.number
};

const BadgeRibbonComponent = ({price}) => <BadgeRibbon direction={BadgeRibbon.direction.RIGHT}
  className={styles.ribbon}>{price} RMB</BadgeRibbon>;

BadgeRibbonComponent.propTypes = {
  price: PropTypes.number()
};

const Actions = (props) => {
  const {price, added} = props;

  if (added) {
    return <AddedButton {...props}/>;
  } else if (price) {
    return <BadgeRibbonComponent {...props}/>;
  }
  return <AddButton {...props}/>;
};

Actions.propTypes = {
  price: PropTypes.number,
  added: PropTypes.bool
};

const WordSet = props => (
  <div className="col-md-6">
    <Link to={`/words/word-sets/${props.id}`} className={styles.container}>
      <Panel type={Panel.type.ITEM} className={styles.panel} nobody={true}
        styles={{backgroundImage: new FileModel(props.img)}}>
        <div className={styles.header}>
          <h5 className="compact">{props.name}<span className={styles.premium}><PremiumBadge {...props}/></span></h5>
          <p className="small">15 words</p>
        </div>
        <div className={styles.content}>
          <Actions {...props}/>
        </div>
      </Panel>
    </Link>
  </div>
);

WordSet.propTypes = {
  name: PropTypes.string.isRequired,
  wordsCount: PropTypes.number,
  price: PropTypes.number,
  premium: PropTypes.bool,
  added: PropTypes.bool,
  img: PropTypes.object,
  id: PropTypes.number
};

WordSet.defaultProps = {
  free: true,
  premium: false,
  added: false,
  price: 0
};

export default WordSet;