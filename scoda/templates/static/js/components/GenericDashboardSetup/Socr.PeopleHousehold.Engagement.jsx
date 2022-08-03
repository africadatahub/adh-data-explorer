import React, { useEffect, useState, useContext } from 'react'
import Subnav from '../Subnav'
import { ChartGrid } from './ChartGrid'
import { peopleHouseholdColors, secondaryColors } from './helpers/helpers'
import { GenericStatsPanel } from './Organisms/GenericStatsPanel'
import { cityLabels } from './helpers/helpers'
import '../../../scss/components/PeopleHouseHold.scss'
import { populateChartGroup } from './data/api'
import { Modal, ModalBody, Spinner } from 'reactstrap'
import Sidebar_left from '../Sidebar_left'
import { SelectContext } from '../../context'

const PeopleHousehold = () => {

  const [chartGroup, setChartGroup] = useState([])
  const [originalValues, setOriginalValues] = useState([])
  const [selectOpen, setSelect] = useState(false)

  useEffect(() => {

    populateChartGroup(
      setChartGroup,
      dashboardProps.indicator_ids, // this array determines the number of charts generated on your grid
      dashboardProps.minYear, dashboardProps.maxYear, //year min max
      peopleHouseholdColors, //color presets
      setOriginalValues
    )
  }, [dashboardProps])

  const subNavContent = {
    dropdownMenu: [
      {
        name: "Service Delivery",
        href: "socr#/service_delivery",
        active: false
      },
      {
        name: "Citizen Engagement",
        href: "socr#/citizen_engagement",
        active: false
      },
      {
        name: "Municipal Human Resources",
        href: "socr#/human_resources",
        active: false
      },
      {
        name: "People and Households",
        href: "socr#/people_household",
        active: true
      }
    ]
  }
  const dashboardProps = {
    indicator_ids: [704, "manual", 706, 699, 701, 711],
    minYear: 2015,
    maxYear: 2018
  }

  return (
    chartGroup.length === 6 ?

      <SelectContext.Provider value={{ selectOpen, setSelect }}>

        <div className='people_household_dashboard' onClick={()=>{
          if(selectOpen){setSelect(false)}
          }}>
          <Subnav name='State of Cities Reports' dropdownName='People and Households' dropDownItem={subNavContent} buttonText="Download as PNG" />
          <Sidebar_left />
          <div id='content'>
            <GenericStatsPanel
              originalValues={originalValues}
            />
            <ChartGrid
              indicator_ids={dashboardProps.indicator_ids}
              chartGroup={chartGroup}
              setChartGroup={setChartGroup}
              originalValues={originalValues}
            />
          </div>
          <div className="spacer"></div>
        </div>
      </SelectContext.Provider>
      :
      <Modal id="loader" isOpen={true} className="modal-dialog-centered loader">
        <ModalBody>
          <div className="row">
            <div className="col-2"></div>
            <div className="col-0 ml-3 pt-4">
              <Spinner type="grow" color="secondary" size="sm" />
              <Spinner type="grow" color="success" size="sm" />
              <Spinner type="grow" color="danger" size="sm" />
              <Spinner type="grow" color="warning" size="sm" />
            </div>
            <div className="col-0 pt-4 pl-4 float-left">Loading Content...</div>
          </div>
          <br />
        </ModalBody>
      </Modal>
  )
}
export default PeopleHousehold;