import React, { Component } from 'react';
import $ from 'jquery';

export default class IndicatorExplorerDataTable extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if(this.props.results.length !== 0) {
           this.loadGoogleVizApi(this.props.results, this.props.filterYear);
        }
    }

    componentDidUpdate() {

        if(this.props.results.length !== 0) {
            this.loadGoogleVizApi(this.props.results,this.props.filterYear);
        }
    }

    loadGoogleVizApi(dataSet,selectedYear) {

        var options = {
            dataType: "script",
            cache: true,
            url: "https://www.google.com/jsapi",
          };

          $.ajax(options).done(function(){
            google.load("visualization", "1", {
              packages:["corechart"],
              callback: function() {

                    var data = new google.visualization.DataTable();

                    dataSet = dataSet.table;

                    for(let i=0;i<dataSet[0].length;i++) {
                        data.addColumn('string',dataSet[0][i] + '<br/><br/>');
                    }
                    
                    for(let j=1;j<dataSet.length;j++) {
                        let rowItem = dataSet[j];
                        let row = [];
                        if(rowItem[1].toString() === selectedYear) {
                        for(let k=0;k<rowItem.length;k++) {
                        row.push(rowItem[k].toString());
                        }
                        data.addRow(row);
                      }
                    }
                }
            });
        });
    }

    render() {
        var hiddenTable  = {
            display:'none'
        };

        return (
            <div>
                <div id="tableD"></div>
                <div id="tableD2" style={hiddenTable}></div>
            </div>
        )
    }
}
