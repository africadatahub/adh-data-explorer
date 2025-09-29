import React, { Component } from "react";
import $ from "jquery";

export default class IndicatorExplorerDataBoxChartFilter extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    if (this.props.results.length !== 0) {
      this.loadGoogleVizApi(this.props.results, this.props.filterYear);
    }
  }

  loadGoogleVizApi(resultSet, selectedYear) {
    var options = {
      dataType: "script",
      cache: true,
      url: "https://www.google.com/jsapi",
    };

    $.ajax(options).done(function () {
      google.load("visualization", "1", {
        packages: ["controls", "bar", "corechart", "geochart"],
        callback: function () {
          var dataSet = resultSet.table;
          let rows = [];
          let rowHeader = [];

          for (let i = 0; i < dataSet[0].length; i++) {
            rowHeader.push(dataSet[0][i]);
          }

          rows.push(rowHeader);
          for (let j = 1; j < dataSet.length; j++) {
            let rowItem = dataSet[j];
            let row = [];
            if (rowItem[1].toString() === selectedYear) {
              for (let k = 0; k < rowItem.length; k++) {
                row.push(rowItem[k]);
              }
              rows.push(row);
            }
          }
        },
      });
    });
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
