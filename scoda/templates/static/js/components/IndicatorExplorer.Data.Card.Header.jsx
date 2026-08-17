import React, { Component } from "react";
import Select, { components } from "react-select";

import { Container, Row, Col, Modal, ModalBody, Spinner } from "reactstrap";

import { DATASET_OPTIONS, DEFAULT_DATASET } from "../constants/datasets";
import Tooltip from "./ui/ToolTip";

export default class IndicatorExplorerDataCardHeader extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      loader: true,
      selectedDataset: DEFAULT_DATASET.id,
      selectedOption: null,
    };

    this.handleDatasetChange = this.handleDatasetChange.bind(this);
    this.handleIndicatorChange = this.handleIndicatorChange.bind(this);
    this.filterData = this.filterData.bind(this); 
  }

  componentDidMount() {
    setTimeout(() => this.setState({ loader: false }), 5000);
    
    // Initial data load hook
    this.props.filterHook(1, this.state.selectedDataset);
  }

  handleDatasetChange(e) {
    const datasetName = e.target.value;
    
    this.setState({ selectedDataset: datasetName, selectedOption: null }, () => {
      this.props.filterHook(1, datasetName);
      if (this.props.onDatasetChange) this.props.onDatasetChange(datasetName);
    });
  }

  handleIndicatorChange(opt) {
    this.setState({ selectedOption: opt });
    
    if (opt) {
      this.props.filterHook(opt.value, this.state.selectedDataset);
    }
  }
  
  filterData() {
    let selectedIndex = document.getElementById("indicator-selector").value;
    console.log("Selected Indicator Value:", selectedIndex);
    this.props.filterHook(selectedIndex, this.state.selectedDataset);
    document
      .getElementById("button-search")
      .classList.add("ie-button-inactive");
  }

  render() {
    // Data transformation for react-select options
    const options = (this.props.indicatorOptions || []).map(
      ([value, label, short_definition]) => ({
        value,
        label,
        description: short_definition,
      })
    );
    
    // Custom react-select Option component with Tooltip
    const Option = (props) => {
      const { data } = props;

      if (!data.description) {
        return <components.Option {...props} />;
      }

      return (
        <components.Option {...props}>
          <Tooltip
            title={data.label}
            description={data.description}
            trigger={<span>{data.label}</span>}
          />
        </components.Option>
      );
    };

    return (
      <div className="row">
        {this.state.loader ? (
          <Modal
            id="loader"
            isOpen={this.state.loader}
            className="modal-dialog-centered loader"
          >
            <ModalBody>
              <div className="row">
                <div className="col-2"></div>
                <div className="col-0 ml-3 pt-4">
                  <Spinner
                    type="grow"
                    color="secondary"
                    tag="span"
                    style={{ color: "white", fontSize: "0px" }}
                    size="sm"
                  >
                    <span
                      className="visually-hidden"
                      style={{ visibility: "hidden" }}
                    >
                      Loading...
                    </span>
                  </Spinner>
                  <Spinner
                    type="grow"
                    color="success"
                    tag="span"
                    style={{ color: "white", fontSize: "0px" }}
                    size="sm"
                  >
                    <span
                      className="visually-hidden"
                      style={{ visibility: "hidden" }}
                    >
                      Loading...
                    </span>
                  </Spinner>
                  <Spinner
                    type="grow"
                    color="danger"
                    tag="span"
                    style={{ color: "white", fontSize: "0px" }}
                    size="sm"
                  >
                    <span
                      className="visually-hidden"
                      style={{ visibility: "hidden" }}
                    >
                      Loading...
                    </span>
                  </Spinner>
                  <Spinner
                    type="grow"
                    color="warning"
                    tag="span"
                    style={{ color: "white", fontSize: "100px" }}
                    size="sm"
                  >
                    <span
                      className="visually-hidden"
                      style={{ visibility: "hidden" }}
                    >
                      Loading...
                    </span>
                  </Spinner>
                </div>
                <div className="col-0 pt-4 pl-4 float-left">
                  Loading Content...
                </div>
              </div>
              <br />
            </ModalBody>
          </Modal>
        ) : (
          ""
        )}
        
        {/* Selectors and Controls */}
        <div className="col-6">
          {/* Dataset Selector */}
          <div className="row">
            <div className="col ie-element-label">Dataset:</div>
          </div>
          <div className="row">
            <div className="col">
              <Select
                placeholder="Select dataset..."
                value={DATASET_OPTIONS.find((option) => option.value === this.state.selectedDataset)}
                onChange={(opt) => this.handleDatasetChange({ target: { value: opt?.value } })}
                options={DATASET_OPTIONS}
                isClearable={false}
                styles={{
                  container: (base) => ({ ...base, width: "100%" }),
                  control: (base) => ({
                    ...base,
                    minHeight: "36px",
                    borderColor: "#ccc",
                    boxShadow: "none",
                    "&:hover": { borderColor: "#aaa" },
                  }),
                  menu: (base) => ({
                    ...base,
                    zIndex: 9999,
                  }),
                }}
              />
            </div>
          </div>

          {/* Indicator Selector */}
          <div className="row">
            <div className="col ie-element-label">Choose Your Indicator:</div>
          </div>
          <div className="row">
            <div className="col">
              <Select
                options={options}
                value={this.state.selectedOption}
                onChange={this.handleIndicatorChange}
                isClearable
                placeholder="Please select or search an indicator"
                components={{ Option }}
              />
            </div>
          </div>
          <div className="ie-spacer"></div>
          
          <div
            className="row"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div>
              <div
                id="button-search"
                className="ie-button-search ie-button-search-explorer ie-button-inactive"
                style={{ width: "170px", visibility: "hidden" }}
                onClick={this.filterData}
              >
                Display the Data
              </div>
            </div>
            <div>
              <div
                id="button-copy-link"
                style={{
                  textDecoration: "underline",
                  color: "#CACACA",
                  fontStyle: "italic",
                  fontWeight: "400",
                  cursor: "pointer",
                  textAlign: "center",
                  padding: "10px",
                }}
                onClick={this.props.copyFiltersToClipboard}
              >
                <i className="modal-close fa fa-share-alt"></i> Share your
                filter selection
              </div>
            </div>
          </div>
        </div>

        <div className="col-6 explainer-text" style={{ marginLeft: 0 }}>
          <span
            style={{
              fontSize: "16px",
              fontWeight: "500",
              lineHeight: "20px",
            }}
          >
            The purpose of this data explorer is to visually display data in a
            way that breaks a large dataset into smaller understandable
            constituent parts. In this case the focus is on gender per country
            that may be less apparent when the data are viewed together.
            <br />
            <br />
            <span style={{ fontStyle: "italic" }}>
              {" "}
              Data is sourced from the{" "}
              <a
                href="https://genderdata.worldbank.org/"
                target="_blank"
                className="underline"
                style={{
                  textDecoration: "underline",
                  color: "#CACACA",
                  fontStyle: "italic",
                  fontWeight: "400",
                }}
              >
                World Bank
              </a>
              .
            </span>
          </span>
        </div>
      </div>
    );
  }
}