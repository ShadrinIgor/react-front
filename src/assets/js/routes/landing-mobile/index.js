import React from 'react';
import Footer from 'js/components/Footer';
import HeaderLanding from 'js/components/Header/HeaderLanding';
import Main from './main/Main';
import Features from './features/Features';
import Benefits from './benefits/Benefits';

const LandingPage = () => (
  <div>
    <HeaderLanding registration={false}/>
    <Main/>
    <Features/>
    <Benefits/>
    <Footer style="blue"/>
  </div>
);

export default LandingPage;