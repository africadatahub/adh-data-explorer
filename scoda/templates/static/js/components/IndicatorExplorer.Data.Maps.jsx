import React, { Component } from 'react';
import $ from 'jquery';

export default class IndicatorExplorerDataMap extends Component {
  
    constructor(props) {
        super(props);

        this.state = {
            containerWidth:'100%',
            containerHeight: '450px'
        }

        this.handleResize = this.handleResize.bind(this);
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);

        this.handleResize();
    }

    componentDidUpdate() {
        window.addEventListener('resize', this.handleResize);

        if(this.props.geo.length !== 0) {
            this.loadGoogleVizApi(this.props.geo,this.props.filterYear,'100%','100%');
        }
    }

    handleResize() {

        let windowWidth = document.body.clientWidth;
        let windowHeight = document.body.clientHeight;

        var element = document.getElementById('map');
        var positionInfo = element.getBoundingClientRect();
        var height = positionInfo.height;
        var width = positionInfo.width;

        if(windowWidth <= 768) {
            windowWidth = width;
            windowHeight = '225px';
        }
        else {
            windowWidth = '100%';
            windowHeight = '450px';
        }

        document.getElementById('map').style.height = windowHeight;
        document.getElementById('map').style.width = windowWidth;
        
        if(this.props.geo.length !== 0) {
            this.loadGoogleVizApi(this.props.geo,this.props.filterYear,windowWidth,windowHeight);
        }
    }
  
    loadGoogleVizApi(resultSet,selectedYear,winWidth,winHeight) {
        var options = {
            dataType: "script",
            cache: true,
            url: "https://www.google.com/jsapi",
          };
    
          $.ajax(options).done(function(){
            google.load("visualization", "1", {
              packages:['controls', 'bar', 'corechart', 'geochart'],
              callback: function() {
                     var dataSet = resultSet.table;

                      let rows = [];
                      let rowHeader = [];
                      for(let i=0;i<3;i++) {
                            if(dataSet[0][i].toString() !== 'Year') {
                              rowHeader.push(dataSet[0][i]);
                            }
                      }
                      
                      rows.push(rowHeader);
      
                      for(let j=1;j<dataSet.length;j++) {
                          let rowItem = dataSet[j];
                          let row = [];
                          if(rowItem[1].toString() === selectedYear) {
                            for(let k=0;k<3;k++) {
                                if(rowItem[k].toString() !== selectedYear) {
                                   row.push(rowItem[k]);
                                }
                            }
                            rows.push(row);
                          }
                      }
                        
                      var map = new google.visualization.ChartWrapper({
                          'chartType': 'GeoChart',
                          'containerId': 'map',
                          'options': {
                              region: 'ZA',
                              displayMode: 'markers',
                              resolution: 'provinces',
                              theme: 'material',
                              colorAxis: {colors: ['#FED976', '#FC4E2A', '#800026']},
                              height: winHeight,
                              width:winWidth,
                              tooltip: { isHtml: true },
                              keepAspectRatio: true
                          }
                      });

                      map.setDataTable(rows);
              
                      map.draw();
                  }
            });
        });
    }
    
    render() {
    
        return (
          <div>
              <div id="map" style={{fontSize:'9px',fontFamily:'Montserrat',fontWeight:'500',marginTop:'0px'}}></div>
          </div>
        );
      }
}


