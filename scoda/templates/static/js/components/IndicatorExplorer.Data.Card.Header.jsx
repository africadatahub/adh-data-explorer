import React, { Component } from 'react';
// import Select from './Select';
import $ from 'jquery'
import select2 from 'select2';
import Select from "react-select";
import { Container, Row, Col, Modal, ModalBody, Spinner } from 'reactstrap';


export default class IndicatorExplorerDataCardHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loader:true,
        }
        this.resetForm = this.resetForm.bind(this);
        this.filterData = this.filterData.bind(this);
        // this.enableFilter = this.enableFilter.bind(this);
        
    }

    componentDidMount(){
        setTimeout(function(){
            this.setState({loader:false});
       }.bind(this),5000);  // wait 5 seconds, then reset to false

      // Define the custom matcher for the dropdown
      function matchStart(params, data) {
        // If there are no search terms, show all data
        if ($.trim(params.term) === '') {
          return data;
        }

        // Skip items without text (e.g., group headers)
        if (typeof data.text === 'undefined') {
          return null;
        }

        // Match options whose text starts with the search term
        if (data.text.toUpperCase().indexOf(params.term.toUpperCase()) === 0) {
          return data;
        }

        // Exclude all other options
        return null;
      }

      $('#selector').select2({
            placeholder: "Please select or search an indicator",
          allowClear: true, // Allow clearing the selection
          minimumInputLength: 0, // Allow search to start with no minimum input restriction
          width: '100%', // Ensure dropdown width matches the container
          matcher: matchStart, // Apply the custom matcher
        }
        );

      // Trigger filtering on selection
      $('#selector').on('select2:select', (e) => {
        const selectedValue = $('#selector').val();

        if (selectedValue) {
          document.getElementById('button-search').classList.remove('ie-button-inactive');
          this.filterData(); // Filter data based on the selection
        } else {
          document.getElementById('button-search').classList.add('ie-button-inactive');
        }
      });

      // Handle Enter key press for search
      $('#selector').on('keypress', (e) => {
        if (e.which === 13) { // Enter key code
          this.filterData();
        }
      });

      this.props.filterHook(this.props.selectedIndicatorId || 1)
            
    }


    resetForm() {
        $('#selector').select2('val', 0);

        document.getElementById('button-search').classList.add('ie-button-inactive');

        this.props.toggle(false);
    }

    filterData() {
        let selectedIndex = document.getElementById('selector').value;
        this.props.filterHook(selectedIndex);

      console.log(selectedIndex)
        document.getElementById('button-search').classList.add('ie-button-inactive');
    }
    
    render() {

      const selectorOptions = this.props.datasetOptions.map((dataset, index) => {
        const [datasetValue, datasetLabel] = dataset; // Assuming dataset contains [value, label]

        return (
          <option
            key={index}
            value={datasetValue}
            selected={datasetValue === this.props.selectedIndicatorId} // Mark as selected if it matches
            title={datasetLabel} // Shows the full name on hover
          >
            {datasetLabel}
          </option>
        );
      });


      //populate select option with the current indicator
        const currentOption = this.props.datasetOptions.map((dataset,index) =>{
            if(dataset[0] === this.props.indicator_id) {
                return  <option key={index} value={dataset[0]}>{dataset[1]}</option>
            }
        });


            
        
        return (
            
            <div className="row">
                {this.state.loader ?
                  <Modal id="loader" isOpen={this.state.loader} className="modal-dialog-centered loader">
                    <ModalBody>
                        <div className="row">
                            <div className="col-2"></div>
                            <div className="col-0 ml-3 pt-4">
                                <Spinner type="grow" color="secondary" size="sm"/>
                                <Spinner type="grow" color="success" size="sm"/>
                                <Spinner type="grow" color="danger" size="sm"/>
                                <Spinner type="grow" color="warning" size="sm"/>
                            </div>
                            <div className="col-0 pt-4 pl-4 float-left">Loading Content...</div>
                        </div>
                        <br/>
                    </ModalBody>
                </Modal> :''}
                    <div className="col-6">

                        <div className="row">
                            <div className="col ie-element-label">
                                Choose Your Indicator:
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                              <select
                                id="selector"
                                className="ie-dropdown mb-2"
                                onChange={this.enableFilter}
                              >
                                  {currentOption.length ? currentOption : <option value="0">Empty</option>}
                                  {selectorOptions}

                              </select>
                            </div>
                        </div>
                            <div className='ie-spacer'></div>
                        <div className="row">
                            <div className="col-6">
                                <div id="button-search" className="ie-button-search ie-button-search-explorer ie-button-inactive" style={{width:'170px', visibility: 'hidden'}} onClick={this.filterData}>Display the Data</div>
                            </div>
                            <div className="col-6">
                                 {/* <div className="ie-button-reset" onClick={this.resetForm}>Reset Form</div> */}
                            </div>
                        </div>

                    </div>
                    <div className="col-6 explainer-text" style={{marginLeft: 0}} >
                        <span  style={{
                        fontSize: '16px',
                        fontWeight: '500',
                        lineHeight: '20px'
                    }}>
                    The purpose of this data explorer is to visually display data in a way that breaks a large dataset into smaller understandable constituent parts.  In this case the focus is on gender per country that may be less apparent when the data are viewed together.<br/><br/>
 
                     <span style={{fontStyle: 'italic',}}> Data is sourced from the <a href="https://genderdata.worldbank.org/" target='_blank' className='underline' style={{
                        textDecoration: 'underline',
                        color: '#CACACA',
                        fontStyle: 'italic',
                        fontWeight: '400'
                     }}>World Bank</a>.</span>

                        </span>
                    </div>
           </div> 
        )
    }
}