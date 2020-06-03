import React from 'react';
import { HashRouter, Route, hashHistory } from 'react-router-dom';

import Home from './components/Home';
import Hero from './components/Hero';
import Preview_block from './components/Preview_block';
import CTA_block from './components/CTA_block';
import CTA_block_analysis from './components/CTA_block_analysis';
import CTA_block_insights from './components/CTA_block_insights';
import Footer from './components/Footer';
import Sub_Footer from './components/Sub_Footer';
import Hero_collapsable from './components/Hero_collapsable';
import Navigation_scoda from './components/Navigation_scoda';
import About from './components/About';


import Hero_Collapsable from './components/Hero.Collapsible';
import DataStoriesDetails from './components/DataStoriesDetails';
import DataStories from './components/DataStories';
import IndicatorExplorer from './components/IndicatorExplorer';
import TabsAndFilters from './components/TabsAndFilters'
import DemographicModeller from './components/DemographicModeller';

const _heroTitle = 'Data Management System';
const _heroContent = ' Central to activities on this platform is the Data Management System, where our evidence base is securely housed. We use the CKAN data portal framework, the same system used by various governments around the world, to store, manage, and share data across the SCODA ecosystem. From this dynamic, version-controlled and API-responsive data-store, we can efficiently gather and process the myriad sources required for insight generation.Central to activities on this platform is the Data Management System, where our evidence base is securely housed. We use the CKAN data portal framework, the same system used by various governments around the world, to store, manage, and share data across the SCODA ecosystem. From this dynamic, version-controlled and API-responsive data-store, we can efficiently gather and process the myriad sources required for insight generation.';
const _heroInfoTitle = 'Evidence Tools';
const _heroPrimaryColor = '#F05252';
const _heroSecondaryColor = '#F64343';


const _tabs = [
  {
      name: 'SACN', mode:'active'
  },
  {
      name: 'eThekwini', mode: 'none'
  },
  {
      name: 'Three', mode: 'none'
  }
]

// import more components
export default (
    <HashRouter history={hashHistory}>
       <Route exact path="/hero_collapsible" component={()=> <Hero_Collapsable title={_heroTitle} 
            content={_heroContent} 
            infoTitle={_heroInfoTitle}
            primaryColor={_heroPrimaryColor} 
            secondaryColor={_heroSecondaryColor}/>}/>
      <Route exact path="/hero" component={()=> <Hero title={_heroTitle} 
            content={_heroContent} 
            infoTitle={_heroInfoTitle}
            primaryColor={_heroPrimaryColor} 
            secondaryColor={_heroSecondaryColor}/>}/>
      <Route exact path="/data-stories-details" component={()=>
            <DataStoriesDetails />} />
      <Route exact path="/data-story" component={()=> <DataStories />} />
      <Route exact path="/indicator-explorer" component={()=> <IndicatorExplorer />}/>
      <Route exact path="/tabs-and-filters" component={()=><TabsAndFilters tabs={_tabs}/>} />
      <Route exact path="/demographic-modeller" component={()=><DemographicModeller />} />
      <Route path='/preview-block' component={Preview_block} />
      <Route path='/cta-block' component={CTA_block} />
      <Route path='/sub-footer' component={Sub_Footer} />
      <Route path='/footer' component={Footer} />
      
      <Route path='/home' component={Navigation_scoda} />
      <Route path='/home' component={Hero} />
      <Route path='/home' component={Preview_block} />
      <Route path='/home' component={CTA_block} />
      <Route path='/home' component={CTA_block_analysis} />
      <Route path='/home' component={CTA_block_insights} />
      <Route path='/home' component={Sub_Footer} />
      <Route path='/home' component={Footer} />

      <Route path='/about-us' component={Navigation_scoda} />
      <Route path='/about-us' component={About} />
      <Route path='/about-us' component={Sub_Footer} />
      <Route path='/about-us' component={Footer} />
    </HashRouter>
);