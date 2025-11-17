import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, Spinner } from "reactstrap";

import axios from "axios";

import IndicatorExplorerDataCardHeader from "../components/IndicatorExplorer.Data.Card.Header";
import IndicatorExplorerDataBox from "../components/IndicatorExplorer.Data.Box";
import IndicatorExplorerDataBoxChartFilter from "../components/IndicatorExplorer.Data.Box.Small.ChartFilter";

class IndicatorExplorerDataCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      indicators: [],
      indicatorsMap: {}, // map for fast lookup
      selectedIndicatorDefinition: "",
      dataset: [],
      table: [],
      selectedYear: props.selectedYear || "2010", // Use props for initial state
      mapFilter: "NA",
      display: false,
      modal: false,
      loader: false,
      maxSelection: 13, // Maximum number of allowed selections
      errorMessage: "",
      selectedItems: 0, // Array of selected items
      selectedCountries: [],
      selectedFilters: props.selectedFilters || [], // Use props for initial state
      selectedIndicatorId: props.selectedIndicatorId || 1, // Use props for initial state
      graphName: "",
    };

    this.handleFiltersChange = this.handleFiltersChange.bind(this);
    this.handleSelectionChange = this.handleSelectionChange.bind(this);
    this.filterIndicatorData = this.filterIndicatorData.bind(this);
    this.toggleComponentDisplay = this.toggleComponentDisplay.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.setMapFilter = this.setMapFilter.bind(this);
    this.showLoader = this.showLoader.bind(this);
    this.hideLoader = this.hideLoader.bind(this);
    this.copyFiltersToClipboard = this.copyFiltersToClipboard.bind(this);
    this.fetchDatasetIndicators = this.fetchDatasetIndicators.bind(this);
  }

  componentDidMount() {
    this.init();
    this.fetchDatasetIndicators("World_Development_Indicators");
    this.initFiltersFromURL();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.selectedYear !== this.props.selectedYear ||
      prevProps.selectedIndicatorId !== this.props.selectedIndicatorId ||
      prevProps.selectedFilters !== this.props.selectedFilters
    ) {
      this.setState({
        selectedYear: this.props.selectedYear,
        selectedIndicatorId: this.props.selectedIndicatorId,
        selectedFilters: this.props.selectedFilters,
      });
    }
  }

  init() {
    this.toggleComponentDisplay(false);
  }

  toggleComponentDisplay(show) {
    if (show) {
      document.getElementById("explorer-details").style.display = "block";
    } else {
      document.getElementById("explorer-details").style.display = "none";
    }
  }

  toggleModal() {
    if (!this.state.modal) {
      this.setState({ modal: true });
    } else {
      this.setState({ modal: false });
    }
  }

  fetchDatasetIndicators(datasetName) {
    if (!datasetName) {
      this.setState({ indicatorOptions: [] });
      return;
    }

    if (datasetName === "Findex_Financial_Indicators") {
      axios.get("/api/findex/indicators-list/codebook").then((res) => {
        const indicatorsMap = Object.fromEntries(
          res.data.map(item => [item[0], item])
        );
        this.setState({ 
          indicators: res.data,
          indicatorsMap
        });
      });
    } else if (datasetName === "World_Development_Indicators") {
      axios.get("/api/indicators-list/codebook").then((res) => {
        this.setState({ indicators: res.data });
      });
    }
  }

  showLoader() {
    this.setState({ loader: true });
  }

  hideLoader() {
    this.setState({ loader: false });
  }
  async filterIndicatorData(
    indicatorValue,
    datasetName = "World_Development_Indicators"
  ) {
    this.showLoader();

    const indicatorId = indicatorValue || this.state.selectedIndicatorId || 0;

    // Reset state once (not multiple times)
    this.setState({
      selectedIndicatorId: indicatorId,
      mapFilter: "NA",
      selectedYear: "2010",
      dataset: [],
      table: [],
      selectedFilters: this.state.selectedFilters || [],
    });

    this.toggleComponentDisplay(false);

    try {
      const url =
        datasetName === "Findex_Financial_Indicators"
          ? `/api/findex/codebook?indicator_id=${indicatorId}`
          : `/api/explore/codebook?indicator_id=${indicatorId}`;

      const response = await axios.get(url, {
        headers: { Accept: "application/json" },
      });

      const data = this.cleanApiResponse(response.data);

      if (datasetName === "Findex_Financial_Indicators" && this.state.indicatorsMap[indicatorId]) {
        this.setState({ selectedIndicatorDefinition: this.state.indicatorsMap[indicatorId][2]});
      }

      const selectedYear = this.resolveSelectedYear(data);
      const graphName = data?.table?.[0]?.[2] || "";

      this.setState({
        mapFilter: "NA",
        dataset: data,
        table: data.table || [],
        graphName,
        selectedYear,
        selectedFilters: this.state.selectedFilters || [],
      });

      this.toggleComponentDisplay(true);

      await this.validateDocumentReady();
    } catch (error) {
      console.error("Failed to filter indicator data:", error);
      this.setState({ modal: true });
    } finally {
      this.hideLoader();
    }
  }

  /**
   * Clean API response: replace NaN, parse JSON if needed
   */
  cleanApiResponse(data) {
    if (typeof data === "string") {
      return JSON.parse(data.replace(/\bNaN\b/g, "null"));
    }
    return data;
  }

  /**
   * Resolve correct selectedYear based on plot_type and years_list
   */
  resolveSelectedYear(data) {
    if (data.plot_type === 2) {
      return data.year;
    }

    if (data.plot_type === 1 && Array.isArray(data.years_list)) {
      const matchedYear = data.years_list.find(
        (y) => y.optname.replace("Year:", "").trim() === data.year
      );
      return matchedYear?.optid || "2010";
    }

    return "2010";
  }

  async validateDocumentReady() {
    var isLoaded = setInterval(validateLoaded, 2000);

    function validateLoaded() {
      if (document.getElementById("chartPng").value !== "") {
        clearInterval(isLoaded);
      }
    }
  }

  setMapFilter(optionId, plot) {
    if (plot === 2) {
      this.setState({ mapFilter: optionId });
    }
    if (plot === 1) {
      this.setState({ selectedYear: optionId });
    }
  }

  // Load filters from URL and set them in the state
  initFiltersFromURL() {
    const queryParams = new URLSearchParams(this.props.location.search);
    const selectedYear =
      queryParams.get("selectedYear") || this.state.selectedYear;
    const selectedIndicatorId =
      queryParams.get("selectedIndicatorId") || this.state.selectedIndicatorId;
    const selectedFilters = queryParams.get("selectedFilters")
      ? queryParams.get("selectedFilters").split(",")
      : [];

    this.setState({ selectedYear, selectedIndicatorId, selectedFilters });
  }

  // Function to copy URL with filters to the clipboard
  copyFiltersToClipboard() {
    const { selectedYear, selectedIndicatorId, selectedFilters } = this.state;

    // Dynamically generate the query string
    const queryString = new URLSearchParams({
      selectedYear,
      selectedIndicatorId,
      selectedFilters: selectedFilters.join(","), // Join filters as a single string
    }).toString();

    // Construct the full URL
    const url = `${window.location.origin}/home/#/?${queryString}`;

    // Copy to clipboard using the Clipboard API
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert("Filters link copied to clipboard!"); // Optional: show feedback
      })
      .catch((err) => {
        console.error("Failed to copy the link to clipboard:", err);
      });
  }

  handleSelectionChange({ selectedItems, errorMessage, selectedCountries }) {
    // Update the state based on child's callback
    this.setState({
      selectedCountries: selectedCountries,
      selectedItems: selectedItems,
      errorMessage: errorMessage,
    });
  }

  handleFiltersChange({ selectedFilters }) {
    // Update the state based on child's callback
    this.setState({
      selectedFilters: selectedFilters,
    });
  }

  render() {
    let modalCloseIcon = (
      <i
        className="modal-close fa fa-times"
        aria-hidden="true"
        onClick={this.toggleModal}
      ></i>
    );

    return (
      <div className="mt-4 ">
        <div className="row">
          <div className="col-sm-12">
            <div className="ie-content-card">
              <div className="ie-content-card-header">
                <div className="row">
                  <div className="col-md-12">
                    <IndicatorExplorerDataCardHeader
                      onDatasetChange={this.fetchDatasetIndicators}
                      indicatorOptions={this.state.indicators} // this will be changed to
                      filterHook={this.filterIndicatorData}
                      toggle={this.toggleComponentDisplay}
                      // filterYear={this.state.selectedYear}
                      selectedIndicatorId={this.props.selectedIndicatorId}
                      copyFiltersToClipboard={this.copyFiltersToClipboard}
                    />
                  </div>
                </div>
              </div>
              <div
                id="explorer-details"
                style={{ marginTop: "30px" }}
                className="col-md-12 col-lg-12 col-xl-12"
              >
                <div className="row">
                  <div className="col-md-12 col-lg-3 col-xl-3 p-0">
                    <IndicatorExplorerDataBoxChartFilter
                      results={this.state.dataset}
                      filterYear={this.state.selectedYear}
                      maxSelection={this.state.maxSelection}
                      errorMessage={this.state.errorMessage}
                      selectedItems={this.state.selectedItems}
                      onSelectionChange={this.handleSelectionChange}
                      selectedCountries={this.state.selectedCountries}
                    />
                  </div>
                  <div className="col-md-12 col-lg-9 col-xl-9 pr-0">
                    <IndicatorExplorerDataBox
                      resultTitle={`Plotting Window - ${this.state.graphName}`}
                      selectedIndicatorDefinition={this.state.selectedIndicatorDefinition}
                      results={this.state.dataset}
                      resultType="chart"
                      filterYear={this.state.selectedYear}
                      maxSelection={this.state.maxSelection}
                      onSelectionChange={this.handleSelectionChange}
                      selectedCountries={this.state.selectedCountries}
                      onSelectionFilters={this.handleFiltersChange}
                      selectedFilters={this.state.selectedFilters}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 col-lg-12 col-xl-12 p-0">
                    <IndicatorExplorerDataBox
                      resultTitle={`Selected Data - ${this.state.graphName}`}
                      selectedIndicatorDefinition={this.state.selectedIndicatorDefinition}
                      results={this.state.dataset}
                      resultType="table"
                      filterYear={this.state.selectedYear}
                      maxSelection={this.state.maxSelection}
                      onSelectionChange={this.handleSelectionChange}
                      selectedCountries={this.state.selectedCountries}
                    />
                  </div>
                </div>
                <div className="row mt-3"></div>
              </div>
            </div>
          </div>
        </div>

        <Modal
          isOpen={this.state.modal}
          toggle={this.toggleModal}
          modalclassname="fade"
        >
          <ModalHeader
            toggle={this.toggleModal}
            modalclassname="modal-header"
            close={modalCloseIcon}
          >
            <i className="fa fa-exclamation-triangle" aria-hidden="true"></i>
            &nbsp;Server Error
          </ModalHeader>
          <ModalBody className="modal-body">
            <br />
            There is currently no data available for the selected indicator!
            <br />
            <br />
          </ModalBody>
        </Modal>

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
      </div>
    );
  }
}

export default IndicatorExplorerDataCard;
