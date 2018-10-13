import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Panel from 'js/components/Panel';
// import WordSet from 'js/components/WordSet';
import CurrentThemeInfo from 'js/components/CurrentThemeInfo';

const WordSets = () => (
  <div>
    <Panel key="word-sets-banner" close={true}>
      <h4 className="compact">Chose a word set you want to learn</h4>
      <p className="small text-muted">In free mode you can learn maximum 100 words. <Link to="#">Details</Link></p>
    </Panel>

    <CurrentThemeInfo name="Title will be here" description="Description will be were." sets={99} words={999} premium={true}/>

    <div className="row">
      {/** {props.wordSets.items.map((item, index) => <WordSet key={index} {...item} premium={true}/>)} */}
    </div>

  </div>
);

WordSets.propTypes = {
  wordSets: PropTypes.object
};

function mapStateToProps(state) {
  return {
    wordSets: state.dictionary.wordSets
  };
}

export default connect(mapStateToProps)(withRouter(WordSets));