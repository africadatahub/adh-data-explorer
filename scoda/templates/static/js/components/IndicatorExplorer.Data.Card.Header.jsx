import React, { Component } from 'react';
// import Select from './Select';
import $ from 'jquery'
import select2 from 'select2';
import Select from "react-select";
import "select2";
import "select2/dist/css/select2.min.css";
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

  matchStart(params, data) {
    // If there's no search term, return the data (match all options)
    if (!params.term || $.trim(params.term) === '') {
      return data;
    }

    // Check if it's a flat item (doesn't have children)
    if (!data.children) {
      // Match the text of the flat item with the search term
      if (data.text.toUpperCase().startsWith(params.term.toUpperCase())) {
        return data;
      }
      return null; // No match
    }

    // If it has children, filter them recursively
    const filteredChildren = data.children.filter((child) =>
      child.text.toUpperCase().startsWith(params.term.toUpperCase())
    );

    if (filteredChildren.length) {
      return { ...data, children: filteredChildren }; // Return modified group with matched children
    }

    return null; // No match
  }

    componentDidMount(){
        setTimeout(function(){
            this.setState({loader:false});
       }.bind(this),5000);  // wait 5 seconds, then reset to false

      // Assign Select2 with a custom matcher
      $('#selector').select2({
        placeholder: "Please select or search an indicator",
        allowClear: true,
        minimumResultsForSearch: 0,
        minimumInputLength: 0,
        width: '100%',
        matcher: this.matchStart,
      });

      // Attach event handlers
      $('#selector').on('select2:select', (e) => {
        const selectedValue = $('#selector').val();
        if (selectedValue) {
          document.getElementById('button-search').classList.remove('ie-button-inactive');
          this.filterData();
        } else {
          document.getElementById('button-search').classList.add('ie-button-inactive');
        }
      });

      $('#selector').on('keypress', (e) => {
        if (e.which === 13) {
          this.filterData();
        }
      });

      $('#selector').on('select2:open', () => {
        setTimeout(() => {
          $('.select2-search').css({ display: 'block', visibility: 'visible', opacity: 1 });
          $('.select2-search__field').css({ display: 'block', width: '100%', height: 'auto' });
        }, 100);
      });

      // Hook the initial filter state
      this.props.filterHook(this.props.selectedIndicatorId || 1);

    }

  componentDidUpdate(prevProps) {
    if (prevProps.datasetOptions !== this.props.datasetOptions) {
      // Destroy old instance
      if ($('#selector').data('select2')) {
        $('#selector').select2('destroy');
      }

      // Reinitialize with new datasetOptions
      $('#selector').select2({
        placeholder: "Please select or search an indicator",
        allowClear: true,
        minimumInputLength: 0,
        matcher: this.matchStart,
      });
    }
  }


  componentWillUnmount() {
    if ($('#selector').data('select2')) {
      $('#selector').select2('destroy'); // Remove select2 instance
    }
  }


  resetForm() {
        $('#selector').select2('val', 0);

        document.getElementById('button-search').classList.add('ie-button-inactive');

        this.props.toggle(false);
    }

    filterData() {
        let selectedIndex = document.getElementById('selector').value;
        this.props.filterHook(selectedIndex);

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
                              <Spinner type="grow" color="secondary" tag="span" style={{color: 'white', fontSize: '0px'}} size="sm"><span
                                className="visually-hidden" style={{visibility: 'hidden'}}>Loading...</span></Spinner>
                              <Spinner type="grow" color="success" tag="span" style={{ color: 'white', fontSize: '0px'}} size="sm"><span
                                className="visually-hidden" style={{visibility: 'hidden'}}>Loading...</span></Spinner>
                              <Spinner type="grow" color="danger" tag="span" style={{ color: 'white', fontSize: '0px'}} size="sm"><span
                                className="visually-hidden" style={{visibility: 'hidden'}}>Loading...</span></Spinner>
                              <Spinner type="grow" color="warning" tag="span" style={{ color: 'white', fontSize: '100px'}} size="sm"><span
                                className="visually-hidden" style={{visibility: 'hidden'}}>Loading...</span></Spinner>
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
                        <div
                          className="row"
                          style={{display: 'flex', justifyContent: 'space-between'}}
                        >
                            <div>
                                <div id="button-search" className="ie-button-search ie-button-search-explorer ie-button-inactive" style={{width:'170px', visibility: 'hidden'}} onClick={this.filterData}>Display the Data</div>
                            </div>
                            {/*<div className="col-6">*/}
                            {/*     /!* <div className="ie-button-reset" onClick={this.resetForm}>Reset Form</div> *!/*/}
                            {/*</div>*/}
                          <div>
                            <div
                              id="button-copy-link"
                              style={{
                              textDecoration: 'underline',
                              color: '#CACACA',
                              fontStyle: 'italic',
                              fontWeight: '400',
                                cursor: 'pointer',
                                textAlign: 'center',
                                padding: '10px'
                            }}
                              onClick={this.props.copyFiltersToClipboard}
                            >
                              <i className="modal-close fa fa-share-alt"></i> Share your filter selection
                            </div>
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