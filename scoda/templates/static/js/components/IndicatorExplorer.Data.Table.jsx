import React, { Component } from 'react';

export default class IndicatorExplorerDataTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var hiddenTable  = {
            display:'none'
        };

        return (
            <div>
              <h2>{this.title}</h2>
              <div id="tableD"></div>
              <div id="tableD2" style={hiddenTable}></div>
            </div>
        )
    }
}
