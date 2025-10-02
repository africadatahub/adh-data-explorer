import React, { Component } from "react";
// import Select from './Select';
import $ from "jquery";
import select2 from "select2";
import Select from "react-select";
import "select2";
import "select2/dist/css/select2.min.css";
import { Container, Row, Col, Modal, ModalBody, Spinner } from "reactstrap";

export default class IndicatorExplorerDataCardHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: true,
      selectedDataset: "World_Development_Indicators",
    };
    this.resetForm = this.resetForm.bind(this);
    this.filterData = this.filterData.bind(this);
    this.handleDatasetChange = this.handleDatasetChange.bind(this);
  }

  handleDatasetChange(e) {
    const datasetName = e.target.value;
    this.setState({ selectedDataset: datasetName }, () => {
      this.props.filterHook(1, datasetName);
    });

    if (this.props.onDatasetChange) {
      this.props.onDatasetChange(datasetName);
    }

    if ($("#indicator-selector").data("select2")) {
      $("#indicator-selector").val(null).trigger("change");
    }
  }

  matchStart(params, data) {
    // If there's no search term, return the data (match all options)
    if (!params.term || $.trim(params.term) === "") {
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

  componentDidMount() {
    setTimeout(
      function () {
        this.setState({ loader: false });
      }.bind(this),
      5000
    ); // wait 5 seconds, then reset to false

    $("#indicator-selector").select2({
      placeholder: "Please select or search an indicator",
      allowClear: true,
      minimumResultsForSearch: 0,
      minimumInputLength: 0,
      width: "100%",
      matcher: this.matchStart,
    });

    $("#indicator-selector").on("select2:select", (e) => {
      const selectedValue = $("#indicator-selector").val();
      if (selectedValue) {
        document
          .getElementById("button-search")
          .classList.remove("ie-button-inactive");
        this.filterData();
      } else {
        document
          .getElementById("button-search")
          .classList.add("ie-button-inactive");
      }
    });

    $("#indicator-selector").on("keypress", (e) => {
      if (e.which === 13) {
        this.filterData();
      }
    });

    $("#indicator-selector").on("select2:open", () => {
      setTimeout(() => {
        $(".select2-search").css({
          display: "block",
          visibility: "visible",
          opacity: 1,
        });
        $(".select2-search__field").css({
          display: "block",
          width: "100%",
          height: "auto",
        });
      }, 100);
    });
    this.props.filterHook(1, this.state.selectedDataset);
  }


  componentDidUpdate(prevProps) {
    if (prevProps.indicatorOptions !== this.props.indicatorOptions) {
      // Destroy old instance
      if ($("#indicator-selector").data("select2")) {
        $("#indicator-selector").select2("destroy");
      }

      // Reinitialize with new indicatorOptions
      $("#indicator-selector").select2({
        placeholder: "Please select or search an indicator",
        allowClear: true,
        minimumInputLength: 0,
        matcher: this.matchStart,
      });
    }
  }

  componentWillUnmount() {
    if ($("#indicator-selector").data("select2")) {
      $("#indicator-selector").select2("destroy");
    }
  }

  resetForm() {
    $("#indicator-selector").select2("val", 0);

    document
      .getElementById("button-search")
      .classList.add("ie-button-inactive");

    this.props.toggle(false);
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
    const selectorOptions = this.props.indicatorOptions.map(
      (indicator, index) => {
        const [optionValue, optionLabel] = indicator;

        return (
          <option key={index} value={optionValue}>
            {optionLabel}
          </option>
        );
      }
    );

    //populate select option with the current indicator
    const currentOptions = this.props.indicatorOptions.map(
      (indicator, index) => {
        let [optionValue, optionLabel] = indicator;

        if (optionValue === this.props.indicator_id) {
          return (
            <option key={index} value={optionValue}>
              {optionLabel}
            </option>
          );
        }
        return null;
      }
    );

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
        <div className="col-6">
          {/* Dataset Selector */}
          <div className="row">
            <div className="col ie-element-label">Dataset:</div>
          </div>
          <div className="row">
            <div className="col">
              <select
                className="ie-dropdown mb-2"
                value={this.state.selectedDataset}
                onChange={this.handleDatasetChange}
              >
                <option value="World_Development_Indicators">
                  World Development Indicators
                </option>
                <option value="Findex_Financial_Indicators">
                  Findex Financial Indicators
                </option>
              </select>
            </div>
          </div>

          <div className="row">
            <div className="col ie-element-label">Choose Your Indicator:</div>
          </div>
          <div className="row">
            <div className="col">
              <select id="indicator-selector" className="ie-dropdown mb-2">
                {currentOptions.length ? (
                  currentOptions
                ) : (
                  <option value="0">Empty</option>
                )}
                {selectorOptions}
              </select>
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
