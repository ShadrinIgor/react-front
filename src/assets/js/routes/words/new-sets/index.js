import React from 'react';
import ContainerWithSidebar from 'js/containers/ContainerWithSidebar';
import WordsFilter from 'js/components/WordsFilter/WordsFilter';
import WordSets from '../containers/WordSets';

const NewSets = () => <ContainerWithSidebar contentLeft={<WordSets/>} contentRight={<WordsFilter/>}/>;

export default NewSets;