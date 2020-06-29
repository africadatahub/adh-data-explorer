import React, { Component } from 'react';

import DemographicModellerDataCard from '../components/DemographicModeller.Data.Card';
import DemographicModellerFooterCard from '../components/DemographicModeller.Footer.Card';

export default class DemographicModeller extends Component {
    constructor(props) {
        super(props);

        this.downloadMethodology = this.downloadMethodology.bind(this);
    }

    downloadMethodology() {
        let fileName = 'report.pdf';
        let encodedUri = '/static/dist/data/report.pdf';
        this.downloadData(encodedUri,fileName);
    }

    downloadData(uri,filename) {
        let link = document.createElement("a");
        link.download = filename;
        link.href = uri;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    render() {
        return (
            <div className="container">
               <div className="row">
                   <div className="col-sm-12">
                        <DemographicModellerDataCard
                        />
                   </div>
               </div>
               <div className="row">
                   <div className="col-sm-12">
                       <DemographicModellerFooterCard 
                       downloadEvent={this.downloadMethodology}/>
                   </div>
               </div>
            </div>
        )
    }
}