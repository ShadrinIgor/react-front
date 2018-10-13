import React from 'react';
import HeaderLanding from 'js/components/Header/HeaderLanding';
import Footer from 'js/components/Footer';
import Main from './main/Main';
import Counter from './counter/Conter';
import Benefits from './benefits/Benefits';
import People from './people/People';

const LandingPage = () => (
  <div>
    <HeaderLanding/>
    <Main/>
    <Counter/>
    <Benefits/>
    <People/>
    <Footer style="blue"/>
  </div>
);

export default LandingPage;
