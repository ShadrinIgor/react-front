import React from 'react';
import Panel from 'js/components/Panel';
import WordSet from 'js/components/WordSet';

const wordSets = [
  {
    name: 'Word-set #1',
    added: true,
    price: 123
  }, {
    name: 'Word-set #2',
    price: 13
  }, {
    name: 'Word-set #3',
    added: true
  }, {
    name: 'Word-set #4'
  }, {
    name: 'Word-set #5'
  }
];

const WordSetsPreview = () => (
  <Panel heading="Word-sets">

    <div className="row">
      {wordSets.map((item, index) => <WordSet key={index} {...item}/>)}
    </div>

  </Panel>
);

export default WordSetsPreview;