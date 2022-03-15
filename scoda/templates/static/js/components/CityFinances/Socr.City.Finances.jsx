import React from 'react'
import Sidebar_left from '../Sidebar_left'
import Subnav from '../Subnav'
import Stat_Panel from './City.Finances.Stat.Panel'
import Charts_dashboards from './Charts.City.Finances'

const subNavContent = {
    dropdownMenu: [ 
        {
          name: "Service Delivery", 
          href: "socr#/service-delivery", 
          active: false 
        },
        { 
          name: "Citizen Engagement", 
          href: "socr#/citizen-engagement", 
          active: false 
        }, 
        {
          name: "City Finances", 
          href: "socr#/city-finances", 
          active: true 
      }, 
      {
         name: "Human Resources", 
         href: "socr#/human-resources", 
         active: false 
      }
    ]
  }

const Socr_City_Finances = () => {
        return (
            <div className='sorc_dashboards'>
                <div className='spacer--top'></div>
                <Subnav name='State of Cities Reports' dropdownName='City Finances' dropDownItem={subNavContent} buttonText="Download as PNG" />
                <Sidebar_left />
                <div id='content'>
                <Stat_Panel/>
                <Charts_dashboards/>
                </div>
            </div>
        )
    }

export default Socr_City_Finances;