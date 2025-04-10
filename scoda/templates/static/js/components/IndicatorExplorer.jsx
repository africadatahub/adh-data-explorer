import React, { Component } from 'react';
import { useLocation } from 'react-router-dom';

import IndicatorExplorerDataCard from '../components/IndicatorExplorer.Data.Card';

export default class IndicatorExplorer extends Component {
    constructor(props) {
        super(props);
      this.state = {
        selectedYear: props.selectedYear || '2010', // Use props for initial state
        selectedFilters: props.selectedFilters || [], // Use props for initial state
        selectedIndicatorId: props.selectedIndicatorId || 1, // Use props for initial state
        // ... other state properties
      };

    }

  componentDidMount() {
    const queryParams = new URLSearchParams(this.props.location.search);
    const selectedYear = queryParams.get('selectedYear') || '2010';
    const selectedIndicatorId = queryParams.get('selectedIndicatorId') || '1';
    const selectedFilters = queryParams.get('selectedFilters')
      ? queryParams.get('selectedFilters').split(',')
      : [];

    // Avoid resetting the URL if it already contains the desired values
    if (!queryParams.get('selectedYear') || !queryParams.get('selectedIndicatorId')) {
      // Push updated URL to history only if needed
      const updatedParams = new URLSearchParams(queryParams);
      if (!queryParams.get('selectedYear')) updatedParams.set('selectedYear', selectedYear);
      if (!queryParams.get('selectedIndicatorId')) updatedParams.set('selectedIndicatorId', selectedIndicatorId);

      this.props.history.push({
        pathname: this.props.location.pathname,
        search: updatedParams.toString(),
      });
    }


    //Remove spinner
       $('.spinner--container').remove();

        //window.scrollTo(0,0);

        this.props.logoHide ? (
            document.addEventListener("scroll", () => {
                const logo = window.scrollY < 50 ? "none" : "block";

                this.setState({ logo_hide: logo });
            })
        ) : this.setState({ logo_hide: "block" });
    }


    render() {
      const queryParams = new URLSearchParams(this.props.location.search);

      const selectedYear = queryParams.has('selectedYear') ? queryParams.get('selectedYear') : '2010';
      const selectedIndicatorId = queryParams.has('selectedIndicatorId')
        ? queryParams.get('selectedIndicatorId')
        : '1';
      const selectedFilters = queryParams.has('selectedFilters')
        ? queryParams.get('selectedFilters').split(',')
        : [];


      return (
            <div className="container pb-5">

              <div className="row pb-5 ">
                   <div className="col-12">
                        <IndicatorExplorerDataCard
                          selectedYear={selectedYear}
                          selectedIndicatorId={selectedIndicatorId}
                          selectedFilters={selectedFilters}
                          location={this.props.location}
                        />
                   </div>
               </div>
            </div>
        )
    }
}