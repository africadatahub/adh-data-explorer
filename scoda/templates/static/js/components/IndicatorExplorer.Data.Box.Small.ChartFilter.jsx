import React, { Component } from "react";

export default class IndicatorExplorerDataBoxChartFilter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="ie-box-card box-height">
        <div className="ie-box-card-header">
          <div className="row">
            <div className="col ml-3">Filters</div>
          </div>
        </div>
        <div className="mt-2 ml-2 mr-2">
          {this.props.maxSelection && (
            <h4>
              Selected Items ({this.props.selectedItems}/
              {this.props.maxSelection}):
            </h4>
          )}
          {this.props.errorMessage && (
            <div className="alert alert-danger mt-2">
              {this.props.errorMessage}
            </div>
          )}
          {/* Region selector - make sure this exists */}
          <div id="regionSelector" style={{ display: "none" }}></div>
          <div id="categorySelector2"></div>
          <div id="categorySelector1"></div>
        </div>
      </div>
    );
  }
}
