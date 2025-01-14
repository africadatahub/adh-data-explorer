import React, { useState } from 'react'
import {
  phAddItem, phRemoveItem, phClearAll,
  eAddItem, eRemoveItem, eClearAll,
  dAddItem, dClearAll, dRemoveItem,
  hiAddItem, hiRemoveItem, hiClearAll,
  leRemoveItem, leAddItem, leClearAll,
  fsAddItem, fsRemoveItem, fsClearAll, edRemoveItem, edAddItem, edClearAll, sustainabilityAddItem, sustainabilityRemoveItem, sustainabilityClearAll, ictRemoveItem, ictAddItem, ictClearAll, ptsRemoveItem, ptsAddItem, ptsClearAll, ceRemoveItem, ceAddItem, ceClearAll, sdRemoveItem, sdAddItem, sdClearAll
} from './helpers/citySelect';
import { Select } from './Organisms/Select';
import { ChartWrapper } from './Organisms/ChartWrapper';
import { MiniSelect } from './Organisms/MiniSelect';
import { useGlobalClose } from '../../context';
import { SingleCitySelect } from './Organisms/SingleCitySelect';
import { chartWrapperClassNames } from './helpers/chartGridStyles';

export const ChartGrid = ({ indicator_ids,
  chartGroup,
  setChartGroup,
  originalValues,
  dropdownName,
  gridItems,
  secondDropDown,
  selectedName,
  setSelectedName,
  setSelectedChart,
  selectedDropDownChart,
  genericIndex,
  singleCityIndex,
  setSingleCityIndex
}) => {

  const [isNumber, toggle] = useState(true)
  const [selected, setSelected] = useState([])
  const [options, setOptions] = useState([])

  const chartData = chartGroup

  const selectControls = dropdownName === "Citizen Engagement" ? {
    removeItem: ceRemoveItem,
    addItem: ceAddItem,
    clearAll: ceClearAll,
  } :dropdownName === "People and Households" ? {
    removeItem: phRemoveItem,
    addItem: phAddItem,
    clearAll: phClearAll,
  } : dropdownName === "Employment" ? {
    removeItem: eRemoveItem,
    addItem: eAddItem,
    clearAll: eClearAll,
  } : dropdownName === "Dwellings" ? {
    removeItem: dRemoveItem,
    addItem: dAddItem,
    clearAll: dClearAll,
  } : dropdownName === "Household Income" ? {
    removeItem: hiRemoveItem,
    addItem: hiAddItem,
    clearAll: hiClearAll,
  } : dropdownName === "Life Expectancy and Health" ? {
    removeItem: leRemoveItem,
    addItem: leAddItem,
    clearAll: leClearAll,
  } : dropdownName === "Food Security, Literacy and Inequality" ? {
    removeItem: fsRemoveItem,
    addItem: fsAddItem,
    clearAll: fsClearAll,
  } : dropdownName === "Education" ? {
    removeItem: edRemoveItem,
    addItem: edAddItem,
    clearAll: edClearAll,
  } : (dropdownName === "Sustainability" && secondDropDown) || (dropdownName === "Transport Mode") 
  || (dropdownName === "Public Transport Spend" && genericIndex === 1) ||
  (dropdownName === "Travel Time" && genericIndex === 0) ? {
    removeItem: hiRemoveItem,
    addItem: hiAddItem,
    clearAll: hiClearAll,
  } : (dropdownName === "Sustainability" && genericIndex === 2) ? {
    removeItem: sustainabilityRemoveItem,
    addItem: sustainabilityAddItem,
    clearAll: sustainabilityClearAll,
  } : (dropdownName === "Sustainability" && genericIndex === 3) ? {
    removeItem: sustainabilityRemoveItem,
    addItem: sustainabilityAddItem,
    clearAll: sustainabilityClearAll,
  } : dropdownName === "ICT Infrastructure" ? {
    removeItem: ictRemoveItem,
    addItem: ictAddItem,
    clearAll: ictClearAll,
  } :(dropdownName === "Public Transport Spend" && genericIndex === 0) ? {
    removeItem: ptsRemoveItem,
    addItem: ptsAddItem,
    clearAll: ptsClearAll,
  }:(dropdownName === "Service Delivery") ? {
    removeItem: sdRemoveItem,
    addItem: sdAddItem,
    clearAll: sdClearAll,
  }:(dropdownName === "Municipal Human Resources") ? {
    removeItem: ceRemoveItem,
    addItem: ceAddItem,
    clearAll: ceClearAll,
  }:
    {}

  const globalCityDropDownClose = useGlobalClose()

  const singleCityForYears = (dropdownName === "Public Transport Spend" && genericIndex === 1)
  const isDropDownChart = Array.isArray(indicator_ids[0])
  const isSingleCityDropdown = (dropdownName === "Travel Time" && genericIndex === 1)


  return (
    <div className='chart_grid' onClick={() => { globalCityDropDownClose() }}>
      {
        <div className='rounded_container'>
          <div className={isDropDownChart ? "select_wrapper double" : "select_wrapper"}>
            {
              (isSingleCityDropdown) ?

                <SingleCitySelect singleCityIndex={singleCityIndex}
                  setSingleCityIndex={setSingleCityIndex} />
                :
                <Select chartData={chartGroup}
                  originalValues={originalValues}
                  selected={selected}
                  options={options}
                  setChartGroup={setChartGroup}
                  setOptions={setOptions}
                  setSelected={setSelected}
                  removeItem={selectControls.removeItem}
                  addItem={selectControls.addItem}
                  clearAll={selectControls.clearAll}
                  chartDropName={dropdownName}
                  isDropDownChart={isDropDownChart}
                  genericIndex={genericIndex} />
            }

            {
              (isDropDownChart && !singleCityForYears) ? <MiniSelect names={secondDropDown} selected={selectedName}
                setSelectedChart={setSelectedChart} setSelected={setSelectedName}
                isDropDownChart={isDropDownChart} dropdownName={dropdownName} genericIndex={genericIndex} />
                :
                singleCityForYears ?
                  <SingleCitySelect singleCityIndex={singleCityIndex}
                    setSingleCityIndex={setSingleCityIndex} isSingleYear={true} />
                  :
                  ""
            }
          </div>

          <div className={chartWrapperClassNames(gridItems,dropdownName,indicator_ids)}>
            {
              <ChartWrapper
                chartGroup={chartData}
                indicator_ids={indicator_ids}
                dropdownName={dropdownName}
                toggle={toggle}
                isNumber={isNumber}
                selectedDropDownChart={selectedDropDownChart}
                genericIndex={genericIndex} />
            }
          </div>
        </div>
      }
    </div>
  )
}