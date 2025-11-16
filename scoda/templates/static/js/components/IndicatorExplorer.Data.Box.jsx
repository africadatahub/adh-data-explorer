import React, { Component } from "react";

import $, { data } from "jquery";
import { Canvg } from "canvg";

import IndicatorExplorerDataChart from "../components/IndicatorExplorer.Data.Charts";
import IndicatorExplorerDataTable from "../components/IndicatorExplorer.Data.Table";
import IndicatorExplorerDataMap from "../components/IndicatorExplorer.Data.Maps";
import Tooltip from "../components/ui/ToolTip.jsx";
import InfoIcon from "./ui/infoIcon.jsx";

export default class IndicatorExplorerDataBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      csv: [],
    };
  }

  componentDidMount() {
    if (this.props.results.length > 0) {
      this.loadGoogleVizApi(this.props.results, this.props.filterYear);
    }
  }

  componentDidUpdate() {
    if (this.props.results.length !== 0) {
      this.loadGoogleVizApi(this.props.results, this.props.filterYear);
    }
  }

  loadGoogleVizApi(dataSet, selectedYear) {
    var options = {
      dataType: "script",
      cache: true,
      url: "https://www.google.com/jsapi",
    };

    $.ajax(options).done(function () {
      google.load("visualization", "1", {
        packages: ["controls", "bar", "corechart", "geochart"],
        callback: function () {
          var data = new google.visualization.DataTable();

          dataSet = dataSet.table;

          let rows = [];
          let rowHeader = [];
          for (let i = 0; i <= dataSet[0].length - 1; i++) {
            rowHeader.push(dataSet[0][i]);
          }

          rows.push(rowHeader);

          for (let j = 1; j <= dataSet.length - 1; j++) {
            let rowItem = dataSet[j];
            let row = [];
            if (rowItem[1].toString() === selectedYear) {
              for (let k = 0; k < rowItem.length; k++) {
                row.push(rowItem[k].toString());
              }
              rows.push(row);
            }
          }

          var data = new google.visualization.DataTable(
            document.getElementById("table")
          );
          var csvData = google.visualization.dataTableToCsv(data);

        },
      });
    });
  }

  renderDataSet(dataSetType, filter) {
    switch (dataSetType) {
      case "table":
        return (
          <IndicatorExplorerDataTable
            results={this.props.results}
            key={dataSetType}
            filterYear={this.props.filterYear}
          />
        );
        break;
      case "chart":
        return (
          <IndicatorExplorerDataChart
            data={this.props.results}
            key={dataSetType}
            filterYear={this.props.filterYear}
            onSelectionChange={this.props.onSelectionChange}
            maxSelection={this.props.maxSelection}
            selectedCountries={this.props.selectedCountries}
            onSelectionFilters={this.props.onSelectionFilters}
            selectedFilters={this.props.selectedFilters}
          />
        );
        break;
      case "map":
        return (
          <IndicatorExplorerDataMap
            geo={this.props.results}
            key={dataSetType}
            filterYear={this.props.filterYear}
            filter={filter}
          />
        );
        break;
    }
  }

  download(downloadType, filename) {
    switch (downloadType) {
      case "table":
        this.downloadTable(filename);
        break;
      case "chart":
        this.downloadChart(filename);
        break;
      // Handle other cases ('table', 'map', etc.)
      default:
        console.error("Unsupported download type:", downloadType);
    }
  }

  downloadData(uri, filename) {
    let link = document.createElement("a");
    link.download = filename;
    link.href = uri;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click(function (e) {
      e.preventDefault();
      document.body.removeChild(link);
    });
  }

  downloadTable(filename) {
    // Try fetching the existing table reference
    const tableElement = document.getElementById("tableD"); // Assuming the table is rendered in the DOM

    if (tableElement) {
      // CSV Work: Parse HTML Table to CSV data
      let csvData = "";
      const rows = tableElement.getElementsByTagName("tr"); // Fetch all rows

      for (let i = 0; i < rows.length; i++) {
        const cols = rows[i].children;
        const rowData = [];
        for (let j = 0; j < cols.length; j++) {
          rowData.push(`"${cols[j].innerText}"`); // Handle text with commas by wrapping in quotes
        }
        csvData += rowData.join(",") + "\n"; // Concatenate rows with commas and line breaks
      }

      // Trigger download
      const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
      const blobUrl = URL.createObjectURL(blob);

      const dlLink = document.createElement("a");
      dlLink.download = `${filename}.csv`; // Filename
      dlLink.href = blobUrl;
      document.body.appendChild(dlLink);
      dlLink.click();
      document.body.removeChild(dlLink);

      // Clean up the blob URL to release memory
      URL.revokeObjectURL(blobUrl);
    } else {
      console.error("Table element not found. Cannot download CSV.");
    }
  }

  downloadChart(filename, format = "png") {
    const svgElement = document
      .getElementById("chart")
      ?.getElementsByTagName("svg")[0];

    if (!svgElement) {
      console.error("SVG element not found. Cannot download chart.");
      return;
    }

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgElement);

    if (format === "svg") {
      // --- Download SVG directly ---
      const blob = new Blob([svgString], {
        type: "image/svg+xml;charset=utf-8",
      });
      const blobUrl = URL.createObjectURL(blob);

      const dlLink = document.createElement("a");
      dlLink.download = `${filename}.svg`;
      dlLink.href = blobUrl;
      document.body.appendChild(dlLink);
      dlLink.click();
      document.body.removeChild(dlLink);

      URL.revokeObjectURL(blobUrl);
    } else if (format === "png") {
      // --- Convert SVG to PNG via canvas ---
      const canvas = document.createElement("canvas");
      canvas.width = svgElement.clientWidth || 500;
      canvas.height = svgElement.clientHeight || 300;
      const ctx = canvas.getContext("2d");

      const img = new Image();
      const svgBlob = new Blob([svgString], {
        type: "image/svg+xml;charset=utf-8",
      });
      const url = URL.createObjectURL(svgBlob);

      img.onload = () => {
        ctx.drawImage(img, 0, 0);
        URL.revokeObjectURL(url);

        canvas.toBlob((blob) => {
          const blobUrl = URL.createObjectURL(blob);
          const dlLink = document.createElement("a");
          dlLink.download = `${filename}.png`;
          dlLink.href = blobUrl;
          document.body.appendChild(dlLink);
          dlLink.click();
          document.body.removeChild(dlLink);
          URL.revokeObjectURL(blobUrl);
        }, "image/png");
      };

      img.src = url;
    }
  }

  render() {
    let downloadEvent = "";

    if (this.props.resultType !== "map") {
      downloadEvent = (
        <div
          className="ie-button-download"
          style={{ width: "133px" }}
          onClick={() =>
            this.props.resultType === "chart"
              ? this.downloadChart(
                  this.props.results.options_list[0].optname,
                  "png"
                )
              : this.downloadTable(this.props.results.options_list[0].optname)
          }
        >
          {this.props.resultType === "chart"
            ? "Download as PNG"
            : "Download as CSV"}
        </div>
      );
    }

    return (
      <div id="dashboard" style={{ width: "100%" }}>
        <div id="card" className="ie-box-card">
          <div className="ie-box-card-header">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                  paddingRight: 12,
                  paddingLeft: 12,
                }}
              >
                <div
                  style={{
                    flex: "1 1 auto",
                    minWidth: 0,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    fontWeight: 600,
                  }}
                  title={this.props.resultTitle}
                >
                  {this.props.resultTitle}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    flex: "0 0 auto",
                  }}
                >
                  { this.props.selectedIndicatorDefinition?.trim() && (
                    <Tooltip
                      title={this.props.resultTitle}
                      description={this.props.selectedIndicatorDefinition}
                      trigger={<InfoIcon />}
                    />
                  )}
                  <div style={{ display: "inline-flex" }}>{downloadEvent}</div>
                </div>
              </div>
            </div>
          <div className="col ie-table">
            <div className="mt-2 ml-3 mb-4">
              {this.renderDataSet(this.props.resultType, this.props.filter)}
            </div>
            {/*<input type="hidden" id="csv"></input>*/}
            <canvas style={{ display: "none" }}></canvas>
          </div>
        </div>
      </div>
    );
  }
}
