// COMPONENT NOTES
// This component requires the following sub components 
// - Dropdown
// - DownloadScreenCapture 
// - Collapse 

// Npm packages required:
// - html2canvas
// - reactstrap
import React from 'react'
import DownloadScreenCapture from './../components/DownloadScreenCapture';
import Dropdown from './../components/Dropdown';
import PropTypes from 'prop-types';
import { useGlobalClose } from '../context';
import { useCloseAllErrors } from '../context';


const SubNav = (props) => {

  const newChartsCondition = props.dropdownName === "Employment" || props.dropdownName === "Dwellings" || props.dropdownName === "Household Income"
  
  let globalCityDropDownClose = () =>{}

  if (newChartsCondition) {
    
    globalCityDropDownClose = useGlobalClose()
  }

  const closeAlerts = useCloseAllErrors()

  const closeAllAlerts = () => {
    globalCityDropDownClose()
    
    let isClearable = false

    closeAlerts.error.forEach((item)=>{
      if(item.errorThrown === true){
        isClearable = true
      }
    })
    
    if(isClearable){
    
      const newState = closeAlerts.error.map((obj) => {

        return { errorThrown: false };
    });

    closeAlerts.setError(newState);
    }
  }


  return (
    <div className={["subnav subnav--wrapper container-fluid "] + props.className}
    onClick={()=>{closeAllAlerts()}}>
      <div className="subnav--breadcrumbs">
        <strong>{props.name}</strong> / <Dropdown name={props.dropdownName} header={props.dropdownHeading} menu={props.dropdownMenu} dropDownItem={props.dropDownItem} ></Dropdown>
      </div>

      <div className="subnav--cta">
        <div className='row'>
          <div className=''><DownloadScreenCapture targetID="charts-container" filename="image.png" className="round btn_secondary" buttonText={props.buttonText}></DownloadScreenCapture> </div>

        </div>
      </div>
    </div>
  );
};

export default SubNav;

SubNav.propTypes = {
  /**
   * Title text for the component
   */
  name: PropTypes.string,
  /**
   * Main label for the dropdown sub component
   */
  dropdownName: PropTypes.string,
  /**
   * Heading within the dropdown sub component
   */
  dropdownHeading: PropTypes.string,
  /**
   * Menu for the dropdown populated by an object
   */
  dropdownMenu: PropTypes.object,
  /**
   * Text for the sub nav button
   */
  buttonText: PropTypes.string,
  /**
   * Add custom classes to the parent div wrapper of this component
   */
  className: PropTypes.string,

};